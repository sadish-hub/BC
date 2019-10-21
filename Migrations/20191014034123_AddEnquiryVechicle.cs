using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class AddEnquiryVechicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Enquiries_Vechicles_VechicleId",
                table: "Enquiries");

            migrationBuilder.DropIndex(
                name: "IX_Enquiries_VechicleId",
                table: "Enquiries");

            migrationBuilder.DropColumn(
                name: "VechicleId",
                table: "Enquiries");

            migrationBuilder.CreateTable(
                name: "EnquiryVechicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    EnquiryId = table.Column<Guid>(nullable: false),
                    VechicleId = table.Column<Guid>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnquiryVechicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EnquiryVechicles_Enquiries_EnquiryId",
                        column: x => x.EnquiryId,
                        principalTable: "Enquiries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EnquiryVechicles_Vechicles_VechicleId",
                        column: x => x.VechicleId,
                        principalTable: "Vechicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EnquiryVechicles_EnquiryId",
                table: "EnquiryVechicles",
                column: "EnquiryId");

            migrationBuilder.CreateIndex(
                name: "IX_EnquiryVechicles_VechicleId",
                table: "EnquiryVechicles",
                column: "VechicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnquiryVechicles");

            migrationBuilder.AddColumn<Guid>(
                name: "VechicleId",
                table: "Enquiries",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_VechicleId",
                table: "Enquiries",
                column: "VechicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Enquiries_Vechicles_VechicleId",
                table: "Enquiries",
                column: "VechicleId",
                principalTable: "Vechicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
