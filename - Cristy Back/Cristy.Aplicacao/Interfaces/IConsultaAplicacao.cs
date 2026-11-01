using Cristy.Aplicacao.Models.Consulta.Requisicao;
using Cristy.Aplicacao.Models.Consulta.Resposta;
using Cristy.Dominio.Entidades;

namespace Cristy.Aplicacao.Interfaces;

public interface IConsultaAplicacao
{
    Task<int> CadastrarAsync(ConsultaCadastrarDTO consulta);
    Task<ConsultaRespostaDTO> ObterAsync(int Id);
    Task AtualizarAsync(ConsultaAtualizarDTO consulta);
    Task<IEnumerable<ConsultaResumoDTO>> ListarResumoAsync(bool ativo);
    Task DefinirSituacaoAsync(bool Ativo, int Id);

}