import { Settings, UserRound } from 'lucide-react'
import { cva } from 'class-variance-authority'
import gsap from 'gsap'
import type { UserMenuLink } from 'src/modules/header/types'

export const userMenuLinks: Array<UserMenuLink> = [
  { to: '/profile', label: 'header.profile', icon: UserRound },
  { to: '/settings', label: 'header.settings', icon: Settings }
]

export const animateHeaderIntro = () => {
  return gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-header-brand]', { x: -16, opacity: 0, duration: 0.6 })
    .from('[data-header-action]', { y: -8, opacity: 0, duration: 0.45, stagger: 0.08 }, 0.15)
    .fromTo('[data-header-line]', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0.1)
}

export const animateMenuReveal = (panel: HTMLElement, transformOrigin: string) => {
  return gsap.timeline()
    .from(panel, { opacity: 0, y: -8, scale: 0.97, transformOrigin, duration: 0.3, ease: 'power3.out' })
    .from(panel.querySelectorAll('[data-menu-item]'), {
      opacity: 0,
      x: 10,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.out'
    }, 0.08)
}

export const avatarVariants = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-neon select-none',
    'font-display font-semibold text-primary-foreground ring-2 ring-background shadow-[0_0_14px_-3px_var(--neon)]'
  ],
  {
    variants: {
      size: {
        sm: 'size-8 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-12 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

export const headerFloatOffset = 24

export const headerFloatMaxWidth = 1200

export const headerFloatMinGap = 12

const getHeaderFloatGap = () => Math.max(headerFloatMinGap, (window.innerWidth - headerFloatMaxWidth) / 2)

export const createHeaderFloat = (shell: HTMLElement) => {
  return gsap.timeline({ paused: true, defaults: { duration: 0.55, ease: 'power3.out' } })
    .to(shell, {
      marginTop: 10,
      marginLeft: getHeaderFloatGap,
      marginRight: getHeaderFloatGap,
      borderRadius: 18
    })
    .fromTo(shell, { y: -6 }, { y: 0, duration: 0.4, ease: 'back.out(2)' }, 0.1)
}
