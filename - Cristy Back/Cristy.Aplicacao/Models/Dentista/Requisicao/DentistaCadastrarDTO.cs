using Cristy.Aplicacao.Models.Paciente.Requisicao;

namespace Cristy.Aplicacao.Models.Dentista.Requisicao
{
    public class DentistaCadastrarDTO : PacienteCadastrarDTO
    {
        public string CRO { get; set; }
        public string Especialidade { get; set; }
    }
}