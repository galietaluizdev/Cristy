using Cristy.Dominio.Entidades;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Cristy.Repositorio
{
    public class DentistaRepositorio(CristyContext contexto) : BaseRepositorio<Dentista>(contexto), IDentistaRepositorio
    {
        
    }
}