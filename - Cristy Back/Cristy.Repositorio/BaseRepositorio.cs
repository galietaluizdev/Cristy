using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public abstract class BaseRepositorio<T>(CristyContext contexto) : IBaseRepositorio<T> where T : EntidadeBase
    {
        //Where T : entidadebase basicamente diz que o T que seria algo generico, herda e se torna aquela propriedade com seus campos
        protected readonly CristyContext _contexto = contexto;

        public async Task AtualizarAsync(T entidade)
        {
            _contexto.Set<T>().Update(entidade);
            await _contexto.SaveChangesAsync();
        }

        public async Task<int> CadastrarAsync(T entidade)
        {
            {
                _contexto.Set<T>().Add(entidade);
                await _contexto.SaveChangesAsync();

                return entidade.Id;
            }
        }

        public async Task<IEnumerable<T>> ListarAsync(bool ativo)
        {

            return await _contexto.Set<T>()
                        .Where(p => p.Ativo == ativo)
                        .ToListAsync();
        }

        public async Task<T> ObterAsync(int id)
        {
            {
                return await _contexto.Set<T>()
                            .Where(p => p.Id == id)
                            .FirstOrDefaultAsync();
            }
        }
    }

}
