import { cn } from 'src/core/lib/utils'
import { toWords } from 'src/modules/dashboard/helpers'

interface WordsProps {
  readonly text: string
  readonly className?: string
}

const Words = ({ text, className }: WordsProps) => {
  return toWords(text).map((part, index) =>
    /^\s+$/.test(part) ? part : (
      <span key={index} data-hero-word className={cn('inline-block', className)}>{part}</span>
    )
  )
}

export default Words
