import { useTranslation } from 'react-i18next'
import Select from 'src/core/components/inputs/Select.tsx'
import type { CharacteristicsFieldsProps } from 'src/modules/applications/types'

const CharacteristicsFields = ({ values, manufacturers, models, onManufacturerChange, onModelChange }: CharacteristicsFieldsProps) => {
  const { t } = useTranslation()

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
    </div>
  )
}

export default CharacteristicsFields
