using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HowIdidIT.Migrations
{
    public partial class ChangesPropetries : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type_id",
                table: "types_of_users",
                newName: "type_of_user_id");

            migrationBuilder.RenameColumn(
                name: "last_added",
                table: "topics",
                newName: "last_modification");

            migrationBuilder.AddColumn<DateTime>(
                name: "last_modification",
                table: "messages",
                type: "timestamp",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_email",
                table: "users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_nickname",
                table: "users",
                column: "nickname",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_types_of_users_name",
                table: "types_of_users",
                column: "name",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_users_email",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_users_nickname",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_types_of_users_name",
                table: "types_of_users");

            migrationBuilder.DropColumn(
                name: "last_modification",
                table: "messages");

            migrationBuilder.RenameColumn(
                name: "type_of_user_id",
                table: "types_of_users",
                newName: "type_id");

            migrationBuilder.RenameColumn(
                name: "last_modification",
                table: "topics",
                newName: "last_added");
        }
    }
}
