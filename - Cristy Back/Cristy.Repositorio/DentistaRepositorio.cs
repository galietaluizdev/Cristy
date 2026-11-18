using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public class DentistaRepositorio(CristyContext contexto) : BaseRepositorio<Dentista>(contexto), IDentistaRepositorio
    {
        public async Task<bool> CroJaCadastradoAsync(string cro, int IdNaoCriado = 0)
        {
            return await _contexto.Dentistas
                        .AnyAsync(d => d.CRO == cro && d.Id != IdNaoCriado); // valida se tem algum cro igual criado, MENOS se for no atualizar, ai só devolve true se for diferente do id do atualziar
        }
    }
}