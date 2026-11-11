using ShockAuto.Domain.Entities.Common;
using ShockAuto.Domain.Enums;

namespace ShockAuto.Domain.Entities;

public class Application : AuditableEntity
{
    public required Guid Id { get; set; }
    
    public required VehicleCategory Category { get; set; }
    public required bool IsForSale { get; set; }
    
    public bool? IsDaily { get; set; }
    public bool? WithDriver { get; set; }
    public bool? WithBuyoutOption { get; set; }
    public bool? IsInsured { get; set; }
    public bool? ForTaxi { get; set; }
    
    // ძირითადი მახასიათებლები
    
    public required int ManufacturerId { get; set; }
    public required int ModelId { get; set; }
    public required int Year { get; set; }
    public string? TrimLevel { get; set; }
    public required Fuel FuelType { get; set; }
    public required VehicleBody? BodyType { get; set; }
    public required int CylinderCount { get; set; }
    public required decimal? EngineDisplacement { get; set; }
    public bool? HasTurbo { get; set; }
    
    public required int Mileage { get; set; }
    public required bool IsKm { get; set; }
    public required bool IsLeftSteeringWheel { get; set; }
    public required Transmission TransmissionType { get; set; }
    public required DriveTrain DriveTrain { get; set; }
    public required int DoorsCount { get; set; }
    public bool? HasThirdRowSeats { get; set; }
    public bool? HasCatalyticConverter { get; set; }
    public required int HasAirbags { get; set; }
    public required ExteriorColor ExteriorColor { get; set; }
    public required InteriorColor InteriorColor { get; set; }
    public required InteriorMaterial InteriorMaterial { get; set; }
    
    public bool? HasPowerSteering { get; set; }                   // ჰიდრავლიკა
    public bool? HasOnBoardComputer { get; set; }                 // ბორტკომპიუტერი
    public bool? HasAirConditioning { get; set; }                 // კონდიციონერი
    public bool? HasParkingSensors { get; set; }                  // პარკინგკონტროლი
    public bool? HasRearViewCamera { get; set; }                  // უკანა ხედვის კამერა
    public bool? HasPowerWindows { get; set; }                    // ელექტრო შუშები
    public bool? HasClimateControl { get; set; }                  // კლიმატკონტროლი
    public bool? HasCruiseControl { get; set; }                   // კრუიზ-კონტროლი
    public bool? HasStartStopSystem { get; set; }                 // Start/Stop სისტემა
    public bool? HasSunroof { get; set; }                          // ლუქი
    public bool? HasHeatedSeats { get; set; }                     // სავარძლის გათბობა
    public bool? HasSeatMemory { get; set; }                      // სავარძლის მეხსიერება
    public bool? HasABS { get; set; }                              // ABS
    public bool? HasTractionControl { get; set; }                 // მოცურების საწინააღმდეგო სისტემა
    public bool? HasCentralLocking { get; set; }                  // ცენტრალური საკეტი
    public bool? HasAlarm { get; set; }                            // სიგნალიზაცია
    public bool? HasFogLights { get; set; }                        // სანისლე ფარები
    public bool? HasNavigationSystem { get; set; }                // მონიტორი (ნავიგაცია)
    public bool? HasAUX { get; set; }                              // AUX
    public bool? HasBluetooth { get; set; }                       // Bluetooth
    public bool? HasMultifunctionSteeringWheel { get; set; }      // მულტი საჭე
    public bool? HasAlloyWheels { get; set; }                     // დისკები
    public bool? HasSpareTire { get; set; }                       // სათადარიგო საბურავი
    public bool? IsAdaptedForPeopleWithDisabilities { get; set; } // შშმ პირებზე ადაპტირებული
    
    public string? Description { get; set; }
    
    // მდებარეობა და განბაჟება
}