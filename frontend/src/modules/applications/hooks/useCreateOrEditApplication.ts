import type { ID } from 'src/api/types/apiGlobalTypes.ts'
import useManufacturers from 'src/modules/lists/manufacturers/hooks/useManufacturers.ts'
import { useCreateOrEditApplicationReducer } from 'src/modules/applications/store/createOrEditApplication.ts'
import { getStepProgress, stepOptions } from 'src/modules/applications/helpers'
import type { ApplicationCategory, ApplicationStep, CreateOrEditApplication, StepProgress } from 'src/modules/applications/types'

const useCreateOrEditApplication = (): CreateOrEditApplication => {
  const [state, dispatch] = useCreateOrEditApplicationReducer()
  const { category, activeStep, expandedSteps, preview, values } = state
  const manufacturers = useManufacturers()
  const manufacturerLabel = manufacturers.options.find((option) => option.value === values.manufacturerId)?.label ?? null
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

  const handleManufacturerChange = (manufacturerId: ID | null) => {
    dispatch({ type: 'SET_VALUES', payload: { ...values, manufacturerId } })
  }

  return {
    category,
    activeStep,
    expandedSteps,
    preview: { ...preview, title: manufacturerLabel ?? preview.title },
    values,
    stepProgress,
    manufacturers,
    changeCategory,
    selectStep,
    toggleStep,
    handleManufacturerChange
  }
}

export default useCreateOrEditApplication
