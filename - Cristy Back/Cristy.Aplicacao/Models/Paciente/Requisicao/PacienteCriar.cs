namespace Cristy.Aplicacao.Models.Paciente.Requisicao
{
    public class PacienteCriar
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public DateOnly DataDeNascimento { get; set; }
    }
}