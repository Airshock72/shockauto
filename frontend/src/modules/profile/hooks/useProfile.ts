import type { AnimationEvent, ChangeEvent, SubmitEvent } from 'react'
import { type ProfileFormValues, useProfileReducer } from 'src/modules/profile/store/profile.ts'
import { validateProfileForm } from 'src/modules/profile/validation'
import { fieldOrder } from 'src/modules/profile/helpers'
import { applyFormErrors } from 'src/core/helpers/forms.ts'
import type { UserProfile } from 'src/modules/profile/types'

const useProfile = (): UserProfile => {
  const [state, dispatch] = useProfileReducer()
  const { values, errors, isSubmitted, formShaking } = state

  const setValue = (name: string, value: string) => {
    const nextValues = { ...values, [name]: value }

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
    handleChange,
    handleBirthDateChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  }
}

export default useProfile
