using Cristy.Dominio.Entidades;

namespace Cristy.Repositorio.Interfaces
{
    public interface IPacienteRepositorio
    {
        Task<int> SalvarAsync(Paciente paciente); // C
        Task<IEnumerable<Paciente>> ListarAsync(bool Ativo); // R
        Task<Paciente> ObterAsync(int Id); // R
        Task AtualizarAsync(Paciente paciente); // U
    }
}