import { useTranslation } from 'react-i18next'
import useCurrentUser from 'src/core/hooks/useCurrentUser.ts'
import useWelcomeHero from 'src/modules/dashboard/hooks/useWelcomeHero.ts'
import Words from 'src/modules/dashboard/views/Words.tsx'
import { nameToken, splitGreeting } from 'src/modules/dashboard/helpers'

const IndexPage = () => {
  const { t } = useTranslation()
  const user = useCurrentUser()
  const greeting = t('dashboard.welcome', { name: nameToken })
  const { before, after } = splitGreeting(greeting)
  const { sectionRef, glowRef } = useWelcomeHero(greeting)

  return (
    <main className='container flex-1 py-8 md:py-12'>
      <section
        ref={sectionRef}
        className='neon-edge relative isolate overflow-hidden rounded-2xl border bg-card/60 p-6 shadow-soft backdrop-blur-xl sm:p-8 lg:p-10'
      >
        <span
          ref={glowRef}
          aria-hidden='true'
          className='pointer-events-none absolute top-0 left-0 -z-10 size-80 rounded-full bg-neon/15 opacity-0 blur-3xl'
        />

        <p data-hero-fade className='inline-flex items-center gap-2 text-xs font-medium text-muted-foreground'>
          <span aria-hidden='true' className='size-2 rounded-full bg-success shadow-[0_0_8px_var(--success)]' />
          {t('dashboard.online')}
        </p>

        <h1 aria-label={t('dashboard.welcome', { name: user.name })} className='mt-4 text-display-md font-bold'>
          <span aria-hidden='true'>
            <Words text={before} />
            <Words text={user.name} className='text-gradient' />
            <Words text={after} />
          </span>
        </h1>
        <p data-hero-fade className='mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base'>
          {t('dashboard.subtitle')}
        </p>

        <div data-hero-line aria-hidden='true' className='mt-8 h-px bg-linear-to-r from-neon/60 via-primary/30 to-transparent' />
      </section>
    </main>
  )
}

export default IndexPage
