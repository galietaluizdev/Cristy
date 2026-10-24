using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public class PacienteRepositorio(CristyContext contexto) : BaseRepositorio(contexto), IPacienteRepositorio
    {
        public async Task AtualizarAsync(Paciente paciente)
        {
            _contexto.Pacientes.Update(paciente);
            await _contexto.SaveChangesAsync();
        }

        public async Task<IEnumerable<Paciente>> ListarAsync(bool Ativo)
        {
            return await _contexto.Pacientes
                        .Where(p => p.Ativo == Ativo)
                        .ToListAsync();
        }

        public async Task<Paciente> ObterAsync(int Id)
        {
            return await _contexto.Pacientes
                        .Where(p => p.Id == Id)
                        .Where(p => p.Ativo)
                        .FirstOrDefaultAsync();
        }   

        public async Task<int> CriarAsync(Paciente paciente)
        {
            _contexto.Pacientes.Add(paciente);
            await _contexto.SaveChangesAsync();

            return paciente.Id;
        }
    }
}