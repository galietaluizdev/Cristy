using Cristy.Dominio.Entidades;
using Cristy.Dominio.Enumeradores;

namespace Cristy.Aplicacao.Models.Consulta.Resposta;

public class ConsultaRespostaDTO
{
    public int Id { get; set; }

    public DateOnly DataConsulta { get; set; }
    public int PacienteId { get; set; }
    public int DentistaId { get; set; }
    public string PacienteNome { get; set; }
    public string DentistaNome { get; set; }
    public string Descricao { get; set; } // dentista
    public string? HistoricoProcessado { get; set; } // IA retorna
    public string? InformacoesRelevantes { get; set; } // IA retorna 
    public StatusConsulta Status { get; set; } // sistema
    public bool Ativo { get; set; }
}