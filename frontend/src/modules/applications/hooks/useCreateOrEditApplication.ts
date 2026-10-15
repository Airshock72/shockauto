import { useCreateOrEditApplicationReducer } from 'src/modules/applications/store/createOrEditApplication.ts'
import type { ApplicationCategory, ApplicationStep, CreateOrEditApplication } from 'src/modules/applications/types'

const useCreateOrEditApplication = (): CreateOrEditApplication => {
  const [state, dispatch] = useCreateOrEditApplicationReducer()
  const { category, activeStep, expandedSteps, preview } = state

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

  return {
    category,
    activeStep,
    expandedSteps,
    preview,
    changeCategory,
    selectStep,
    toggleStep
  }
}

export default useCreateOrEditApplication
