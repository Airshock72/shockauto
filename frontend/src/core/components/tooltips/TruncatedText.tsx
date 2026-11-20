import { createPortal } from 'react-dom'
import { cn } from 'src/core/lib/utils'
import useTruncatedTooltip from 'src/core/hooks/tooltips/useTruncatedTooltip.ts'
import type { TruncatedTextProps } from 'src/core/types/truncatedText.ts'

const TruncatedText = ({ text, className }: TruncatedTextProps) => {
  const { textRef, tooltipRef, isOpen, tooltipStyle, onPointerEnter, onPointerLeave, onPointerUp } = useTruncatedTooltip()

  return (
    <>
      <span
        ref={textRef}
        className={cn('block min-w-0 truncate', className)}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        {text}
      </span>

      {isOpen && createPortal(
        <span
          ref={tooltipRef}
          aria-hidden='true'
          style={tooltipStyle}
          className={cn(
            'pointer-events-none fixed z-50 w-max max-w-[min(18rem,calc(100vw-1.5rem))] animate-fade-in rounded-lg border',
            'bg-popover px-2.5 py-1.5 text-xs leading-relaxed font-medium break-words text-popover-foreground shadow-elevated'
          )}
        >
          {text}
        </span>,
        document.body
      )}
    </>
  )
}

export default TruncatedText
