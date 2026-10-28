using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Dentista.Requisicao;
using Cristy.Aplicacao.Models.Dentista.Resposta;
using Cristy.Aplicacao.Models.Dentista.Requisicao;
using Cristy.Aplicacao.Models.Dentista.Resposta;
using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;

namespace Cristy.Aplicacao;

public class DentistaAplicacao(IDentistaRepositorio DentistaRepositorio) : IDentistaAplicacao
{
    readonly IDentistaRepositorio _dentistaRepositorio = DentistaRepositorio;

    public async Task AtualizarAsync(DentistaAtualizarDTO d)
    {
        var validado = new Dentista() // conversao para validação
        {
            Id = d.Id,
            Nome = d.Nome,
            Email = d.Email,
            Telefone = d.Telefone,
            DataDeNascimento = d.DataDeNascimento,
            CRO = d.CRO,
            Especialidade = d.Especialidade
        };
        await ValidarAtualizar(validado); // se nenhuma excessão for lançada, ele faz a busca no banco

        var banco = await _dentistaRepositorio.ObterAsync(d.Id) ?? throw new Exception("Dentista não encontrado");

        banco.Id = d.Id;
        banco.Nome = d.Nome;
        banco.Email = d.Email;
        banco.Telefone = d.Telefone;
        banco.DataDeNascimento = d.DataDeNascimento;
        banco.CRO = d.CRO;
        banco.Especialidade = d.Especialidade;

        await _dentistaRepositorio.AtualizarAsync(banco);
    }

    public async Task<int> CadastrarAsync(DentistaCadastrarDTO d)
    {

        var dentista = new Dentista()
        {
            Nome = d.Nome,
            Email = d.Email,
            Telefone = d.Telefone,
            DataDeNascimento = d.DataDeNascimento,
            CRO = d.CRO,
            Especialidade = d.Especialidade
        };

        await ValidacaoGeral(dentista);

        var id = await _dentistaRepositorio.CadastrarAsync(dentista);


        return id;
    }

    public async Task<IEnumerable<DentistaRespostaDTO>> ListarAsync(bool ativo)
    {
        var pLista = await _dentistaRepositorio.ListarAsync(ativo);
        var resposta = pLista.Select(d => new DentistaRespostaDTO
        {
            Id = d.Id,
            Nome = d.Nome,
            Email = d.Email,
            Telefone = d.Telefone,
            DataDeNascimento = d.DataDeNascimento,
            CRO = d.CRO,
            Especialidade = d.Especialidade,
            Ativo = d.Ativo
        }).ToList();

        return resposta;
    }

    public async Task<DentistaRespostaDTO> ObterAsync(int Id)
    {
        Dentista d = await _dentistaRepositorio.ObterAsync(Id) ?? throw new Exception("Dentista não encontrado");

        var resposta = new DentistaRespostaDTO()
        {
            Id = d.Id,
            Nome = d.Nome,
            Email = d.Email,
            Telefone = d.Telefone,
            DataDeNascimento = d.DataDeNascimento,
            CRO = d.CRO,
            Especialidade = d.Especialidade,
            Ativo = d.Ativo
        };
        return resposta;
    }

    public async Task DefinirSituacaoAsync(bool ativo, int Id)
    {
        var dentista = await _dentistaRepositorio.ObterAsync(Id) ?? throw new Exception("Paciente não encontrado");

        dentista.DefinirSituacaoAsync(ativo);

        await _dentistaRepositorio.AtualizarAsync(dentista);
    }

    #region Validação

    private static async Task ValidacaoGeral(Dentista d)
    {
        int anoMinimo = DateOnly.FromDateTime(DateTime.Now).Year - 120;
        if (d == null)
        {
            throw new Exception("Dentista não pode ser vazio");
        }
        if (string.IsNullOrEmpty(d.Nome))
        {
            throw new Exception("Nome não pode ser vazio");
        }
        if (string.IsNullOrEmpty(d.Email))
        {
            throw new Exception("E-mail não pode ser vazio");
        }
        if (string.IsNullOrEmpty(d.Telefone))
        {
            throw new Exception("Telefone invalida não pode ser vazio");
        }
        if (d.DataDeNascimento.Year < anoMinimo)
        {
            throw new Exception("Data de nascimento invalida ");
        }
        if (string.IsNullOrEmpty(d.CRO))
        {
            throw new Exception("CRO invalido não pode ser vazio");
        }
        if (string.IsNullOrEmpty(d.Especialidade))
        {
            throw new Exception("Especialidade invalida não pode ser vazio");
        }


    }
    private static async Task ValidarAtualizar(Dentista d)
    {
        await ValidacaoGeral(d);
        if (d.Id <= 0)
        {
            throw new Exception("ID invalido");
        }
    }

    #endregion
}