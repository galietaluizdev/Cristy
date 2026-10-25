### Objetivos

- Cadastrar e gerenciar pacientes
- Registrar consultas odontológicas
- Gerar resumo e classificação das consultas com IA
- Recuperar o histórico relevante do paciente em novos atendimentos

O projeto tem duas fases:

- **Fase 1 (base):** API, banco de dados e CRUD de pacientes e consultas.
- **Fase 2 (IA):** integração com a Mistral e processamento das consultas em segundo plano.

### Requisitos

- .NET X SDK
- SQL Server Express
- SSMS (opcional)

### Instalação

```bash
dotnet tool install --global dotnet-ef
```

### Dependências

| Projeto            | Pacote                                  |
| ------------------ | --------------------------------------- |
| Cristy.Repositorio | Microsoft.EntityFrameworkCore.SqlServer |
| Cristy.API         | Microsoft.EntityFrameworkCore.Design    |
| Cristy.API         | Swashbuckle.AspNetCore                  |

### Como rodar

1. Clone o repositório.
2. Em `Cristy.API/appsettings.json`, ajuste a connection string:
   ```json
   "ConnectionStrings": {
     "Default": "Server=SEU_SERVIDOR_Proprio\\SQLEXPRESS;Database=Cristy;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```
3. Na pasta `Cristy.Repositorio`, crie o banco:
   ```bash
   dotnet ef migrations add Initial --startup-project ..\Cristy.API
   dotnet ef database update --startup-project ..\Cristy.API
   ```
4. Inicie a API:
   ````bash
   dotnet run --project Cristy.API
   ```.
   ````
5. Acesse o Swagger: http://localhost:5219/swagger/index.html

### Decisões técnicas

- **4 camadas:** separar regra de negócio, acesso a dados e entrada HTTP, para que uma mudança em uma parte não quebre as outras
- **Processamento da IA em segundo plano:** a consulta é salva com status "pendente" e um serviço em segundo plano a processa depois. O usuário não espera a resposta da IA
   <!-- Rascunho: sistema de registro de consultas odontológicas. Ao gerar um relatório, uma IA processa a consulta, classifica o que é importante e devolve um resumo pré-montado. O dentista valida e salva. Quando o paciente retorna, o sistema traz apenas as informações relevantes já salvas. -->

### Funcionalidades

- [ ] Cadastrar paciente
- [ ] Listar pacientes
- [ ] Buscar paciente por id
- [ ] Editar paciente
- [ ] Deletar paciente
- [ ] Registrar consulta
- [ ] Gerar resumo da consulta com IA
- [ ] Validar e salvar o resumo
