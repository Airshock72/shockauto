import { type ChangeEvent, type ChangeEventHandler, type HTMLInputTypeAttribute, useId } from 'react'
import type { Normalizer } from 'src/core/helpers/normalizers.ts'
import { useTextInputReducer } from 'src/core/store/inputs/textInput.ts'

interface UseTextInputParams {
  readonly id?: string
  readonly type: HTMLInputTypeAttribute
  readonly error?: string
  readonly hint?: string
  readonly normalizer?: Normalizer
  readonly onChange?: ChangeEventHandler<HTMLInputElement>
}

const useTextInput = ({ id, type, error, hint, normalizer, onChange }: UseTextInputParams) => {
  const generatedId = useId()
  const [state, dispatch] = useTextInputReducer()

  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const isPassword = type === 'password'
  const message = error ?? hint

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (normalizer) {
      const normalized = normalizer(event.target.value)
      if (normalized !== event.target.value) event.target.value = normalized
    }

    onChange?.(event)
  }

  const togglePasswordVisibility = () => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })

  return {
    isPasswordVisible: state.isPasswordVisible,
    inputId,
    messageId,
    isPassword,
    message,
    handleChange,
    togglePasswordVisibility
  }
}

export default useTextInput
