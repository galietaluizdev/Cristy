using Cristy.Dominio.Entidades;

namespace Cristy.Dominio.Interfaces
{
    public interface IPacienteRepositorio
    {
        Task<int> CriarAsync(Paciente paciente); // C
        Task<IEnumerable<Paciente>> ListarAsync(bool Ativo); // R
        Task<Paciente> ObterAsync(int Id); // R
        Task AtualizarAsync(Paciente paciente); // U

    }
}