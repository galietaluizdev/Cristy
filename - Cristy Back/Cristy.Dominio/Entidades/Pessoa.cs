namespace Cristy.Dominio.Entidades
{
    public abstract class Pessoa : EntidadeBase
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public DateOnly DataDeNascimento { get; set; }

    }
}