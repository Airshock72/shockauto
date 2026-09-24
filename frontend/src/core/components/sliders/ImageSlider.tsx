import { cn } from 'src/core/lib/utils'
import useImageSlider from 'src/core/hooks/useImageSlider.ts'
import type { ImageSliderProps } from 'src/core/types/ImageSlider.ts'

const ImageSlider = ({ slides, interval = 5000, className }: ImageSliderProps) => {
  const {
    state,
    activeSlide,
    goTo,
    setPaused,
    handleKeyDown,
    handleImageError
  } = useImageSlider(slides)

  if (!slides.length) return null

  return (
    <div
      role='region'
      aria-roledescription='carousel'
      aria-label='Featured cars'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        'group relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-primary/40 via-card to-neon/30 shadow-elevated outline-none',
        'focus-visible:ring-4 focus-visible:ring-ring/40',
        className
      )}
    >
      {slides.map((slide, index) => {
        const isActive = index === state.activeIndex

        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={cn('absolute inset-0 -z-10', isActive ? 'opacity-100' : 'opacity-0')}
            style={{ transition: 'opacity 1.1s var(--ease-fluid)' }}
          >
            {!state.failedIndexes.has(index) && (
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding='async'
                draggable={false}
                onError={() => handleImageError(index)}
                className={cn('size-full object-cover', isActive ? 'scale-100' : 'scale-110')}
                style={{ objectPosition: slide.position, transition: `transform ${interval + 1500}ms var(--ease-fluid)` }}
              />
            )}
          </div>
        )
      })}

      <div className='pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/20 to-black/30' />

      <div className='absolute inset-x-0 bottom-0 space-y-6 p-8 text-white xl:p-10'>
        <div key={state.activeIndex} className='max-w-lg animate-fade-up space-y-2' aria-live='polite'>
          {activeSlide.eyebrow && (
            <p className='text-xs font-semibold tracking-futuristic text-white/70 uppercase'>{activeSlide.eyebrow}</p>
          )}
          {activeSlide.title && <h2 className='text-display-md font-bold'>{activeSlide.title}</h2>}
          {activeSlide.subtitle && <p className='text-sm text-white/75'>{activeSlide.subtitle}</p>}
        </div>

        <div className='flex items-center gap-2'>
          {slides.map((slide, index) => {
            const isActive = index === state.activeIndex

            return (
              <button
                key={slide.src}
                type='button'
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}${slide.title ? `: ${slide.title}` : ''}`}
                aria-current={isActive || undefined}
                className={cn(
                  'relative h-2 overflow-hidden rounded-full outline-none transition-[width,background-color] duration-500 ease-fluid',
                  'focus-visible:ring-2 focus-visible:ring-white/80',
                  isActive ? 'w-10 bg-white/25' : 'w-2 bg-white/45 hover:bg-white/80'
                )}
              >
                {isActive && (
                  <span
                    className='absolute inset-0 origin-left rounded-full bg-white'
                    onAnimationEnd={() => goTo(state.activeIndex + 1)}
                    style={state.autoplay ? {
                      animation: `slide-progress ${interval}ms linear forwards`,
                      animationPlayState: state.isPaused ? 'paused' : 'running'
                    } : undefined}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
