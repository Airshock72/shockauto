import {
  Accessibility,
  AirVent,
  Armchair,
  ArrowDownUp,
  Banknote,
  Bluetooth,
  Cable,
  CalendarDays,
  Camera,
  Car,
  CarFront,
  CircleParking,
  CloudFog,
  Cog,
  Cpu,
  Disc3,
  Donut,
  Droplet,
  Engine,
  Flame,
  Fuel,
  Gauge,
  Images,
  LifeBuoy,
  Lock,
  MapPin,
  Motorbike,
  Navigation,
  Palette,
  Phone,
  Power,
  ShieldCheck,
  Siren,
  SlidersHorizontal,
  Sun,
  ThermometerSnowflake,
  Tractor
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { SelectOption } from 'src/core/types/select.ts'
import type { RadioOption, RadioValue } from 'src/core/types/radioGroup.ts'
import type { CheckboxOption } from 'src/core/types/checkboxGroup.ts'
import { brandColors } from 'src/core/helpers/three.ts'
import SteeringWheelIcon from 'src/assets/media/svgs/steering-wheel.svg?react'
import type { ApplicationFormValues } from 'src/modules/applications/store/createOrEditApplication.ts'
import {
  ApplicationCategory,
  ApplicationSpec,
  ApplicationStep,
  type CategoryOption,
  DoorCount,
  DriveType,
  InteriorMaterial,
  MileageUnit,
  type SpecOption,
  SteeringSide,
  type StepOption,
  type StepProgress,
  TransmissionType,
  VehicleColor,
  VehicleFeature
} from 'src/modules/applications/types'

export const categoryOptions: Array<CategoryOption> = [
  { value: ApplicationCategory.Car, label: 'applications.categories.car', icon: Car },
  { value: ApplicationCategory.SpecialEquipment, label: 'applications.categories.specialEquipment', icon: Tractor },
  { value: ApplicationCategory.Motorcycle, label: 'applications.categories.motorcycle', icon: Motorbike }
]

export const categoryPlaceholderIcons: Record<ApplicationCategory, LucideIcon> = {
  [ApplicationCategory.Car]: Car,
  [ApplicationCategory.SpecialEquipment]: Tractor,
  [ApplicationCategory.Motorcycle]: Motorbike
}

export const stepOptions: Array<StepOption> = [
  {
    value: ApplicationStep.Characteristics,
    title: 'applications.steps.characteristics.title',
    description: 'applications.steps.characteristics.description',
    icon: SlidersHorizontal
  },
  {
    value: ApplicationStep.Location,
    title: 'applications.steps.location.title',
    description: 'applications.steps.location.description',
    icon: MapPin
  },
  {
    value: ApplicationStep.Media,
    title: 'applications.steps.media.title',
    description: 'applications.steps.media.description',
    icon: Images
  },
  {
    value: ApplicationStep.Price,
    title: 'applications.steps.price.title',
    description: 'applications.steps.price.description',
    icon: Banknote
  },
  {
    value: ApplicationStep.Contact,
    title: 'applications.steps.contact.title',
    description: 'applications.steps.contact.description',
    icon: Phone
  }
]

export const specOptions: Array<SpecOption> = [
  { value: ApplicationSpec.Year, label: 'applications.specs.year', icon: CalendarDays },
  { value: ApplicationSpec.GasolineType, label: 'applications.specs.gasolineType', icon: Fuel },
  { value: ApplicationSpec.CarCategory, label: 'applications.specs.carCategory', icon: CarFront },
  { value: ApplicationSpec.Engine, label: 'applications.specs.engine', icon: Engine },
  { value: ApplicationSpec.Mileage, label: 'applications.specs.mileage', icon: Gauge },
  { value: ApplicationSpec.Transmission, label: 'applications.specs.transmission', icon: Cog },
  { value: ApplicationSpec.SteeringWheel, label: 'applications.specs.steeringWheel', icon: SteeringWheelIcon },
  { value: ApplicationSpec.Color, label: 'applications.specs.color', icon: Palette }
]

export const getStepIndex = (step: ApplicationStep): number =>
  stepOptions.findIndex(({ value }) => value === step)

export const dustPuffCount = 5

export const minYearDate = '1900-01-01'

export const trimMaxLength = 32

export const maxCylinders = 12

export const cylinderOptions: Array<SelectOption<number>> = Array.from({ length: maxCylinders }, (_, index) => ({ label: String(index + 1), value: index + 1 }))

export const minEngineVolume = 0.05

export const maxEngineVolumeTenths = 130

export const engineVolumeOptions: Array<SelectOption<number>> = [
  { label: String(minEngineVolume), value: minEngineVolume },
  ...Array.from({ length: maxEngineVolumeTenths }, (_, index) => {
    const volume = (index + 1) / 10
    return { label: volume.toFixed(1), value: volume }
  })
]

export const toYear = (value: string): number | null => value ? Number(value) : null

export const maxMileage = 1_000_000

export const toMileage = (value: string): number | null => value ? Math.min(Number(value), maxMileage) : null

export const mileageUnitOptions: Array<SelectOption<MileageUnit>> = [
  { label: 'applications.mileageUnits.kilometer', value: MileageUnit.Kilometer },
  { label: 'applications.mileageUnits.mile', value: MileageUnit.Mile }
]

export const mileageUnitShortLabels: Record<MileageUnit, string> = {
  [MileageUnit.Kilometer]: 'applications.mileageUnitsShort.kilometer',
  [MileageUnit.Mile]: 'applications.mileageUnitsShort.mile'
}

export const steeringSideOptions: Array<RadioOption<SteeringSide>> = [
  { label: 'applications.steeringSides.left', value: SteeringSide.Left },
  { label: 'applications.steeringSides.right', value: SteeringSide.Right }
]

export const transmissionOptions: Array<RadioOption<TransmissionType>> = [
  { label: 'applications.transmissions.manual', value: TransmissionType.Manual },
  { label: 'applications.transmissions.automatic', value: TransmissionType.Automatic },
  { label: 'applications.transmissions.tiptronic', value: TransmissionType.Tiptronic },
  { label: 'applications.transmissions.variator', value: TransmissionType.Variator }
]

export const driveTypeOptions: Array<RadioOption<DriveType>> = [
  { label: 'applications.driveTypes.front', value: DriveType.Front },
  { label: 'applications.driveTypes.rear', value: DriveType.Rear },
  { label: 'applications.driveTypes.allWheel', value: DriveType.AllWheel }
]

export const doorCountOptions: Array<RadioOption<DoorCount>> = [
  { label: 'applications.doorCounts.twoThree', value: DoorCount.TwoThree },
  { label: 'applications.doorCounts.fourFive', value: DoorCount.FourFive },
  { label: 'applications.doorCounts.moreThanFive', value: DoorCount.MoreThanFive }
]

export const yesNoOptions: Array<RadioOption<boolean>> = [
  { label: 'applications.answers.yes', value: true },
  { label: 'applications.answers.no', value: false }
]

export const maxAirbags = 12

export const airbagOptions: Array<RadioOption<number>> = Array.from({ length: maxAirbags + 1 }, (_, index) => ({ label: String(index), value: index }))

export const interiorMaterialOptions: Array<RadioOption<InteriorMaterial>> = [
  { label: 'applications.interiorMaterials.fabric', value: InteriorMaterial.Fabric },
  { label: 'applications.interiorMaterials.leather', value: InteriorMaterial.Leather },
  { label: 'applications.interiorMaterials.artificialLeather', value: InteriorMaterial.ArtificialLeather },
  { label: 'applications.interiorMaterials.combined', value: InteriorMaterial.Combined },
  { label: 'applications.interiorMaterials.alcantara', value: InteriorMaterial.Alcantara }
]

export const vehicleColorSwatches: Record<VehicleColor, string> = {
  [VehicleColor.White]: '#f4f4f2',
  [VehicleColor.Black]: '#131317',
  [VehicleColor.Silver]: '#c3c7cf',
  [VehicleColor.Gray]: '#6b7080',
  [VehicleColor.Red]: '#d7262e',
  [VehicleColor.Blue]: '#1f4fd6',
  [VehicleColor.Yellow]: '#f6c915',
  [VehicleColor.Green]: '#1c9a4a',
  [VehicleColor.Orange]: '#f2731c',
  [VehicleColor.Gold]: '#cfa43a',
  [VehicleColor.Purple]: '#7a2fc4',
  [VehicleColor.Pink]: '#e9559b',
  [VehicleColor.Beige]: '#d9c6a0',
  [VehicleColor.Burgundy]: '#7a1f2b',
  [VehicleColor.SkyBlue]: '#4bb8ee',
  [VehicleColor.Brown]: '#6f4325'
}

export const vehicleColorLabels: Record<VehicleColor, string> = {
  [VehicleColor.White]: 'applications.colors.white',
  [VehicleColor.Black]: 'applications.colors.black',
  [VehicleColor.Silver]: 'applications.colors.silver',
  [VehicleColor.Gray]: 'applications.colors.gray',
  [VehicleColor.Red]: 'applications.colors.red',
  [VehicleColor.Blue]: 'applications.colors.blue',
  [VehicleColor.Yellow]: 'applications.colors.yellow',
  [VehicleColor.Green]: 'applications.colors.green',
  [VehicleColor.Orange]: 'applications.colors.orange',
  [VehicleColor.Gold]: 'applications.colors.gold',
  [VehicleColor.Purple]: 'applications.colors.purple',
  [VehicleColor.Pink]: 'applications.colors.pink',
  [VehicleColor.Beige]: 'applications.colors.beige',
  [VehicleColor.Burgundy]: 'applications.colors.burgundy',
  [VehicleColor.SkyBlue]: 'applications.colors.skyBlue',
  [VehicleColor.Brown]: 'applications.colors.brown'
}

const toColorOptions = (colors: Array<VehicleColor>): Array<RadioOption<VehicleColor>> =>
  colors.map((color) => ({ label: vehicleColorLabels[color], value: color, swatch: vehicleColorSwatches[color] }))

export const exteriorColorOptions = toColorOptions([
  VehicleColor.White,
  VehicleColor.Black,
  VehicleColor.Silver,
  VehicleColor.Gray,
  VehicleColor.Red,
  VehicleColor.Blue,
  VehicleColor.Yellow,
  VehicleColor.Green,
  VehicleColor.Orange,
  VehicleColor.Gold,
  VehicleColor.Purple,
  VehicleColor.Pink,
  VehicleColor.Beige,
  VehicleColor.Burgundy,
  VehicleColor.SkyBlue,
  VehicleColor.Brown
])

export const interiorColorOptions = toColorOptions([
  VehicleColor.Black,
  VehicleColor.White,
  VehicleColor.Gray,
  VehicleColor.Brown,
  VehicleColor.Beige,
  VehicleColor.Red,
  VehicleColor.Blue,
  VehicleColor.Yellow,
  VehicleColor.Orange,
  VehicleColor.Burgundy,
  VehicleColor.Gold
])

export const vehicleFeatureOptions: Array<CheckboxOption<VehicleFeature>> = [
  { label: 'applications.features.powerSteering', value: VehicleFeature.PowerSteering, icon: Droplet },
  { label: 'applications.features.onboardComputer', value: VehicleFeature.OnboardComputer, icon: Cpu },
  { label: 'applications.features.airConditioning', value: VehicleFeature.AirConditioning, icon: AirVent },
  { label: 'applications.features.parkingControl', value: VehicleFeature.ParkingControl, icon: CircleParking },
  { label: 'applications.features.rearViewCamera', value: VehicleFeature.RearViewCamera, icon: Camera },
  { label: 'applications.features.electricWindows', value: VehicleFeature.ElectricWindows, icon: ArrowDownUp },
  { label: 'applications.features.climateControl', value: VehicleFeature.ClimateControl, icon: ThermometerSnowflake },
  { label: 'applications.features.cruiseControl', value: VehicleFeature.CruiseControl, icon: Gauge },
  { label: 'applications.features.startStop', value: VehicleFeature.StartStop, icon: Power },
  { label: 'applications.features.sunroof', value: VehicleFeature.Sunroof, icon: Sun },
  { label: 'applications.features.heatedSeats', value: VehicleFeature.HeatedSeats, icon: Flame },
  { label: 'applications.features.seatMemory', value: VehicleFeature.SeatMemory, icon: Armchair },
  { label: 'applications.features.abs', value: VehicleFeature.Abs, icon: Disc3 },
  { label: 'applications.features.tractionControl', value: VehicleFeature.TractionControl, icon: ShieldCheck },
  { label: 'applications.features.centralLocking', value: VehicleFeature.CentralLocking, icon: Lock },
  { label: 'applications.features.alarm', value: VehicleFeature.Alarm, icon: Siren },
  { label: 'applications.features.fogLights', value: VehicleFeature.FogLights, icon: CloudFog },
  { label: 'applications.features.navigation', value: VehicleFeature.Navigation, icon: Navigation },
  { label: 'applications.features.aux', value: VehicleFeature.Aux, icon: Cable },
  { label: 'applications.features.bluetooth', value: VehicleFeature.Bluetooth, icon: Bluetooth },
  { label: 'applications.features.multifunctionSteeringWheel', value: VehicleFeature.MultifunctionSteeringWheel, icon: SteeringWheelIcon },
  { label: 'applications.features.rims', value: VehicleFeature.Rims, icon: LifeBuoy },
  { label: 'applications.features.spareTire', value: VehicleFeature.SpareTire, icon: Donut },
  { label: 'applications.features.disabilityAdapted', value: VehicleFeature.DisabilityAdapted, icon: Accessibility }
]

export const commentMaxLength = 4000

export const metallicColors: ReadonlyArray<VehicleColor> = [VehicleColor.Silver, VehicleColor.Gray, VehicleColor.Gold]

export const defaultPaint = brandColors.violet

export const defaultUpholstery = '#2b2b33'

export const findOptionLabel = <T extends RadioValue>(options: ReadonlyArray<RadioOption<T>>, value: T | null): string | undefined =>
  value === null ? undefined : options.find((option) => option.value === value)?.label

export const stepRequiredFields: Record<ApplicationStep, Array<keyof ApplicationFormValues>> = {
  [ApplicationStep.Characteristics]: [
    'manufacturerId',
    'modelId',
    'year',
    'gasolineTypeId',
    'carCategoryId',
    'cylinders',
    'engineVolume',
    'mileage',
    'mileageUnit',
    'steeringSide',
    'transmission',
    'driveType',
    'doorCount',
    'airbags',
    'exteriorColor',
    'interiorMaterial',
    'interiorColor'
  ],
  [ApplicationStep.Location]: [],
  [ApplicationStep.Media]: [],
  [ApplicationStep.Price]: [],
  [ApplicationStep.Contact]: []
}

export const getStepProgress = (step: ApplicationStep, values: ApplicationFormValues): StepProgress => {
  const fields = stepRequiredFields[step]
  return { filled: fields.filter((field) => values[field] !== null).length, total: fields.length }
}

export const isStepCompleted = ({ filled, total }: StepProgress): boolean => total > 0 && filled === total

export const dockMinGutter = 240

export const dockDuration = 1.1

export const dockEase = 'power3.inOut'

export const dockArcStrength = 0.35

export const dockStretch = 0.09

export const dockTilt = 4

export const dockJelly = 0.04

export const dockLiquidId = 'dock-liquid'

export const dockLiquidScale = 12

export const dockLiquidFrequency = 0.004

export const dockBlobRadii = [0.42, 0.58, 0.46, 0.54, 0.55, 0.45, 0.55, 0.45]

export const dockedCardClassName = 'fixed top-[calc(var(--spacing-header)+1.5rem)] z-30 max-h-[calc(100dvh-var(--spacing-header)-3rem)] w-[calc(var(--dock-gutter)-2rem)] overflow-y-auto rounded-2xl'
