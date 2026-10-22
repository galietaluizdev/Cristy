using Microsoft.EntityFrameworkCore;
using Cristy.Dominio.Entidades;
using Cristy.Repositorio.Configurations;
namespace Cristy.Repositorio.Contexto
{
    public class CristyContext : DbContext
    {
        public DbSet<Paciente> Pacientes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=NOTEBOOK_LUIZ\\SQLEXPRESS;Database=Cristy;Trusted_Connection=True;TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PacienteConfigurations());
        }
    }
}