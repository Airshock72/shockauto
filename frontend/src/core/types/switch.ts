export interface SwitchProps {
  readonly checked: boolean
  readonly label: string
  readonly name?: string
  readonly disabled?: boolean
  readonly className?: string
  readonly onCheckedChange: (checked: boolean) => void
}
