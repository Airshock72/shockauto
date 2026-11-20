using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShockAuto.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddApplications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Currency",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currency", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameKa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    IsForSale = table.Column<bool>(type: "bit", nullable: false),
                    IsDaily = table.Column<bool>(type: "bit", nullable: true),
                    WithDriver = table.Column<bool>(type: "bit", nullable: true),
                    WithBuyoutOption = table.Column<bool>(type: "bit", nullable: true),
                    IsInsured = table.Column<bool>(type: "bit", nullable: true),
                    ForTaxi = table.Column<bool>(type: "bit", nullable: true),
                    ManufacturerId = table.Column<int>(type: "int", nullable: false),
                    ModelId = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    TrimLevel = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: true),
                    FuelType = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    BodyType = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: true),
                    CylinderCount = table.Column<int>(type: "int", nullable: false),
                    EngineDisplacement = table.Column<decimal>(type: "decimal(3,1)", precision: 3, scale: 1, nullable: true),
                    HasTurbo = table.Column<bool>(type: "bit", nullable: true),
                    Mileage = table.Column<int>(type: "int", nullable: false),
                    IsKm = table.Column<bool>(type: "bit", nullable: false),
                    IsLeftSteeringWheel = table.Column<bool>(type: "bit", nullable: false),
                    TransmissionType = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    DriveTrain = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    DoorsCount = table.Column<int>(type: "int", nullable: false),
                    HasThirdRowSeats = table.Column<bool>(type: "bit", nullable: true),
                    HasCatalyticConverter = table.Column<bool>(type: "bit", nullable: true),
                    HasAirbags = table.Column<int>(type: "int", nullable: false),
                    ExteriorColor = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    InteriorColor = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    InteriorMaterial = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    HasPowerSteering = table.Column<bool>(type: "bit", nullable: true),
                    HasOnBoardComputer = table.Column<bool>(type: "bit", nullable: true),
                    HasAirConditioning = table.Column<bool>(type: "bit", nullable: true),
                    HasParkingSensors = table.Column<bool>(type: "bit", nullable: true),
                    HasRearViewCamera = table.Column<bool>(type: "bit", nullable: true),
                    HasPowerWindows = table.Column<bool>(type: "bit", nullable: true),
                    HasClimateControl = table.Column<bool>(type: "bit", nullable: true),
                    HasCruiseControl = table.Column<bool>(type: "bit", nullable: true),
                    HasStartStopSystem = table.Column<bool>(type: "bit", nullable: true),
                    HasSunroof = table.Column<bool>(type: "bit", nullable: true),
                    HasHeatedSeats = table.Column<bool>(type: "bit", nullable: true),
                    HasSeatMemory = table.Column<bool>(type: "bit", nullable: true),
                    HasAbs = table.Column<bool>(type: "bit", nullable: true),
                    HasTractionControl = table.Column<bool>(type: "bit", nullable: true),
                    HasCentralLocking = table.Column<bool>(type: "bit", nullable: true),
                    HasAlarm = table.Column<bool>(type: "bit", nullable: true),
                    HasFogLights = table.Column<bool>(type: "bit", nullable: true),
                    HasNavigationSystem = table.Column<bool>(type: "bit", nullable: true),
                    HasAux = table.Column<bool>(type: "bit", nullable: true),
                    HasBluetooth = table.Column<bool>(type: "bit", nullable: true),
                    HasMultifunctionSteeringWheel = table.Column<bool>(type: "bit", nullable: true),
                    HasAlloyWheels = table.Column<bool>(type: "bit", nullable: true),
                    HasSpareTire = table.Column<bool>(type: "bit", nullable: true),
                    IsAdaptedForPeopleWithDisabilities = table.Column<bool>(type: "bit", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    IsCustomsCleared = table.Column<bool>(type: "bit", nullable: true),
                    Price = table.Column<int>(type: "int", nullable: false),
                    CurrencyId = table.Column<int>(type: "int", nullable: false),
                    IsPriceNegotiable = table.Column<bool>(type: "bit", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MobilePhone = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_Currency_CurrencyId",
                        column: x => x.CurrencyId,
                        principalTable: "Currency",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Location_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Location",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Manufacturers_ManufacturerId",
                        column: x => x.ManufacturerId,
                        principalTable: "Manufacturers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Models_ModelId",
                        column: x => x.ModelId,
                        principalTable: "Models",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PublicId = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(512)", maxLength: 512, nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationImages_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationImages_ApplicationId_Order",
                table: "ApplicationImages",
                columns: new[] { "ApplicationId", "Order" });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CurrencyId",
                table: "Applications",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_LocationId",
                table: "Applications",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ManufacturerId",
                table: "Applications",
                column: "ManufacturerId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ModelId",
                table: "Applications",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_UserId",
                table: "Applications",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationImages");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "Currency");

            migrationBuilder.DropTable(
                name: "Location");
        }
    }
}
