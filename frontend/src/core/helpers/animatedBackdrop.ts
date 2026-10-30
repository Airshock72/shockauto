import gsap from 'gsap'

export const backdropOrbs = [
  { className: 'top-[-12rem] left-[-10rem] size-[36rem] bg-primary/25', depth: 40 },
  { className: 'top-[10%] right-[-12rem] size-[32rem] bg-neon/20', depth: -30 },
  { className: 'bottom-[-14rem] left-[30%] size-[40rem] bg-primary/15', depth: 20 }
]

export const backdropStreakTops = ['18%', '42%', '68%']

export const backdropSparks = [
  { top: '12%', left: '22%', delay: '0s' },
  { top: '28%', left: '78%', delay: '0.8s' },
  { top: '46%', left: '8%', delay: '1.6s' },
  { top: '58%', left: '62%', delay: '0.4s' },
  { top: '74%', left: '38%', delay: '2.2s' },
  { top: '20%', left: '52%', delay: '1.2s' },
  { top: '84%', left: '86%', delay: '2.8s' }
]

export const animateBackdropOrbs = (orbs: Array<HTMLElement>) =>
  orbs.map((orb) => gsap.to(orb, {
    x: () => gsap.utils.random(-120, 120),
    y: () => gsap.utils.random(-80, 80),
    scale: () => gsap.utils.random(0.85, 1.2),
    duration: () => gsap.utils.random(9, 14),
    ease: 'sine.inOut',
    repeat: -1,
    repeatRefresh: true,
    yoyo: true
  }))

export const animateBackdropStreaks = (streaks: Array<HTMLElement>) =>
  streaks.map((streak, index) => gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(3, 6), delay: index * 2.2 })
    .fromTo(streak, { x: '-25vw', opacity: 0 }, { x: '110vw', duration: 2.6, ease: 'power2.inOut' })
    .to(streak, { opacity: 0.9, duration: 0.6, ease: 'power1.out' }, 0)
    .to(streak, { opacity: 0, duration: 0.6, ease: 'power1.in' }, 2))

export const createBackdropParallax = (layers: Array<HTMLElement>, depths: Array<number>) => {
  const movers = layers.map((layer) => ({
    x: gsap.quickTo(layer, 'xPercent', { duration: 1.4, ease: 'power3.out' }),
    y: gsap.quickTo(layer, 'yPercent', { duration: 1.4, ease: 'power3.out' })
  }))

  return (event: PointerEvent) => {
    const offsetX = event.clientX / window.innerWidth - 0.5
    const offsetY = event.clientY / window.innerHeight - 0.5
    movers.forEach((mover, index) => {
      mover.x(offsetX * depths[index] / 4).then()
      mover.y(offsetY * depths[index] / 4).then()
    })
  }
}
