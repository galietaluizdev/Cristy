using Cristy.Aplicacao.Models.Paciente.Requisicao;

namespace Cristy.Aplicacao.Models.Dentista.Requisicao
{
    public class DentistaAtualizarDTO : PacienteAtualizarDTO
    {
        public string CRO { get; set; }
        public string Especialidade { get; set; }
    }
}