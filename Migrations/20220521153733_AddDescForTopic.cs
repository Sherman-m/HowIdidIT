using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HowIdidIT.Migrations
{
    public partial class AddDescForTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "topics",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "topics");
        }
    }
}
