

using Cristy.Aplicacao;
using Cristy.Aplicacao.Interfaces;
using Cristy.Aplicacao.Models.Paciente.Requisicao;
using Microsoft.AspNetCore.Mvc;

namespace Cristy.API.Controllers
{
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
                return Ok(await _pacienteAplicacao.CadastrarAsync(paciente));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
    }
}