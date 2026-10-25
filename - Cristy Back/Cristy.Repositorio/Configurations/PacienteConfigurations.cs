using Cristy.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cristy.Repositorio.Configurations;

public class PacienteConfigurations : IEntityTypeConfiguration<Paciente>
{
    public void Configure(EntityTypeBuilder<Paciente> builder)
    {
        builder.ToTable("Paciente").HasKey(p => p.Id);

        builder.Property(p => p.Id).HasColumnName("Id");
        builder.Property(p => p.Nome).HasColumnName("Nome").HasMaxLength(100).IsRequired(true);
        builder.Property(p => p.Email).HasColumnName("Email").HasMaxLength(100).IsRequired(true);
        builder.Property(p => p.Telefone).HasColumnName("Telefone").HasMaxLength(15).IsRequired(true);
        builder.Property(p => p.DataDeNascimento).HasColumnName("Data de Nascimento").IsRequired(true);
        builder.Property(p => p.Ativo).HasColumnName("Ativo");
    }
}