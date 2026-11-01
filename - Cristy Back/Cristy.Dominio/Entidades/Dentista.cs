using System.Text.Json.Serialization;

namespace Cristy.Dominio.Entidades;

public class Dentista : Pessoa
{
    public string CRO { get; set; }
    public string Especialidade { get; set; }
    [JsonIgnore]
    public ICollection<Consulta> Consultas { get; set; }
    public Dentista()
    {
        Consultas = [];
    }
}