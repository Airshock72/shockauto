using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShockAuto.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddNameKaToGasolineTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameKa",
                table: "GasolineTypes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameKa",
                table: "GasolineTypes");
        }
    }
}
