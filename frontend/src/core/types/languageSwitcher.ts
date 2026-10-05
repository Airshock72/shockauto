import type { Language } from 'src/i18n'
import type { ComponentProps, ComponentType } from 'react'

export interface LanguageSwitcherProps {
    readonly extended?: boolean
    readonly className?: string
}

export interface LanguageOption {
    readonly code: Language
    readonly label: string
    readonly name: string
    readonly Flag: ComponentType<ComponentProps<'svg'>>
}

export interface ThumbPosition {
    readonly x: number
    readonly width: number
}