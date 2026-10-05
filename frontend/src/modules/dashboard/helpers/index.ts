import gsap from 'gsap'

export const nameToken = '%%name%%'

export const splitGreeting = (greeting: string) => {
  const [before = '', after = ''] = greeting.split(nameToken)
  return { before, after }
}

export const toWords = (text: string) => text.split(/(\s+)/).filter(Boolean)

export const animateHeroIntro = () => {
  return gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-hero-word]', { yPercent: 60, opacity: 0, filter: 'blur(6px)', duration: 0.7, stagger: 0.06 })
    .from('[data-hero-fade]', { y: 8, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.45')
    .fromTo('[data-hero-line]',
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left center', duration: 0.9, ease: 'power2.inOut' },
      '-=0.5'
    )
}
