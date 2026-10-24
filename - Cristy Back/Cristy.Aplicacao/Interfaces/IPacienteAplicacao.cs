using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Cristy.Aplicacao.Models.Paciente.Resposta;
using Cristy.Dominio.Entidades;

namespace Cristy.Aplicacao.Interfaces
{
    public interface IPacienteAplicacao
    {
        Task<int> CriarAsync(PacienteCriarDTO paciente);
        Task<PacienteRespostaDTO> ObterAsync(int Id);
        Task<IEnumerable<PacienteRespostaDTO>> ListarAsync(bool ativo);
        Task AtualizarAsync(PacienteAtualizar paciente);
    }
}