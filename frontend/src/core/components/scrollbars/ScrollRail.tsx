import { isWebGLAvailable } from 'src/core/helpers/three.ts'
import useMediaQuery from 'src/core/hooks/useMediaQuery.ts'
import useScrollRail from 'src/core/hooks/scrollbars/useScrollRail.ts'

const Rail = () => {
  const {
    railRef,
    thumbRef,
    fillRef,
    wheelRef,
    handleRailPointerDown,
    handleThumbPointerDown,
    handleThumbPointerMove,
    handleThumbPointerUp
  } = useScrollRail()

  return (
    <div
      ref={railRef}
      aria-hidden='true'
      onPointerDown={handleRailPointerDown}
      className='group/rail invisible fixed top-2 right-1 bottom-2 z-50 flex w-6 cursor-pointer justify-center opacity-0'
    >
      <span className='absolute inset-y-0 w-0.5 rounded-full bg-(--scrollbar)/50 transition-[width,background-color] duration-300 ease-fluid group-hover/rail:w-1 group-hover/rail:bg-(--scrollbar)' />
      <span
        ref={fillRef}
        className='absolute inset-y-0 w-0.5 rounded-full bg-linear-to-b from-primary to-neon shadow-[0_0_10px_var(--neon)] transition-[width] duration-300 ease-fluid group-hover/rail:w-1'
      />
      <div
        ref={thumbRef}
        onPointerDown={handleThumbPointerDown}
        onPointerMove={handleThumbPointerMove}
        onPointerUp={handleThumbPointerUp}
        onPointerCancel={handleThumbPointerUp}
        className='absolute top-0 size-6 cursor-grab touch-none rounded-full will-change-transform active:cursor-grabbing'
      >
        <div ref={wheelRef} className='size-full drop-shadow-[0_2px_6px_rgb(0_0_0/0.35)]' />
      </div>
    </div>
  )
}

const ScrollRail = () => {
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  return hasFinePointer && isWebGLAvailable() ? <Rail /> : null
}

export default ScrollRail
