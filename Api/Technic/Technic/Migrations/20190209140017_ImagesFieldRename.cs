using Microsoft.EntityFrameworkCore.Migrations;

namespace Technic.Migrations
{
    public partial class ImagesFieldRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagesGuids",
                table: "Machines",
                newName: "ImagesIds");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagesIds",
                table: "Machines",
                newName: "ImagesGuids");
        }
    }
}
