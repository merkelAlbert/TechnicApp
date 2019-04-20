using Microsoft.EntityFrameworkCore.Migrations;

namespace Technic.Migrations
{
    public partial class SpecificationsMeasures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Measure",
                table: "Specifications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Measure",
                table: "Specifications");
        }
    }
}
