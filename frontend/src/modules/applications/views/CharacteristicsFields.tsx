import { useTranslation } from 'react-i18next'
import Select from 'src/core/components/inputs/Select.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import DatePicker from 'src/core/components/inputs/DatePicker.tsx'
import Switch from 'src/core/components/switchers/Switch.tsx'
import Divider from 'src/core/components/dividers/Divider.tsx'
import InputGroup from 'src/core/components/inputs/InputGroup.tsx'
import RadioGroup from 'src/core/components/inputs/RadioGroup.tsx'
import type { RadioOption, RadioValue } from 'src/core/types/radioGroup.ts'
import { normalizeDigits } from 'src/core/helpers/normalizers.ts'
import { getTodayIso } from 'src/core/helpers/datePicker.ts'
import {
  airbagOptions,
  cylinderOptions,
  defaultUpholstery,
  doorCountOptions,
  driveTypeOptions,
  engineVolumeOptions,
  exteriorColorOptions,
  interiorColorOptions,
  interiorMaterialOptions,
  mileageUnitOptions,
  minYearDate,
  steeringSideOptions,
  toMileage,
  toYear,
  transmissionOptions,
  trimMaxLength,
  vehicleColorSwatches,
  yesNoOptions
} from 'src/modules/applications/helpers'
import MaterialSwatch from 'src/modules/applications/views/MaterialSwatch.tsx'
import type { CharacteristicsFieldsProps } from 'src/modules/applications/types'

