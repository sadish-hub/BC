using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class EnquiryLeadTypeColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Assignee",
                table: "Enquiries",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LeadType",
                table: "Enquiries",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Assignee",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "LeadType",
                table: "Enquiries");
        }
    }
}
