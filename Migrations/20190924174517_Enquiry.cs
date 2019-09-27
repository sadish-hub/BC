using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class Enquiry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Enquiry",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    SourcingPoint = table.Column<int>(nullable: false),
                    CustomerId = table.Column<Guid>(nullable: false),
                    VechicleId = table.Column<Guid>(nullable: false),
                    ProvidedDetails = table.Column<bool>(nullable: false),
                    NextFollowUp = table.Column<DateTime>(nullable: true),
                    CallStatus = table.Column<int>(nullable: false),
                    Comments = table.Column<string>(nullable: true),
                    ExactRequirement = table.Column<string>(nullable: true),
                    AlternateCar = table.Column<string>(nullable: true),
                    Budget = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    Status = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enquiry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enquiry_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enquiry_Vechicles_VechicleId",
                        column: x => x.VechicleId,
                        principalTable: "Vechicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Enquiry_CustomerId",
                table: "Enquiry",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiry_VechicleId",
                table: "Enquiry",
                column: "VechicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Enquiry");
        }
    }
}
