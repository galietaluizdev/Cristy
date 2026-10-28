
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

            var id = await _pacienteRepositorio.CadastrarAsync(paciente);


            return id;
        }
        public async Task<PacienteRespostaDTO> ObterAsync(int Id)
        {
                Paciente p = await _pacienteRepositorio.ObterAsync(Id) ?? throw new Exception("Paciente não encontrado");

                var resposta = new PacienteRespostaDTO()
                {
                    Id = p.Id,
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
                Ativo = p.Ativo
            }).ToList();

            return resposta;

        }
        public async Task AtualizarAsync(PacienteAtualizarDTO p)
        {
            var validado = new Paciente() // conversao para validação
            {
                Id = p.Id,
                Nome = p.Nome,
                Email = p.Email,
                Telefone = p.Telefone,
                DataDeNascimento = p.DataDeNascimento,
            };
            await ValidarAtualizar(validado); // se nenhuma excessão for lançada, ele faz a busca no banco

            var banco = await _pacienteRepositorio.ObterAsync(p.Id);

            banco.Id = p.Id;
            banco.Nome = p.Nome;
            banco.Email = p.Email;
            banco.Telefone = p.Telefone;
            banco.DataDeNascimento = p.DataDeNascimento;

            await _pacienteRepositorio.AtualizarAsync(banco);
        }
        public async Task DefinirSituacaoAsync(bool ativo, int Id)
        {
            var paciente = await _pacienteRepositorio.ObterAsync(Id) ?? throw new Exception("Paciente não encontrado");

            paciente.DefinirSituacaoAsync(ativo);

            await _pacienteRepositorio.AtualizarAsync(paciente);
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