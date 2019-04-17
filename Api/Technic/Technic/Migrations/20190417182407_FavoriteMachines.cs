using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Technic.Migrations
{
    public partial class FavoriteMachines : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User_FavoriteMachine",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    MachineId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_FavoriteMachine", x => new { x.MachineId, x.UserId });
                    table.ForeignKey(
                        name: "FK_User_FavoriteMachine_Machines_MachineId",
                        column: x => x.MachineId,
                        principalTable: "Machines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_FavoriteMachine_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_FavoriteMachine_UserId",
                table: "User_FavoriteMachine",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User_FavoriteMachine");
        }
    }
}
