import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, House } from 'lucide-react'
import Button from 'src/core/components/buttons/Button.tsx'
import { isWebGLAvailable } from 'src/core/helpers/three.ts'
import useNotFoundPage from 'src/modules/notFound/hooks/useNotFoundPage.ts'

const IndexPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pageRef, sceneRef } = useNotFoundPage()

  return (
    <main ref={pageRef} className='container flex flex-1 flex-col items-center justify-center py-10 text-center'>
      {isWebGLAvailable()
        ? (
          <div
            ref={sceneRef}
            aria-hidden='true'
            title={t('notFound.hint')}
            className='h-[clamp(13rem,38vh,22rem)] w-full max-w-3xl cursor-pointer touch-pan-y'
          />
        )
        : <p aria-hidden='true' className='font-display text-[clamp(6rem,22vw,11rem)] leading-none font-bold tracking-tightest text-gradient'>404</p>}

      <span data-reveal className='mt-4 rounded-full border bg-card/70 px-3 py-1 font-mono text-2xs tracking-futuristic text-muted-foreground uppercase backdrop-blur'>
        {t('notFound.eyebrow')}
      </span>
      <h1 data-reveal className='mt-4 text-display-md font-bold'>{t('notFound.title')}</h1>
      <p data-reveal className='mt-3 max-w-md text-sm text-muted-foreground sm:text-base'>{t('notFound.description')}</p>

      <div data-reveal className='mt-8 flex flex-col gap-3 xs:flex-row'>
        <Button variant='outline' size='lg' leftIcon={<ArrowLeft />} className='rounded-full' onClick={() => navigate(-1)}>
          {t('notFound.goBack')}
        </Button>
        <Button variant='primary' size='lg' shimmer leftIcon={<House />} className='rounded-full' onClick={() => navigate('/')}>
          {t('notFound.backHome')}
        </Button>
      </div>
    </main>
  )
}

export default IndexPage
