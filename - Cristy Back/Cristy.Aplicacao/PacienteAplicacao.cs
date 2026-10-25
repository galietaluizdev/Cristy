
using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Paciente;
// using Cristy.Aplicacao.Models.Paciente;
using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Cristy.Aplicacao.Models.Paciente.Resposta;
using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
// using Microsoft.VisualBasic;
namespace Cristy.Aplicacao
{

    public class PacienteAplicacao(IPacienteRepositorio PacienteRepositorio) : IPacienteAplicacao
    {
        readonly IPacienteRepositorio _pacienteRepositorio = PacienteRepositorio;

        #region Regras
        public async Task<int> CadastrarAsync(PacienteCadastrarDTO p)
        {

            var paciente = new Paciente()
            {
                Nome = p.Nome,
                Email = p.Email,
                Telefone = p.Telefone,
                DataDeNascimento = p.DataDeNascimento
            };

            await ValidacaoGeral(paciente);

            await _pacienteRepositorio.CadastrarAsync(paciente);

            return paciente.Id;
        }
        public async Task<PacienteRespostaDTO> ObterAsync(int Id)
        {
            var p = await _pacienteRepositorio.ObterAsync(Id) ?? throw new Exception("Paciente não encontrado");

            var resposta = new PacienteRespostaDTO()
            {
                Nome = p.Nome,
                Email = p.Email,
                Telefone = p.Telefone,
                DataDeNascimento = p.DataDeNascimento,
                Ativo = p.Ativo
            };
            return resposta;
        }

        public async Task<IEnumerable<PacienteRespostaDTO>> ListarAsync(bool ativo)
        {
            var pLista = await _pacienteRepositorio.ListarAsync(ativo);
            var resposta = pLista.Select(p => new PacienteRespostaDTO
            {
                Id = p.Id,
                Nome = p.Nome,
                Email = p.Email,
                Telefone = p.Telefone,
                DataDeNascimento = p.DataDeNascimento,
            }).ToList();
            
            return resposta;

        }

        public async Task AtualizarAsync(PacienteAtualizar p)
        {
            var paciente = new Paciente()
            {
                Id = p.Id,
                Nome = p.Nome,
                Email = p.Email,
                Telefone = p.Telefone,
                DataDeNascimento = p.DataDeNascimento,
                Ativo = p.Ativo
            };
            await ValidarAtualizar(paciente);
        }
        #endregion
        #region Validação

        private static async Task ValidacaoGeral(Paciente p)
        {
            int anoMinimo = DateOnly.FromDateTime(DateTime.Now).Year - 120;
            if (p == null)
            {
                throw new Exception("Paciente não pode ser vazio");
            }
            if (string.IsNullOrEmpty(p.Nome))
            {
                throw new Exception("Nome não pode ser vazio");
            }
            if (string.IsNullOrEmpty(p.Email))
            {
                throw new Exception("E-mail não pode ser vazio");
            }
            if (string.IsNullOrEmpty(p.Telefone))
            {
                throw new Exception("Telefone invalida não pode ser vazio");
            }
            if (p.DataDeNascimento.Year < anoMinimo)
            {
                throw new Exception("Data de nascimento invalida ");
            }
        }
        private static async Task ValidarAtualizar(Paciente p)
        {
            await ValidacaoGeral(p);
            if (p.Id <= 0)
            {
                throw new Exception("ID invalido");
            }
        }

        #endregion
    }
}