using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class UpdateEnquiry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Kilometer",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Registration",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Enquiries",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Kilometer",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "Registration",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Enquiries");
        }
    }
}
