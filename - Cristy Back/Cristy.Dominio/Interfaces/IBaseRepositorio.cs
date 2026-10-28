using Cristy.Dominio.Entidades;

namespace Cristy.Dominio.Interfaces
{
    public interface IBaseRepositorio<T> where T : EntidadeBase
    {
        Task<int> CadastrarAsync(T entidade);
        Task<T?> ObterAsync(int id);
        Task<IEnumerable<T>> ListarAsync(bool Ativo);
        Task AtualizarAsync(T entidade);
    }
}