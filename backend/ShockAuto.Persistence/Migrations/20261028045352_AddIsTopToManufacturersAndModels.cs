using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShockAuto.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIsTopToManufacturersAndModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsTop",
                table: "Models",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTop",
                table: "Manufacturers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.Sql("UPDATE Manufacturers SET IsTop = 1 WHERE Id IN (40, 25, 3, 16, 14, 12, 77, 29, 2, 5)");

            migrationBuilder.Sql(@"UPDATE Models SET IsTop = 1 WHERE Id IN (
                13, 49, 18, 45, 28, 53,
                330, 239, 358, 378, 353, 266,
                747, 712, 752, 746, 711, 720,
                825, 821, 840, 817, 815, 837,
                861, 865, 871, 867, 875, 874,
                967, 951, 989, 968, 969, 950,
                1000, 1001, 998, 999, 1002,
                1009, 1071, 1076, 1062, 1065, 1063,
                1101, 1120, 1118, 1103, 1102, 1115,
                1205, 1179, 1187, 1164, 1149, 1159,
                1234, 1223, 1225, 1239, 1229, 1233,
                1256, 1268, 1269, 1242, 1244, 1245,
                1274, 1275, 1279,
                1291, 1283, 1284, 1286,
                1305, 1308, 1294, 1296, 1300, 1306,
                1310,
                1321, 1314, 1320, 1313, 1317,
                1332,
                1355, 1384,
                1397, 1395, 1401, 1398, 1389, 1387,
                1444, 1436, 1428, 1443, 1427, 1419,
                1492, 1474, 1493, 1495, 1472, 1473,
                1537, 1540, 1529, 1509, 1543, 1538,
                1567, 1572, 1557, 1574,
                1586, 1595, 1578, 1591, 1588, 1596,
                1609, 1629, 1635, 1630, 1608, 1610,
                1676, 1669, 1660, 1662, 1667, 1672,
                1692, 1684, 1688, 1693, 1685, 1689,
                1706,
                1720,
                2168, 2167, 2159, 2154, 2172, 2152,
                2174, 2188, 2211, 2229,
                2243,
                2302, 2299, 2303, 2290, 2298, 2320,
                2359, 2330, 2362, 2365, 2360, 2346,
                2372,
                2373,
                2383, 2384,
                2391, 2396, 2390, 2408, 2420, 2405,
                2434, 2436, 2428, 2425, 2432, 2444,
                2447, 2448, 2450, 2449, 2446,
                2459, 2461, 2458, 2455, 2460, 2457,
                2463,
                2490, 2484, 2487,
                2492, 2494, 2496,
                2499, 2501, 2503,
                2514, 2513, 2512, 2516,
                2518, 2519, 2517, 2520,
                2539, 2542, 2543, 2526, 2549, 2540,
                2560, 2561, 2554, 2563,
                2578, 2581, 2568, 2571, 2579
            )");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTop",
                table: "Models");

            migrationBuilder.DropColumn(
                name: "IsTop",
                table: "Manufacturers");
        }
    }
}
