using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Cristy.Dominio.Entidades;

namespace Cristy.Aplicacao.Interfaces
{
    public interface IPacienteAplicacao
    {
        Task<int> CriarAsync(Paciente paciente);
        Task<Paciente> ObterAsync(int Id);
        Task<IEnumerable<Paciente>> ListarAsync(bool ativo);
        Task AtualizarAsync(Paciente paciente);
    }
}