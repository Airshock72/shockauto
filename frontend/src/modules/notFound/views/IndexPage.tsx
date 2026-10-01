import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from 'src/core/components/buttons/Button.tsx'
import Keypad404 from 'src/assets/media/svgs/keypad-404.svg?react'
import useKeypadInteractions from 'src/modules/notFound/hooks/useKeypadInteractions.ts'

const IndexPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pageRef, handlePointerDown, handlePointerMove, handlePointerUp } = useKeypadInteractions()

  return (
    <main ref={pageRef} className='flex min-h-dvh items-center overflow-hidden justify-center bg-aurora px-4 py-10'>
      <section className='flex w-full max-w-xl flex-col items-center text-center'>
        <div
          className='w-full max-w-sm'
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <Keypad404 className='w-full select-none' role='img' aria-label='404' />
        </div>

        <h1 className='nf-reveal mt-6 text-display-md font-bold'>{t('notFound.title')}</h1>
        <p className='nf-reveal mt-3 text-sm text-muted-foreground sm:text-base'>
          {t('notFound.description')}
        </p>

        <div className='nf-reveal mt-8'>
          <Button variant='primary' size='lg' shimmer className='rounded-full' onClick={() => navigate('/')}>
            {t('notFound.backHome')}
          </Button>
        </div>
      </section>
    </main>
  )
}

export default IndexPage
