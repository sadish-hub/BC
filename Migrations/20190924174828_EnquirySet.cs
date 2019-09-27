using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class EnquirySet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiry_Customers_CustomerId",
                table: "Enquiry");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiry_Vechicles_VechicleId",
                table: "Enquiry");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enquiry",
                table: "Enquiry");

            migrationBuilder.RenameTable(
                name: "Enquiry",
                newName: "Enquiries");

            migrationBuilder.RenameIndex(
                name: "IX_Enquiry_VechicleId",
                table: "Enquiries",
                newName: "IX_Enquiries_VechicleId");

            migrationBuilder.RenameIndex(
                name: "IX_Enquiry_CustomerId",
                table: "Enquiries",
                newName: "IX_Enquiries_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enquiries",
                table: "Enquiries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Customers_CustomerId",
                table: "Enquiries",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Vechicles_VechicleId",
                table: "Enquiries",
                column: "VechicleId",
                principalTable: "Vechicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Customers_CustomerId",
                table: "Enquiries");

            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Vechicles_VechicleId",
                table: "Enquiries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Enquiries",
                table: "Enquiries");

            migrationBuilder.RenameTable(
                name: "Enquiries",
                newName: "Enquiry");

            migrationBuilder.RenameIndex(
                name: "IX_Enquiries_VechicleId",
                table: "Enquiry",
                newName: "IX_Enquiry_VechicleId");

            migrationBuilder.RenameIndex(
                name: "IX_Enquiries_CustomerId",
                table: "Enquiry",
                newName: "IX_Enquiry_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Enquiry",
                table: "Enquiry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiry_Customers_CustomerId",
                table: "Enquiry",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiry_Vechicles_VechicleId",
                table: "Enquiry",
                column: "VechicleId",
                principalTable: "Vechicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
