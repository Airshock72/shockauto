import Card from 'src/core/components/cards/Card.tsx'
import { cn } from 'src/core/lib/utils'
import useAuthReveal from 'src/modules/auth/shared/hooks/useAuthReveal.ts'
import type { AuthShellProps } from 'src/modules/auth/shared/types'

const AuthShell = ({ pageRef, title, subtitle, showcase, footer, children, className }: AuthShellProps) => {
  const cardRef = useAuthReveal()

  return (
    <main ref={pageRef} className='car-backdrop min-h-dvh lg:grid lg:grid-cols-2'>
      <section className='flex items-center justify-center px-4 pt-20 pb-10 sm:px-6 md:min-h-dvh lg:px-10 short:pt-14 short:pb-4 tight:pb-3'>
        <Card ref={cardRef} className={cn('car-card relative w-full max-w-lg short:px-6 short:py-5 tight:py-4', className)}>
          <span aria-hidden='true' className='pointer-events-none absolute inset-x-0 -top-6 z-10 flex justify-center short:-top-5 tight:hidden'>
            <span
              data-brand
              className='grid size-12 place-items-center rounded-2xl border bg-card shadow-[0_10px_30px_-12px_var(--car)] short:size-10'
            >
              <img src='/logo.svg' alt='' width={28} height={28} className='size-7 select-none short:size-6' draggable={false} />
            </span>
          </span>

          <header className='mb-8 flex flex-col items-center text-center short:mb-4 tight:mb-3'>
            <h1 data-reveal className='text-display-sm font-bold short:text-2xl tight:text-xl'>{title}</h1>
            <p data-reveal className='mt-2 text-sm text-muted-foreground short:mt-1 tight:text-xs'>{subtitle}</p>
          </header>

          {children}

          <div data-reveal className='mt-8 text-center text-sm text-muted-foreground short:mt-4 tight:mt-2'>
            {footer}
          </div>
        </Card>
      </section>

      <aside className='hidden p-4 lg:block'>
        <div className='car-glow sticky top-4 h-[calc(100dvh-2rem)]'>
          {showcase}
        </div>
      </aside>
    </main>
  )
}

export default AuthShell
