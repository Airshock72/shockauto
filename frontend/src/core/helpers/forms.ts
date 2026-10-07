import type { Dispatch } from 'react'

export type FormErrorActions<K extends string> =
  | { type: 'SET_ERRORS', readonly payload: Partial<Record<K, string>> }
  | { type: 'SET_FORM_SHAKING', readonly payload: boolean }

export const applyFormErrors = <K extends string>(
  form: HTMLFormElement,
  errors: Partial<Record<K, string>>,
  fieldOrder: Array<K>,
  dispatch: Dispatch<FormErrorActions<K>>
): boolean => {
  dispatch({ type: 'SET_ERRORS', payload: errors })

  const firstInvalidField = fieldOrder.find((field) => errors[field])
  if (!firstInvalidField) return false

  dispatch({ type: 'SET_FORM_SHAKING', payload: true })
  const field = form.elements.namedItem(firstInvalidField)
  if (field instanceof HTMLInputElement) field.focus()
  return true
}
