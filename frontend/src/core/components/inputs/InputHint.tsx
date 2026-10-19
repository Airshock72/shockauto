import { useId, useState } from 'react'
import { CircleHelp } from 'lucide-react'
import { cn } from 'src/core/lib/utils'

interface InputHintProps {
  readonly text: string
}

const InputHint = ({ text }: InputHintProps) => {
  const tooltipId = useId()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span className='group/hint pointer-events-auto relative flex animate-fade-in'>
      <button
        type='button'
        aria-label={text}
        aria-describedby={tooltipId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onBlur={() => setIsOpen(false)}
        className={cn(
          'flex size-8 cursor-help items-center justify-center rounded-md text-muted-foreground outline-none',
          'transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4.5',
          isOpen && 'text-primary'
        )}
      >
        <CircleHelp />
      </button>
      <span
        id={tooltipId}
        role='tooltip'
        className={cn(
          'pointer-events-none absolute right-0 bottom-full z-30 mb-2 w-max max-w-60 origin-bottom-right rounded-lg border bg-popover/95 px-3 py-2',
          'text-xs leading-relaxed text-popover-foreground shadow-elevated backdrop-blur-xl',
          'invisible scale-95 opacity-0 transition-[opacity,scale,visibility] duration-200 ease-fluid',
          'group-hover/hint:visible group-hover/hint:scale-100 group-hover/hint:opacity-100',
          isOpen && 'visible scale-100 opacity-100'
        )}
      >
        {text}
      </span>
    </span>
  )
}

export default InputHint
