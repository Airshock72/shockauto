import { useNavigate } from 'react-router-dom'
import Button from 'src/core/components/buttons/Button.tsx'
import Keypad404 from 'src/assets/media/svgs/keypad-404.svg?react'
import useKeypadInteractions from 'src/modules/notFound/hooks/useKeypadInteractions.ts'

const IndexPage = () => {
  const navigate = useNavigate()
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

        <h1 className='nf-reveal mt-6 text-display-md font-bold'>გვერდი ვერ მოიძებნა</h1>
        <p className='nf-reveal mt-3 text-sm text-muted-foreground sm:text-base'>
          გვერდი რომელსაც თქვენ ეძებთ ვერ მოიძებნა ან წაშლილია
        </p>

        <div className='nf-reveal mt-8'>
          <Button variant='primary' size='lg' shimmer className='rounded-full' onClick={() => navigate('/')}>
            მთავარი გვერდი
          </Button>
        </div>
      </section>
    </main>
  )
}

export default IndexPage
