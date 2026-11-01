using Cristy.Aplicacao.Models.PacienteModel.Requisicao;

namespace Cristy.Aplicacao.Models.DentistaModel.Requisicao
{
    public class DentistaCadastrarDTO : PacienteCadastrarDTO
    {
        public string CRO { get; set; }
        public string Especialidade { get; set; }
    }
}