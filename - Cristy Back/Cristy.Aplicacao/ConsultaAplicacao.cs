using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Consulta.Requisicao;
using Cristy.Aplicacao.Models.Consulta.Resposta;
using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;

namespace Cristy.Aplicacao;

public class ConsultaAplicacao(
    IConsultaRepositorio consultaRepositorio,
    IDentistaRepositorio dentistaRepositorio,
    IPacienteRepositorio pacienteRepositorio) : IConsultaAplicacao
{
    readonly IConsultaRepositorio _consultaRepositorio = consultaRepositorio;
    readonly IDentistaRepositorio _dentistaRepositorio = dentistaRepositorio;
    readonly IPacienteRepositorio _pacienteRepositorio = pacienteRepositorio;

    #region Regras
    public async Task<IEnumerable<ConsultaResumoDTO>> ListarResumoAsync(bool ativo)
    {
        var pLista = await _consultaRepositorio.ListarResumoAsync(ativo);
        var resposta = pLista.Select(d => new ConsultaResumoDTO
        {
            Id = d.Id,
            DataConsulta = d.DataConsulta,
            PacienteId = d.PacienteId,
            DentistaId = d.DentistaId,
            PacienteNome = d.Paciente.Nome,
            DentistaNome = d.Dentista.Nome,
            Status = d.Status
        }).ToList();

        return resposta;
    }
    public async Task AtualizarAsync(ConsultaAtualizarDTO d)
    {
        var validado = new Consulta() // conversao para validação
        {
            Id = d.Id,
            DataConsulta = d.DataConsulta,
            Descricao = d.Descricao
        };
        await ValidarAtualizar(validado); // se nenhuma excessão for lançada, ele faz a busca no banco

        var banco = await _consultaRepositorio.ObterAsync(d.Id) ?? throw new Exception("Consulta não encontrado");

        banco.Id = d.Id;
        banco.DataConsulta = d.DataConsulta;
        banco.Descricao = d.Descricao;

        await _consultaRepositorio.AtualizarAsync(banco);
    }
    public async Task<int> CadastrarAsync(ConsultaCadastrarDTO d)
    {

        await ValidarExistencia(d.PacienteId, d.DentistaId);

        var consulta = new Consulta()
        {
            DataConsulta = d.DataConsulta,
            PacienteId = d.PacienteId,
            DentistaId = d.DentistaId,
            Descricao = d.Descricao,
        };

        await ValidacaoGeral(consulta);

        var id = await _consultaRepositorio.CadastrarAsync(consulta);

        return id;
    }
    public async Task<ConsultaRespostaDTO> ObterAsync(int Id)
    {
        var d = await _consultaRepositorio.ObterAsync(Id) ?? throw new Exception("Consulta não encontrada");

        var resposta = new ConsultaRespostaDTO()
        {
            Id = d.Id,
            DataConsulta = d.DataConsulta,
            DentistaId = d.DentistaId,
            PacienteId = d.PacienteId,
            PacienteNome = d.Paciente.Nome,
            DentistaNome = d.Dentista.Nome,
            Descricao = d.Descricao,
            HistoricoProcessado = d.HistoricoProcessado,
            InformacoesRelevantes = d.InformacoesRelevantes,
            Status = d.Status,
            Ativo = d.Ativo
        };
        return resposta;
    }
    public async Task DefinirSituacaoAsync(bool ativo, int Id)
    {
        var consulta = await _consultaRepositorio.ObterAsync(Id) ?? throw new Exception("Paciente não encontrado");

        consulta.DefinirSituacaoAsync(ativo);

        await _consultaRepositorio.AtualizarAsync(consulta);
    }

    #endregion
    #region Validação
    private async Task ValidarExistencia(int PacienteId, int DentistaId)
    {
        if (!await _dentistaRepositorio.ExisteAsync(DentistaId))
            throw new Exception("Dentista não encontrado");

        if (!await _pacienteRepositorio.ExisteAsync(PacienteId))
            throw new Exception("Paciente não encontrado");
    }
    private static async Task ValidacaoGeral(Consulta c)
    {
        int anoMinimo = DateOnly.FromDateTime(DateTime.Now).Year;
        if (c == null)
        {
            throw new Exception("Consulta não pode ser vazio");
        }
        if (c.DataConsulta.Year != anoMinimo)
        {
            throw new Exception("Data invalida, deve ser do mesmo ano ");
        }
        if (c.PacienteId < 0)
        {
            throw new Exception("Id do Paciente não pode ser vazio");
        }
        if (c.DentistaId < 0)
        {
            throw new Exception("Id do Dentista não pode ser vazio");
        }
        if (string.IsNullOrEmpty(c.Descricao))
        {
            throw new Exception("Descrição invalida não pode ser vazio");
        }
    }
    private static async Task ValidarAtualizar(Consulta c)
    {
        await ValidacaoGeral(c);
        if (c.Id <= 0)
        {
            throw new Exception("ID invalido");
        }
        
    }

    #endregion

}