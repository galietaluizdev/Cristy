using Cristy.Aplicacao.Models.Paciente.Resposta;

namespace Cristy.Aplicacao.Models.Dentista.Resposta;

public class DentistaRespostaDTO : PacienteRespostaDTO
{
        public string CRO { get; set; }
        public string Especialidade { get; set; }
}