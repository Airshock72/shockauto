import type { AnimationEvent, ChangeEvent, SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type RegisterFormValues, useRegisterReducer } from 'src/modules/auth/register/store/register.ts'
import { validateRegisterForm } from 'src/modules/auth/register/validation'
import { FIELD_ORDER, transformRegisterUserParams } from 'src/modules/auth/register/helpers'

const useRegister = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useRegisterReducer()
  const { values, errors, isSubmitted, formShaking, isLoading } = state

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    dispatch({ type: 'SET_VALUES', payload: nextValues })
    if (isSubmitted) dispatch({ type: 'SET_ERRORS', payload: validateRegisterForm(nextValues) })
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) return

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

    dispatch({ type: 'SET_LOADING', payload: true })
    const response = await AuthApi.register(transformRegisterUserParams(values))

    if (response.status === ResponseStatuses.SUCCESS) {
      toast.success('ანგარიში შეიქმნა', { description: `კეთილი იყოს თქვენი მობრძანება, ${values.firstName.trim()}!` })
      navigate('/login')
      return
    }

    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const handleFormAnimationEnd = (event: AnimationEvent<HTMLFormElement>) => {
    if (event.animationName === 'shake') dispatch({ type: 'SET_FORM_SHAKING', payload: false })
  }

  const shouldShake = (field: keyof RegisterFormValues) => formShaking && Boolean(errors[field])

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake
  }
}

export default useRegister
