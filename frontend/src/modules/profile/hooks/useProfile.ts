import { type AnimationEvent, type ChangeEvent, type SubmitEvent, useEffect } from 'react'
import { AccountApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type ProfileFormValues, useProfileReducer } from 'src/modules/profile/store/profile.ts'
import { validateProfileForm } from 'src/modules/profile/validation'
import { fieldOrder, nullableFields, transformProfileToFormValues } from 'src/modules/profile/helpers'
import { applyFormErrors } from 'src/core/helpers/forms.ts'
import type { UserProfile } from 'src/modules/profile/types'

const useProfile = (): UserProfile => {
  const [state, dispatch] = useProfileReducer()
  const { values, errors, isSubmitted, formShaking, isLoading } = state

  useEffect(() => {
    let isActive = true

    const loadProfile = async () => {
      const response = await AccountApi.getProfile()
      if (!isActive) return

      if (response.status === ResponseStatuses.SUCCESS && response.data) {
        dispatch({ type: 'SET_VALUES', payload: transformProfileToFormValues(response.data) })
      }
      dispatch({ type: 'SET_LOADING', payload: false })
    }

    loadProfile().then()
    return () => {
      isActive = false
    }
  }, [dispatch])

  const setValue = (name: string, value: string) => {
    const isEmptyNullable = !value && nullableFields.includes(name as keyof ProfileFormValues)
    const nextValues = { ...values, [name]: isEmptyNullable ? null : value }

    dispatch({ type: 'SET_VALUES', payload: nextValues })
    if (isSubmitted) dispatch({ type: 'SET_ERRORS', payload: validateProfileForm(nextValues) })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.name, event.target.value)

  const handleBirthDateChange = (value: string) => setValue('birthDate', value)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch({ type: 'SET_SUBMITTED', payload: true })

    if (applyFormErrors(event.currentTarget, validateProfileForm(values), fieldOrder, dispatch)) return

    console.info(values)
  }

  const handleFormAnimationEnd = (event: AnimationEvent<HTMLFormElement>) => {
    if (event.animationName === 'shake') dispatch({ type: 'SET_FORM_SHAKING', payload: false })
  }

  const shouldShake = (field: keyof ProfileFormValues) => formShaking && Boolean(errors[field])

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleBirthDateChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  }
}

export default useProfile
