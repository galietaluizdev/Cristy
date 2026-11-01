using Cristy.Dominio.Enumeradores;
using Cristy.Dominio.Entidades;

namespace Cristy.Aplicacao.Models.Consulta.Requisicao;

public class ConsultaCadastrarDTO
{
    public DateOnly DataConsulta { get; set; }
    public int PacienteId { get; set; }
    public int DentistaId { get; set; }
    public string Descricao { get; set; } // dentista
}