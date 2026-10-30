import { useTranslation } from 'react-i18next'
import Select from 'src/core/components/inputs/Select.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import DatePicker from 'src/core/components/inputs/DatePicker.tsx'
import Switch from 'src/core/components/switchers/Switch.tsx'
import { getTodayIso } from 'src/core/helpers/datePicker.ts'
import { cylinderOptions, engineVolumeOptions, minYearDate, toYear, trimMaxLength } from 'src/modules/applications/helpers'
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
    </div>
  )
}

export default CharacteristicsFields
