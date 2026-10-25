using Microsoft.EntityFrameworkCore;
using Cristy.Dominio.Entidades;
using Cristy.Repositorio.Configurations;
namespace Cristy.Repositorio.Contexto
{
    public class CristyContext(DbContextOptions<CristyContext> options) : DbContext(options)
    {
        public DbSet<Paciente> Pacientes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PacienteConfigurations());
        }
    }
}