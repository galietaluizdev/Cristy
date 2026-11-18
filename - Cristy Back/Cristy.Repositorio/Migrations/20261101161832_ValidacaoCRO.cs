using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cristy.Repositorio.Migrations
{
    /// <inheritdoc />
    public partial class ValidacaoCRO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Dentista_CRO",
                table: "Dentista",
                column: "CRO",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Dentista_CRO",
                table: "Dentista");
        }
    }
}
