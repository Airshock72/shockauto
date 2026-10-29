import { useTranslation } from 'react-i18next'
import Select from 'src/core/components/inputs/Select.tsx'
import TextInput from 'src/core/components/inputs/TextInput.tsx'
import DatePicker from 'src/core/components/inputs/DatePicker.tsx'
import { getTodayIso } from 'src/core/helpers/datePicker.ts'
import { minYearDate, toYear, trimMaxLength } from 'src/modules/applications/helpers'
import type { CharacteristicsFieldsProps } from 'src/modules/applications/types'

const CharacteristicsFields = ({
  values,
  manufacturers,
  models,
  gasolineTypes,
  onManufacturerChange,
  onModelChange,
  onYearChange,
  onTrimChange,
  onGasolineTypeChange
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
        onValueChange={onManufacturerChange}
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
        onValueChange={onModelChange}
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
        onValueChange={(value) => onYearChange(toYear(value))}
      />
      <TextInput
        name='trim'
        label={t('applications.fields.trim')}
        placeholder={t('applications.fields.trimPlaceholder')}
        maxLength={trimMaxLength}
        value={values.trim}
        onChange={(event) => onTrimChange(event.target.value)}
        onClear={() => onTrimChange('')}
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
        onValueChange={onGasolineTypeChange}
      />
    </div>
  )
}

export default CharacteristicsFields
