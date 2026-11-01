using Cristy.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cristy.Repositorio.Configurations;

public class ConsultaConfigurations : IEntityTypeConfiguration<Consulta>
{
    public void Configure(EntityTypeBuilder<Consulta> builder)
    {
        builder.ToTable("Consultas").HasKey(c => c.Id);

        builder.Property(c => c.DataConsulta).HasColumnName("Data Consulta").IsRequired();
        builder.Property(c => c.Descricao).HasColumnName("Descricao").IsRequired();
        builder.Property(c => c.HistoricoProcessado).HasColumnName("Historico").HasMaxLength(5000);
        builder.Property(c => c.InformacoesRelevantes).HasColumnName("Informacoes Relevantes").HasMaxLength(5000);
        builder.Property(c => c.Status).HasColumnName("Status").HasConversion<string>().HasMaxLength(20);

        builder.HasOne(c => c.Dentista)
        .WithMany(c => c.Consultas)
        .HasForeignKey(c => c.DentistaId)
        .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(c => c.Paciente)
        .WithMany(c => c.Consultas)
        .HasForeignKey(c => c.PacienteId)
        .OnDelete(DeleteBehavior.Restrict);
    }
}