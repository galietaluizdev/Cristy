using System.Text.Json.Serialization;

namespace Cristy.Dominio.Entidades
{
    public class Paciente : Pessoa
    {
        [JsonIgnore]
        public ICollection<Consulta> Consultas { get; set; }
        public Paciente(){}
    }
}