
using Cristy.Dominio.Enumeradores;

namespace Cristy.Dominio.Entidades;

public class Consulta : EntidadeBase
{
    public DateOnly DataConsulta { get; set; } // 
    public int PacienteId { get; set; } // 
    public int DentistaId { get; set; } // 
    public Paciente Paciente { get; set; }
    public Dentista Dentista { get; set; }
    public string Descricao { get; set; } // dentista
    public string? HistoricoProcessado { get; set; } // IA retorna
    public string? InformacoesRelevantes { get; set; } // IA retorna 
    public StatusConsulta Status { get; set; } // sistema

    public Consulta()
    {
        Status = 0;
    }

}