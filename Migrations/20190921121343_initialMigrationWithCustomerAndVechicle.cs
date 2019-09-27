using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class initialMigrationWithCustomerAndVechicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    ACFormat = table.Column<string>(maxLength: 20, nullable: false),
                    ACNo = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Address = table.Column<string>(nullable: true),
                    LandlineNumber = table.Column<string>(maxLength: 20, nullable: true),
                    MobileNumber = table.Column<string>(maxLength: 20, nullable: true),
                    EmailId = table.Column<string>(maxLength: 255, nullable: true),
                    OfficeName = table.Column<string>(maxLength: 200, nullable: true),
                    OfficeAddress = table.Column<string>(nullable: true),
                    OfficeLandline = table.Column<string>(maxLength: 20, nullable: true),
                    OfficeEmail = table.Column<string>(maxLength: 255, nullable: true),
                    DOB = table.Column<DateTime>(nullable: true),
                    WeddingAnniversary = table.Column<DateTime>(nullable: true),
                    AnyOtherCar = table.Column<bool>(nullable: true),
                    InsuranceDetails = table.Column<string>(maxLength: 2000, nullable: true),
                    ServiceDetails = table.Column<string>(maxLength: 1000, nullable: true),
                    NextCarDetails = table.Column<string>(maxLength: 2000, nullable: true),
                    ThankYou = table.Column<bool>(nullable: true),
                    Religion = table.Column<int>(nullable: false),
                    Native = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vechicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Inventory = table.Column<int>(nullable: false),
                    Make = table.Column<string>(maxLength: 200, nullable: false),
                    Model = table.Column<string>(maxLength: 200, nullable: false),
                    Variant = table.Column<string>(nullable: true),
                    Year = table.Column<int>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vechicles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerVechicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    CustomerId = table.Column<Guid>(nullable: false),
                    VechicleId = table.Column<Guid>(nullable: false),
                    VechicleNumber = table.Column<string>(maxLength: 200, nullable: false),
                    Budget = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    SellerName = table.Column<string>(maxLength: 100, nullable: true),
                    SellerContactNumber = table.Column<string>(maxLength: 20, nullable: true),
                    Bank = table.Column<string>(maxLength: 200, nullable: true),
                    LoanAmount = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    BankAccNo = table.Column<string>(maxLength: 100, nullable: true),
                    Tenor = table.Column<int>(nullable: true),
                    EMI = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    EMIDate = table.Column<DateTime>(nullable: true),
                    RC = table.Column<bool>(nullable: true),
                    Insurance = table.Column<bool>(nullable: true),
                    Status = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerVechicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerVechicles_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerVechicles_Vechicles_VechicleId",
                        column: x => x.VechicleId,
                        principalTable: "Vechicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerVechicles_CustomerId",
                table: "CustomerVechicles",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerVechicles_VechicleId",
                table: "CustomerVechicles",
                column: "VechicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerVechicles");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Vechicles");
        }
    }
}
