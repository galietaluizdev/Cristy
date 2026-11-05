
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

builder.Services.AddScoped<IConsultaAplicacao, ConsultaAplicacao>();
builder.Services.AddScoped<IConsultaRepositorio, ConsultaRepositorio>();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<CristyContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

