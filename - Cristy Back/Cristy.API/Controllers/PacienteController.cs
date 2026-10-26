

using Cristy.Aplicacao;
using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Cristy.Aplicacao.Models.Paciente.Resposta;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Cristy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class PacienteController(IPacienteAplicacao pacienteAplicacao) : ControllerBase
{
    private readonly IPacienteAplicacao _pacienteAplicacao = pacienteAplicacao;


    [HttpPost]
    [Route("Cadastrar")]
    public async Task<ActionResult<int>> CadastrarAsync([FromBody] PacienteCadastrarDTO paciente)
    {
        try
        {
            var Id = await _pacienteAplicacao.CadastrarAsync(paciente);
            return Ok($"Id cadastrado: {Id}");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpGet]
    [Route("Listar")]
    public async Task<ActionResult<IEnumerable<PacienteRespostaDTO>>> ListarAsync([FromQuery] bool Ativo)
    {
        try
        {
            return Ok(await _pacienteAplicacao.ListarAsync(Ativo));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpGet]
    [Route("Obter/{Id}")]
    public async Task<ActionResult<PacienteRespostaDTO>> ObterAsync([FromRoute] int Id)
    {
        try
        {
            return Ok(await _pacienteAplicacao.ObterAsync(Id));

        }
        catch (Exception ex)
        {
            return NotFound(ex.InnerException?.Message ?? ex.Message);
        }
    }
    [HttpPut]
    [Route("Atualizar")]
    public async Task<ActionResult> Atualizar([FromBody] PacienteAtualizarDTO paciente)
    {
        try
        {
            await _pacienteAplicacao.AtualizarAsync(paciente);
            return Ok("Paciente atualizado com sucesso");
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
            await _pacienteAplicacao.DefinirSituacaoAsync(Ativo, Id);
            return Ok("Paciente Atualizado com sucesso");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.InnerException?.Message ?? ex.Message);
        }
    }
}
