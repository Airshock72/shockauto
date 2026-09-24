import type { CSSProperties } from 'react'
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import useTheme from 'src/core/hooks/useTheme.ts'

const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme}
      className='toaster group'
      position='top-right'
      closeButton
      visibleToasts={4}
      icons={{
        success: <CircleCheckIcon strokeWidth={2.25} />,
        info: <InfoIcon strokeWidth={2.25} />,
        warning: <TriangleAlertIcon strokeWidth={2.25} />,
        error: <OctagonXIcon strokeWidth={2.25} />,
        loading: <Loader2Icon strokeWidth={2.25} className='animate-spin' />
      }}
      style={{ '--width': '380px' } as CSSProperties}
      {...props}
    />
  )
}

export { Toaster }
