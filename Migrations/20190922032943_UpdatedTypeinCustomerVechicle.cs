using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class UpdatedTypeinCustomerVechicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "CustomerVechicles",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "CustomerVechicles");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Customers",
                nullable: false,
                defaultValue: 0);
        }
    }
}
