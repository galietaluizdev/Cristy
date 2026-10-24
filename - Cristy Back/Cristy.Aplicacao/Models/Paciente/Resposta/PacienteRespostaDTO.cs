namespace Cristy.Aplicacao.Models.Paciente.Resposta;

public class PacienteRespostaDTO
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public DateOnly DataDeNascimento { get; set; }
    public bool Ativo { get; set; }
}