const CharacteristicsFields = ({
  values,
  manufacturers,
  models,
  gasolineTypes,
  carCategories,
  onValueChange
}: CharacteristicsFieldsProps) => {
  const { t } = useTranslation()
  const gasolineTypeOptions = gasolineTypes.options.map((option) => ({ ...option, group: option.group && t(option.group) }))
  const mileageUnitSelectOptions = mileageUnitOptions.map((option) => ({ ...option, label: t(option.label) }))
  const translate = <T extends RadioValue>(options: ReadonlyArray<RadioOption<T>>) => options.map((option) => ({ ...option, label: t(option.label) }))
  const upholsteryTint = values.interiorColor ? vehicleColorSwatches[values.interiorColor] : defaultUpholstery

  return (
    <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>
      <Select
        required
        name='manufacturerId'
        label={t('applications.fields.manufacturer')}
        placeholder={t('applications.fields.manufacturerPlaceholder')}
        value={values.manufacturerId}
        topOptions={manufacturers.topOptions}
        options={manufacturers.options}
        loading={manufacturers.isLoading}
        disabled={manufacturers.isLoading}
        onValueChange={(manufacturerId) => onValueChange('manufacturerId', manufacturerId)}
      />
      <Select
        required
        name='modelId'
        label={t('applications.fields.model')}
        placeholder={t('applications.fields.modelPlaceholder')}
        hint={values.modelId === null ? t('applications.fields.modelHint') : undefined}
        value={values.modelId}
        topOptions={models.topOptions}
        options={models.options}
        loading={models.isLoading}
        disabled={values.manufacturerId === null}
        onValueChange={(modelId) => onValueChange('modelId', modelId)}
      />
      <DatePicker
        required
        mode='year'
        name='year'
        label={t('applications.fields.year')}
        placeholder={t('applications.fields.yearPlaceholder')}
        min={minYearDate}
        max={getTodayIso()}
        value={values.year?.toString() ?? ''}
        onValueChange={(value) => onValueChange('year', toYear(value))}
      />
      <TextInput
        name='trim'
        label={t('applications.fields.trim')}
        placeholder={t('applications.fields.trimPlaceholder')}
        maxLength={trimMaxLength}
        value={values.trim}
        onChange={(event) => onValueChange('trim', event.target.value)}
        onClear={() => onValueChange('trim', '')}
      />
      <Select
        required
        name='gasolineTypeId'
        label={t('applications.fields.gasolineType')}
        placeholder={t('applications.fields.gasolineTypePlaceholder')}
        value={values.gasolineTypeId}
        options={gasolineTypeOptions}
        loading={gasolineTypes.isLoading}
        disabled={gasolineTypes.isLoading}
        onValueChange={(gasolineTypeId) => onValueChange('gasolineTypeId', gasolineTypeId)}
      />
      <Select
        required
        name='carCategoryId'
        label={t('applications.fields.carCategory')}
        placeholder={t('applications.fields.carCategoryPlaceholder')}
        value={values.carCategoryId}
        options={carCategories.options}
        loading={carCategories.isLoading}
        disabled={carCategories.isLoading}
        onValueChange={(carCategoryId) => onValueChange('carCategoryId', carCategoryId)}
      />
      <Select
        required
        name='cylinders'
        label={t('applications.fields.cylinders')}
        placeholder={t('applications.fields.cylindersPlaceholder')}
        value={values.cylinders}
        options={cylinderOptions}
        onValueChange={(cylinders) => onValueChange('cylinders', cylinders)}
      />
      <div className='flex items-end gap-3'>
        <Select
          required
          name='engineVolume'
          label={t('applications.fields.engineVolume')}
          placeholder={t('applications.fields.engineVolumePlaceholder')}
          value={values.engineVolume}
          options={engineVolumeOptions}
          containerClassName='min-w-0 flex-1'
          onValueChange={(engineVolume) => onValueChange('engineVolume', engineVolume)}
        />
        <Switch
          name='isTurbo'
          label={t('applications.fields.turbo')}
          checked={values.isTurbo}
          className='shrink-0'
          onCheckedChange={(isTurbo) => onValueChange('isTurbo', isTurbo)}
        />
      </div>
      <Divider className='my-1 sm:col-span-2' />
      <InputGroup required htmlFor='mileage' label={t('applications.fields.mileage')}>
        <TextInput
          required
          id='mileage'
          name='mileage'
          inputMode='numeric'
          containerClassName='flex-1'
          placeholder={t('applications.fields.mileagePlaceholder')}
          normalizer={normalizeDigits}
          value={values.mileage?.toString() ?? ''}
          onChange={(event) => onValueChange('mileage', toMileage(event.target.value))}
          onClear={() => onValueChange('mileage', null)}
        />
        <Select
          required
          name='mileageUnit'
          containerClassName='w-40 shrink-0'
          placeholder={t('applications.fields.mileageUnit')}
          value={values.mileageUnit}
          options={mileageUnitSelectOptions}
          onValueChange={(mileageUnit) => onValueChange('mileageUnit', mileageUnit)}
        />
      </InputGroup>
      <Divider className='my-1 sm:col-span-2' />
      <RadioGroup
        required
        name='steeringSide'
        label={t('applications.fields.steeringSide')}
        value={values.steeringSide}
        options={translate(steeringSideOptions)}
        onValueChange={(steeringSide) => onValueChange('steeringSide', steeringSide)}
      />
      <RadioGroup
        required
        name='transmission'
        label={t('applications.fields.transmission')}
        value={values.transmission}
        options={translate(transmissionOptions)}
        onValueChange={(transmission) => onValueChange('transmission', transmission)}
      />
      <RadioGroup
        required
        name='driveType'
        label={t('applications.fields.driveType')}
        value={values.driveType}
        options={translate(driveTypeOptions)}
        onValueChange={(driveType) => onValueChange('driveType', driveType)}
      />
      <RadioGroup
        required
        name='doorCount'
        label={t('applications.fields.doorCount')}
        value={values.doorCount}
        options={translate(doorCountOptions)}
        onValueChange={(doorCount) => onValueChange('doorCount', doorCount)}
      />
      <RadioGroup
        name='hasThirdRowSeats'
        label={t('applications.fields.thirdRowSeats')}
        value={values.hasThirdRowSeats}
        options={translate(yesNoOptions)}
        onValueChange={(hasThirdRowSeats) => onValueChange('hasThirdRowSeats', hasThirdRowSeats)}
      />
      <RadioGroup
        name='hasCatalyst'
        label={t('applications.fields.catalyst')}
        value={values.hasCatalyst}
        options={translate(yesNoOptions)}
        onValueChange={(hasCatalyst) => onValueChange('hasCatalyst', hasCatalyst)}
      />
      <RadioGroup
        required
        name='airbags'
        label={t('applications.fields.airbags')}
        value={values.airbags}
        options={airbagOptions}
        className='sm:col-span-2'
        hideIndicator
        optionClassName='px-0 tabular-nums'
        onValueChange={(airbags) => onValueChange('airbags', airbags)}
      />
      <RadioGroup
        required
        name='exteriorColor'
        label={t('applications.fields.exteriorColor')}
        value={values.exteriorColor}
        options={translate(exteriorColorOptions)}
        className='sm:col-span-2'
        onValueChange={(exteriorColor) => onValueChange('exteriorColor', exteriorColor)}
      />
      <RadioGroup
        required
        name='interiorMaterial'
        label={t('applications.fields.interiorMaterial')}
        value={values.interiorMaterial}
        options={translate(interiorMaterialOptions)}
        className='sm:col-span-2'
        optionClassName='pl-2'
        renderIndicator={(option, checked) => <MaterialSwatch material={option.value} tint={upholsteryTint} checked={checked} />}
        onValueChange={(interiorMaterial) => onValueChange('interiorMaterial', interiorMaterial)}
      />
      <RadioGroup
        required
        name='interiorColor'
        label={t('applications.fields.interiorColor')}
        value={values.interiorColor}
        options={translate(interiorColorOptions)}
        className='sm:col-span-2'
        onValueChange={(interiorColor) => onValueChange('interiorColor', interiorColor)}
      />
    </div>
  )
}

export default CharacteristicsFields
