namespace Cristy.Dominio.Entidades
{
    public class Paciente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public DateOnly DataDeNascimento { get; set; }
        public bool Ativo { get; set; }
        public Paciente()
        {
            Ativo = true;
        }
        public void DefinirSituacaoAsync(bool ativo)
        {
            Ativo = ativo;
        }
    }
}