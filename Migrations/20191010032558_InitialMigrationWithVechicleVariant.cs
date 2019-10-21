using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace bright_choice.Migrations
{
    public partial class InitialMigrationWithVechicleVariant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
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
                name: "DailyStatusReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    WebStatus = table.Column<string>(maxLength: 500, nullable: true),
                    TotalNoOfCar = table.Column<int>(nullable: true),
                    WithPhotos = table.Column<bool>(nullable: true),
                    MoreThan30Days = table.Column<string>(nullable: true),
                    InfoVia = table.Column<int>(nullable: false),
                    FreshCall = table.Column<int>(nullable: true),
                    OldCall = table.Column<int>(nullable: true),
                    DealerCall = table.Column<int>(nullable: true),
                    TotalCall = table.Column<int>(nullable: true),
                    NoOfAppointment = table.Column<int>(nullable: true),
                    NoOfAdvanceRecd = table.Column<int>(nullable: true),
                    NoOfCarsSold = table.Column<int>(nullable: true),
                    Executive = table.Column<string>(maxLength: 500, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyStatusReports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VechicleVariants",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Make = table.Column<string>(maxLength: 200, nullable: false),
                    Model = table.Column<string>(maxLength: 200, nullable: false),
                    Variant = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VechicleVariants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vechicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    VechicleVariantId = table.Column<Guid>(nullable: false),
                    Inventory = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: true),
                    VechicleNumber = table.Column<string>(maxLength: 200, nullable: false),
                    Kilometer = table.Column<int>(nullable: true),
                    Registration = table.Column<string>(nullable: true),
                    Budget = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    SellerName = table.Column<string>(maxLength: 100, nullable: true),
                    SellerContactNumber = table.Column<string>(maxLength: 20, nullable: true),
                    RC = table.Column<bool>(nullable: true),
                    Insurance = table.Column<bool>(nullable: true),
                    Status = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vechicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vechicles_VechicleVariants_VechicleVariantId",
                        column: x => x.VechicleVariantId,
                        principalTable: "VechicleVariants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerVechicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "newid()"),
                    Type = table.Column<int>(nullable: false),
                    CustomerId = table.Column<Guid>(nullable: false),
                    VechicleId = table.Column<Guid>(nullable: false),
                    Bank = table.Column<string>(maxLength: 200, nullable: true),
                    LoanAmount = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    BankAccNo = table.Column<string>(maxLength: 100, nullable: true),
                    Tenor = table.Column<int>(nullable: true),
                    EMI = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    EMIDate = table.Column<DateTime>(nullable: true),
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

            migrationBuilder.CreateTable(
                name: "Enquiries",
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
                    ExactRequirement = table.Column<string>(maxLength: 2000, nullable: true),
                    AlternateCar = table.Column<string>(maxLength: 1000, nullable: true),
                    Budget = table.Column<decimal>(type: "decimal(18, 6)", nullable: true),
                    Status = table.Column<int>(nullable: false),
                    History = table.Column<string>(nullable: true),
                    Assignee = table.Column<string>(nullable: true),
                    LeadType = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enquiries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Enquiries_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Enquiries_Vechicles_VechicleId",
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

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_CustomerId",
                table: "Enquiries",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Enquiries_VechicleId",
                table: "Enquiries",
                column: "VechicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Vechicles_VechicleVariantId",
                table: "Vechicles",
                column: "VechicleVariantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerVechicles");

            migrationBuilder.DropTable(
                name: "DailyStatusReports");

            migrationBuilder.DropTable(
                name: "Enquiries");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Vechicles");

            migrationBuilder.DropTable(
                name: "VechicleVariants");
        }
    }
}
