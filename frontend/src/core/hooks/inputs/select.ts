import { type ChangeEvent, type KeyboardEvent, useEffect, useId, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import type { SelectOption } from 'src/core/types/select.ts'
import { useSelectReducer } from 'src/core/store/inputs/select.ts'
import { filterOptions, getNextIndex } from 'src/core/helpers/select.ts'
import { openKeys } from 'src/core/helpers/datePicker.ts'
import { prefersReducedMotion } from 'src/core/helpers/languageSwitcher.ts'

gsap.registerPlugin(useGSAP)

interface UseSelectParams<T> {
  readonly id?: string
  readonly value: T | null
  readonly options: Array<SelectOption<T>>
  readonly onChange: (value: T | null) => void
}

const useSelect = <T>({ id, value, options, onChange }: UseSelectParams<T>) => {
  const generatedId = useId()
  const [state, dispatch] = useSelectReducer()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const { isOpen, query, highlightedIndex } = state

  const inputId = id ?? generatedId
  const listboxId = `${inputId}-listbox`
  const messageId = `${inputId}-message`
  const selectedOption = options.find((option) => option.value === value) ?? null
  const filteredOptions = isOpen ? filterOptions(options, query) : options
  const getOptionId = (index: number) => `${listboxId}-${index}`

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) dispatch({ type: 'CLOSE' })
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen, dispatch])

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[data-highlighted]')?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex, isOpen])

  useGSAP(
    () => {
      const icon = listRef.current?.querySelector<HTMLElement>('[data-highlighted] [data-option-icon]')
      if (!icon || prefersReducedMotion()) return

      gsap.fromTo(
        icon,
        { rotationY: 0, transformPerspective: 400 },
        { rotationY: 720, duration: 0.9, ease: 'power2.out', overwrite: 'auto' }
      ).then()
    },
    { dependencies: [highlightedIndex, isOpen], scope: listRef }
  )

  const open = () => dispatch({ type: 'OPEN', payload: Math.max(options.findIndex((option) => option.value === value), 0) })

  const close = () => dispatch({ type: 'CLOSE' })

  const toggle = () => {
    if (isOpen) close()
    else open()
    inputRef.current?.focus()
  }

  const selectOption = (option: SelectOption<T>) => {
    onChange(option.value)
    close()
    inputRef.current?.focus()
  }

  const clear = () => {
    onChange(null)
    close()
    inputRef.current?.focus()
  }

  const highlight = (index: number) => {
    if (index !== highlightedIndex) dispatch({ type: 'SET_HIGHLIGHTED_INDEX', payload: index })
  }

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'SET_QUERY', payload: event.target.value })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (!openKeys.includes(event.key)) return
      event.preventDefault()
      open()
      return
    }

    switch (event.key) {
    case 'ArrowDown':
    case 'ArrowUp':
      event.preventDefault()
      highlight(getNextIndex(highlightedIndex, event.key === 'ArrowDown' ? 1 : -1, filteredOptions.length))
      break
    case 'Enter': {
      event.preventDefault()
      const option = filteredOptions[highlightedIndex]
      if (option) selectOption(option)
      break
    }
    case 'Escape':
      event.preventDefault()
      close()
      break
    case 'Tab':
      close()
      break
    }
  }

  return {
    containerRef,
    inputRef,
    listRef,
    inputId,
    listboxId,
    messageId,
    isOpen,
    highlightedIndex,
    selectedOption,
    filteredOptions,
    inputValue: isOpen ? query : selectedOption?.label ?? '',
    getOptionId,
    toggle,
    selectOption,
    clear,
    highlight,
    handleQueryChange,
    handleKeyDown
  }
}

export default useSelect
