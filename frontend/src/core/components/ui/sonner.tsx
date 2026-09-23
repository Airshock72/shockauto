import type { CSSProperties } from 'react'
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import useTheme from 'src/hooks/useTheme.ts'

const tint = (token: string, amount: number) => `color-mix(in oklch, var(${token}) ${amount}%, var(--popover))`

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme}
      className='toaster group'
      position='top-right'
      richColors
      closeButton
      visibleToasts={4}
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />
      }}
      toastOptions={{
        classNames: {
          toast: 'font-sans !rounded-xl !shadow-elevated backdrop-blur-md',
          title: 'font-medium',
          description: '!text-muted-foreground'
        }
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--success-bg': tint('--success', 12),
          '--success-text': 'var(--popover-foreground)',
          '--success-border': tint('--success', 35),
          '--error-bg': tint('--destructive', 12),
          '--error-text': 'var(--popover-foreground)',
          '--error-border': tint('--destructive', 35),
          '--warning-bg': tint('--warning', 12),
          '--warning-text': 'var(--popover-foreground)',
          '--warning-border': tint('--warning', 35),
          '--info-bg': tint('--info', 12),
          '--info-text': 'var(--popover-foreground)',
          '--info-border': tint('--info', 35)
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
