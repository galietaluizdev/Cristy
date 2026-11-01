namespace Cristy.Aplicacao.Models.Consulta.Requisicao;
public class ConsultaAtualizarDTO
{
    public int Id { get; set; }

    public DateOnly DataConsulta { get; set; }
    // public int PacienteId { get; set; }  preferi tirar pra 
    // public int DentistaId { get; set; }
    public string Descricao { get; set; } // dentista
}