using Cristy.Dominio.Entidades;
using Cristy.Dominio.Enumeradores;

namespace Cristy.Aplicacao.Models.Consulta.Resposta;
public class ConsultaResumoDTO
{
    public int Id { get; set; }
    public DateOnly DataConsulta { get; set; }
    public int PacienteId { get; set; }
    public int DentistaId { get; set; }
    public string PacienteNome { get; set; }
    public string DentistaNome { get; set; }
    public StatusConsulta Status { get; set; } // sistema
}