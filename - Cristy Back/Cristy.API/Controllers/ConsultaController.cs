using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Consulta.Requisicao;
using Cristy.Aplicacao.Models.Consulta.Resposta;
using Microsoft.AspNetCore.Mvc;

namespace Cristy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ConsultaController(IConsultaAplicacao consultaAplicacao) : ControllerBase
{
    private readonly IConsultaAplicacao _consultaAplicacao = consultaAplicacao;

    [HttpPost]
    [Route("Cadastrar")]
    public async Task<ActionResult<int>> CadastrarAsync([FromBody] ConsultaCadastrarDTO consulta)
    {
        try
        {
            var Id = await _consultaAplicacao.CadastrarAsync(consulta);
            return Ok($"Id cadastrado: {Id}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpGet]
    [Route("Obter/{Id}")]
    public async Task<ActionResult<ConsultaRespostaDTO>> ObterAsync([FromRoute] int Id)
    {
        try
        {
            return Ok(await _consultaAplicacao.ObterAsync(Id));

        }
        catch (Exception ex)
        {
            return NotFound(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpPut]
    [Route("Atualizar")]
    public async Task<ActionResult> Atualizar([FromBody] ConsultaAtualizarDTO consulta)
    {
        try
        {
            await _consultaAplicacao.AtualizarAsync(consulta);
            return Ok("Consulta atualizado com sucesso");
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
            await _consultaAplicacao.DefinirSituacaoAsync(Ativo, Id);
            return Ok("Consulta Atualizado com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
























    [HttpGet]
    [Route("Listar")]
    public async Task<ActionResult<IEnumerable<ConsultaRespostaDTO>>> ListarResumoAsync([FromQuery] bool Ativo)
    {
        try
        {
            return Ok(await _consultaAplicacao.ListarResumoAsync(Ativo));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
}