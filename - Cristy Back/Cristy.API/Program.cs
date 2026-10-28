
using Cristy.Aplicacao;
using Cristy.Aplicacao.Interfaces;
using Cristy.Dominio.Interfaces;
using Cristy.Repositorio;
using Cristy.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddScoped<IPacienteAplicacao, PacienteAplicacao>();
builder.Services.AddScoped<IPacienteRepositorio, PacienteRepositorio>();

builder.Services.AddScoped<IDentistaAplicacao, DentistaAplicacao>();
builder.Services.AddScoped<IDentistaRepositorio, DentistaRepositorio>();



builder.Services.AddDbContext<CristyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

