import type { AnimationEvent, ChangeEvent, SubmitEvent } from 'react'
import { toast } from 'sonner'
import { type RegisterFormValues, useRegisterReducer } from 'src/modules/auth/register/store/register.ts'
import { validateRegisterForm } from 'src/modules/auth/register/validation'
import { FIELD_ORDER } from 'src/modules/auth/register/helpers'

const useRegister = () => {
  const [state, dispatch] = useRegisterReducer()
  const { values, errors, isSubmitted, formShaking } = state

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    dispatch({ type: 'SET_VALUES', payload: nextValues })
    if (isSubmitted) dispatch({ type: 'SET_ERRORS', payload: validateRegisterForm(nextValues) })
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: 'SET_SUBMITTED', payload: true })

    const nextErrors = validateRegisterForm(values)
    dispatch({ type: 'SET_ERRORS', payload: nextErrors })

    const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalidField) {
      dispatch({ type: 'SET_FORM_SHAKING', payload: true })
      const field = event.currentTarget.elements.namedItem(firstInvalidField)
      if (field instanceof HTMLInputElement) field.focus()
      return
    }

    // TODO: call the register endpoint once it's available in src/api/auth
    toast.success('ანგარიში შეიქმნა', { description: `კეთილი იყოს თქვენი მობრძანება, ${values.firstName.trim()}!` })
  }

  const handleFormAnimationEnd = (event: AnimationEvent<HTMLFormElement>) => {
    if (event.animationName === 'shake') dispatch({ type: 'SET_FORM_SHAKING', payload: false })
  }

  const shouldShake = (field: keyof RegisterFormValues) => formShaking && Boolean(errors[field])

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  }
}

export default useRegister
