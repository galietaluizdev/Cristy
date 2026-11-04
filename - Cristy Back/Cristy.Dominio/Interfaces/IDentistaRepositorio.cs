using Cristy.Dominio.Entidades;
namespace Cristy.Dominio.Interfaces
{
    public interface IDentistaRepositorio : IBaseRepositorio<Dentista>
    {
        //VAZIO E N IMPLEMENTADO ENQUANTO N TIVER METODOS PROPRIOS DE DENTISTA
        Task<bool> CroJaCadastradoAsync(string CRO , int id);
    }
}