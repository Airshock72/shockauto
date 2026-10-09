import { type AnimationEvent, type ChangeEvent, type SubmitEvent, useId } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { AccountApi } from 'src/api'
import { ResponseStatuses } from 'src/api/types/apiGlobalTypes.ts'
import { type ChangePasswordFormValues, useChangePasswordReducer } from 'src/modules/profile/store/changePassword.ts'
import { validateChangePasswordForm } from 'src/modules/profile/validation'
import { changePasswordFieldOrder } from 'src/modules/profile/helpers'
import { applyFormErrors } from 'src/core/helpers/forms.ts'
import type { ChangePassword } from 'src/modules/profile/types'

const useChangePassword = (onClose: () => void): ChangePassword => {
  const { t } = useTranslation()
  const formId = useId()
  const [state, dispatch] = useChangePasswordReducer()
  const {
    values,
    errors,
    isSubmitted,
    formShaking,
    isSubmitting
  } = state

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    dispatch({ type: 'SET_VALUES', payload: nextValues })
    if (isSubmitted) dispatch({ type: 'SET_ERRORS', payload: validateChangePasswordForm(nextValues) })
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    dispatch({ type: 'SET_SUBMITTED', payload: true })

    if (applyFormErrors(event.currentTarget, validateChangePasswordForm(values), changePasswordFieldOrder, dispatch)) return

    dispatch({ type: 'SET_SUBMITTING', payload: true })
    const response = await AccountApi.changePassword({ newPassword: values.newPassword })
    dispatch({ type: 'SET_SUBMITTING', payload: false })
    if (response.status !== ResponseStatuses.SUCCESS) return

    toast.success(t('profile.changePassword.success'))
    onClose()
  }

  const handleFormAnimationEnd = (event: AnimationEvent<HTMLFormElement>) => {
    if (event.animationName === 'shake') dispatch({ type: 'SET_FORM_SHAKING', payload: false })
  }

  const shouldShake = (field: keyof ChangePasswordFormValues) => formShaking && Boolean(errors[field])

  const reset = () => dispatch({ type: 'RESET' })

  return {
    formId,
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleFormAnimationEnd,
    shouldShake,
    reset
  }
}

export default useChangePassword
