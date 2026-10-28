namespace Cristy.Dominio.Entidades;

public abstract class EntidadeBase
{
    public int Id { get; set; }
    public bool Ativo { get; set; }
    public EntidadeBase()
    {
        Ativo = true;
    }
    public void DefinirSituacaoAsync(bool ativo)
    {
        Ativo = ativo;
    }
}