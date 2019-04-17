using Microsoft.EntityFrameworkCore.Migrations;

namespace Technic.Migrations
{
    public partial class FavoriteMachinesSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_FavoriteMachine_Machines_MachineId",
                table: "User_FavoriteMachine");

            migrationBuilder.DropForeignKey(
                name: "FK_User_FavoriteMachine_Users_UserId",
                table: "User_FavoriteMachine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User_FavoriteMachine",
                table: "User_FavoriteMachine");

            migrationBuilder.RenameTable(
                name: "User_FavoriteMachine",
                newName: "User_FavoriteMachines");

            migrationBuilder.RenameIndex(
                name: "IX_User_FavoriteMachine_UserId",
                table: "User_FavoriteMachines",
                newName: "IX_User_FavoriteMachines_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_FavoriteMachines",
                table: "User_FavoriteMachines",
                columns: new[] { "MachineId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_User_FavoriteMachines_Machines_MachineId",
                table: "User_FavoriteMachines",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_FavoriteMachines_Users_UserId",
                table: "User_FavoriteMachines",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_FavoriteMachines_Machines_MachineId",
                table: "User_FavoriteMachines");

            migrationBuilder.DropForeignKey(
                name: "FK_User_FavoriteMachines_Users_UserId",
                table: "User_FavoriteMachines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User_FavoriteMachines",
                table: "User_FavoriteMachines");

            migrationBuilder.RenameTable(
                name: "User_FavoriteMachines",
                newName: "User_FavoriteMachine");

            migrationBuilder.RenameIndex(
                name: "IX_User_FavoriteMachines_UserId",
                table: "User_FavoriteMachine",
                newName: "IX_User_FavoriteMachine_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_FavoriteMachine",
                table: "User_FavoriteMachine",
                columns: new[] { "MachineId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_User_FavoriteMachine_Machines_MachineId",
                table: "User_FavoriteMachine",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_FavoriteMachine_Users_UserId",
                table: "User_FavoriteMachine",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
