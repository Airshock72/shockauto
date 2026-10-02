import type { AnimationEvent, ChangeEvent, SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type LoginFormValues, useLoginReducer } from 'src/modules/auth/login/store/login.ts'
import { validateLoginForm } from 'src/modules/auth/login/validation'
import { FIELD_ORDER, transformLoginParams } from 'src/modules/auth/login/helpers'
import { applyFormErrors } from 'src/core/helpers/forms.ts'

const useLogin = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useLoginReducer()
  const { values, errors, isSubmitted, formShaking, isLoading } = state

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    dispatch({ type: 'SET_VALUES', payload: nextValues })
    if (isSubmitted) dispatch({ type: 'SET_ERRORS', payload: validateLoginForm(nextValues) })
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isLoading) return

    dispatch({ type: 'SET_SUBMITTED', payload: true })

    if (applyFormErrors(event.currentTarget, validateLoginForm(values), FIELD_ORDER, dispatch)) return

    dispatch({ type: 'SET_LOADING', payload: true })
    const response = await AuthApi.login(transformLoginParams(values))

    if (response.status === ResponseStatuses.SUCCESS && response.data) {
      localStorage.setItem('token', JSON.stringify(response.data))
      navigate('/', { replace: true })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const handleFormAnimationEnd = (event: AnimationEvent<HTMLFormElement>) => {
    if (event.animationName === 'shake') dispatch({ type: 'SET_FORM_SHAKING', payload: false })
  }

  const shouldShake = (field: keyof LoginFormValues) => formShaking && Boolean(errors[field])

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

export default useLogin
