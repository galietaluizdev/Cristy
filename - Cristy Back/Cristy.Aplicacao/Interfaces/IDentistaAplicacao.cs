using Cristy.Aplicacao.Models.Dentista.Requisicao;
using Cristy.Aplicacao.Models.Dentista.Resposta;
using Cristy.Dominio.Entidades;

namespace Cristy.Aplicacao.Interfaces
{
    public interface IDentistaAplicacao
    {
        Task<int> CadastrarAsync(DentistaCadastrarDTO dentista);
        Task<DentistaRespostaDTO> ObterAsync(int Id);
        Task<IEnumerable<DentistaRespostaDTO>> ListarAsync(bool ativo);
        Task AtualizarAsync(DentistaAtualizarDTO dentista);
        Task DefinirSituacaoAsync(bool Ativo, int Id);

    }
}