
using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
namespace Cristy.Aplicacao
{

    public class PacienteAplicacao(IPacienteRepositorio PacienteRepositorio) : IPacienteAplicacao
    {
        readonly IPacienteRepositorio _PacienteRepositorio = PacienteRepositorio;

        #region Regras
        public async Task<int> CriarAsync(Paciente p)
        {
            await Validacao(p);

            await _PacienteRepositorio.CriarAsync(p);
            return p.Id;
        }
        public Task<Paciente> ObterAsync(int Id)
        {
            throw new NotImplementedException();
        }
        public Task<IEnumerable<Paciente>> ListarAsync(bool ativo)
        {
            throw new NotImplementedException();
        }
        public Task AtualizarAsync(PacienteAtualizar paciente)
        {
            throw new NotImplementedException();
        }
        #endregion
        #region Validação
        private static async Task Validacao(Paciente paciente)
        {
            if (paciente == null)
            {
                throw new Exception("Paciente não pode ser vazio");
            }
            if (string.IsNullOrEmpty(paciente.Nome))
            {
                throw new Exception("Nome não pode ser vazio");
            }
            if (string.IsNullOrEmpty(paciente.Email))
            {
                throw new Exception("E-mail não pode ser vazio");
            }
        }

        public Task AtualizarAsync(Paciente paciente)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}