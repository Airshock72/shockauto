const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

export const modalPanelOutAnimation = 'modal-panel-out'

export const getFocusableElements = (container: HTMLElement): Array<HTMLElement> => {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector))
}

export const getInitialFocusTarget = (container: HTMLElement): HTMLElement => {
  return container.querySelector<HTMLElement>('[data-autofocus]')
    ?? container.querySelector<HTMLElement>('input:not([disabled])')
    ?? container
}

export const trapFocus = (event: KeyboardEvent, container: HTMLElement) => {
  const focusable = getFocusableElements(container)
  if (!focusable.length) {
    event.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (event.shiftKey && (active === first || active === container)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}
