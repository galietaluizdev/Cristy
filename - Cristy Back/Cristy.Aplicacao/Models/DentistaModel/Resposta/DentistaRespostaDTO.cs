using Cristy.Aplicacao.Models.PacienteModel.Resposta;

namespace Cristy.Aplicacao.Models.DentistaModel.Resposta;

public class DentistaRespostaDTO : PacienteRespostaDTO
{
        public string CRO { get; set; }
        public string Especialidade { get; set; }
}