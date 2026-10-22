using Cristy.Repositorio.Contexto;

namespace Cristy.Repositorio
{
    public abstract class BaseRepositorio(CristyContext contexto)
    {
        protected readonly CristyContext _contexto = contexto;
    }

}
