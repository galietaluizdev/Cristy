using Cristy.Dominio.Entidades;
using Cristy.Repositorio.Contexto;
using Cristy.Repositorio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public class PacienteRepositorio(CristyContext contexto) : BaseRepositorio(contexto), IPacienteRepositorio
    {
        public Task AtualizarAsync(Paciente paciente)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Paciente>> ListarAsync(bool Ativo)
        {
            throw new NotImplementedException();
        }

        public async Task<Paciente> ObterAsync(int Id)
        {
            return await _contexto.Pacientes.Where(p => p.Id == Id).Where(p => p.Ativo).FirstOrDefaultAsync();
        }   

        public Task<int> SalvarAsync(Paciente paciente)
        {
            throw new NotImplementedException();
        }
    }
}