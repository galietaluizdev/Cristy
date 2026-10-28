using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Dentista.Requisicao;
using Cristy.Aplicacao.Models.Dentista.Resposta;
using Microsoft.AspNetCore.Mvc;

namespace Cristy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class DentistaController(IDentistaAplicacao dentistaAplicacao) : ControllerBase
{
    private readonly IDentistaAplicacao _dentistaAplicacao = dentistaAplicacao;

    [HttpPost]
    [Route("Cadastrar")]
    public async Task<ActionResult<int>> CadastrarAsync([FromBody] DentistaCadastrarDTO dentista)
    {
        try
        {
            var Id = await _dentistaAplicacao.CadastrarAsync(dentista);
            return Ok($"Id cadastrado: {Id}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpGet]
    [Route("Listar")]
    public async Task<ActionResult<IEnumerable<DentistaRespostaDTO>>> ListarAsync([FromQuery] bool Ativo)
    {
        try
        {
            return Ok(await _dentistaAplicacao.ListarAsync(Ativo));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpGet]
    [Route("Obter/{Id}")]
    public async Task<ActionResult<DentistaRespostaDTO>> ObterAsync([FromRoute] int Id)
    {
        try
        {
            return Ok(await _dentistaAplicacao.ObterAsync(Id));

        }
        catch (Exception ex)
        {
            return NotFound(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpPut]
    [Route("Atualizar")]
    public async Task<ActionResult> Atualizar([FromBody] DentistaAtualizarDTO dentista)
    {
        try
        {
            await _dentistaAplicacao.AtualizarAsync(dentista);
            return Ok("Dentista atualizado com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpPut]
    [Route("DefinirSituacao/{Id}")]
    public async Task<ActionResult> DefinirSituacaoAsync([FromQuery] bool Ativo, [FromRoute] int Id)
    {
        try
        {
            await _dentistaAplicacao.DefinirSituacaoAsync(Ativo, Id);
            return Ok("Dentista Atualizado com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
}