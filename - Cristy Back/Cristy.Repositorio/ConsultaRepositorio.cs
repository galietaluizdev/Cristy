using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio;

public class ConsultaRepositorio(CristyContext contexto) : BaseRepositorio<Consulta>(contexto), IConsultaRepositorio
{
    public virtual async Task<IEnumerable<Consulta>> ListarResumoAsync(bool ativo)
    {
        return await _contexto.Consultas
            .AsNoTracking()
            .Include(c => c.Paciente)
            .Include(c => c.Dentista)
            .Where(p => p.Ativo == ativo)
            .OrderBy(p => p.Id)
            .ToListAsync();
    }
    public override async Task<Consulta> ObterAsync(int Id)
    {
        return await _contexto.Consultas
            .Include(c => c.Paciente)
            .Include(c => c.Dentista)
            .Where(c => c.Id == Id)
            .FirstOrDefaultAsync();
    }
}