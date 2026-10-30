import useManufacturers from 'src/modules/lists/manufacturers/hooks/useManufacturers.ts'
import useModels from 'src/modules/lists/models/hooks/useModels.ts'
import useGasolineTypes from 'src/modules/lists/gasolineTypes/hooks/useGasolineTypes.ts'
import useCarCategories from 'src/modules/lists/carCategories/hooks/useCarCategories.ts'
import { useCreateOrEditApplicationReducer } from 'src/modules/applications/store/createOrEditApplication.ts'
import { getStepProgress, stepOptions } from 'src/modules/applications/helpers'
import { type ApplicationCategory, ApplicationSpec, type ApplicationValueChange, type ApplicationStep, type CreateOrEditApplication, type StepProgress } from 'src/modules/applications/types'

const useCreateOrEditApplication = (): CreateOrEditApplication => {
  const [state, dispatch] = useCreateOrEditApplicationReducer()
  const { category, activeStep, expandedSteps, preview, values } = state
  const manufacturers = useManufacturers()
  const models = useModels(values.manufacturerId)
  const gasolineTypes = useGasolineTypes()
  const carCategories = useCarCategories()
  const manufacturerLabel = [...manufacturers.topOptions, ...manufacturers.options].find((option) => option.value === values.manufacturerId)?.label ?? null
  const modelLabel = [...models.topOptions, ...models.options].find((option) => option.value === values.modelId)?.label ?? null
  const title = [manufacturerLabel, modelLabel].filter(Boolean).join(' ') || null
  const gasolineTypeLabel = gasolineTypes.options.find((option) => option.value === values.gasolineTypeId)?.label
  const carCategoryLabel = carCategories.options.find((option) => option.value === values.carCategoryId)?.label
  const specs = {
    ...preview.specs,
    ...(values.year !== null && { [ApplicationSpec.Year]: String(values.year) }),
    ...(gasolineTypeLabel && { [ApplicationSpec.GasolineType]: gasolineTypeLabel }),
    ...(carCategoryLabel && { [ApplicationSpec.CarCategory]: carCategoryLabel })
  }
  const stepProgress = Object.fromEntries(
    stepOptions.map(({ value }) => [value, getStepProgress(value, values)])
  ) as Record<ApplicationStep, StepProgress>

  const changeCategory = (value: ApplicationCategory) => {
    if (value === category) return
    dispatch({ type: 'SET_CATEGORY', payload: value })
  }

  const selectStep = (step: ApplicationStep) => {
    dispatch({ type: 'SET_ACTIVE_STEP', payload: step })
    document.getElementById(`application-step-${step}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleStep = (step: ApplicationStep) => {
    dispatch({ type: 'TOGGLE_STEP', payload: step })
  }

  const handleValueChange: ApplicationValueChange = (field, value) => {
    if (values[field] === value) return
    dispatch({
      type: 'SET_VALUES',
      payload: { ...values, [field]: value, ...(field === 'manufacturerId' && { modelId: null }) }
    })
  }

  return {
    category,
    activeStep,
    expandedSteps,
    preview: { ...preview, title: title ?? preview.title, specs },
    values,
    stepProgress,
    manufacturers,
    models,
    gasolineTypes,
    carCategories,
    changeCategory,
    selectStep,
    toggleStep,
    handleValueChange
  }
}

export default useCreateOrEditApplication
