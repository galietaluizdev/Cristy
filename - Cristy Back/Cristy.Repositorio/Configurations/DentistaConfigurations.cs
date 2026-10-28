using Cristy.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Cristy.Repositorio.Configurations;

public class DentistaConfigurations : IEntityTypeConfiguration<Dentista>
{
    public void Configure(EntityTypeBuilder<Dentista> builder)
    {
        builder.ToTable("Dentista").HasKey(p => p.Id);
        builder.Property(p => p.CRO).HasColumnName("CRO").HasMaxLength(20).IsRequired();;
        builder.Property(p => p.Especialidade).HasColumnName("Especialidade").HasMaxLength(50);;

    }
}