using Cristy.Dominio.Entidades;

namespace Cristy.Dominio.Interfaces;

public interface IConsultaRepositorio : IBaseRepositorio<Consulta>
{
    Task<IEnumerable<Consulta>> ListarResumoAsync(bool ativo);
    Task<Consulta> ObterAsync(int Id);
}