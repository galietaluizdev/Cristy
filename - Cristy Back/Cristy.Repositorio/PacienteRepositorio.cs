using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public class PacienteRepositorio(CristyContext contexto) : BaseRepositorio<Paciente>(contexto) , IPacienteRepositorio
    {

    }
}