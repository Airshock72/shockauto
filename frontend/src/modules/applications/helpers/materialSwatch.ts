import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { InteriorMaterial } from 'src/modules/applications/types'

type MaterialAnimation = (swatch: HTMLElement) => gsap.core.Timeline

const weave = 'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.22) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgb(0 0 0 / 0.3) 0 1px, transparent 1px 3px)'

export const getMaterialBase = (tint: string): CSSProperties => ({
  backgroundColor: tint,
  backgroundImage: 'linear-gradient(150deg, rgb(255 255 255 / 0.2), transparent 55%, rgb(0 0 0 / 0.28))',
  boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.2), 0 2px 6px -2px rgb(0 0 0 / 0.4)'
})

export const materialTextures: Record<InteriorMaterial, CSSProperties> = {
  [InteriorMaterial.Fabric]: {
    backgroundImage: weave,
    backgroundPosition: '0px 0px, 0px 0px'
  },
  [InteriorMaterial.Leather]: {
    backgroundImage: 'radial-gradient(circle at 30% 22%, rgb(255 255 255 / 0.45), transparent 48%), radial-gradient(rgb(0 0 0 / 0.25) 0.5px, transparent 0.7px)',
    backgroundSize: '100% 100%, 3px 3px'
  },
  [InteriorMaterial.ArtificialLeather]: {
    backgroundImage: 'radial-gradient(circle, rgb(0 0 0 / 0.55) 0.7px, transparent 1px), linear-gradient(160deg, rgb(255 255 255 / 0.32), transparent 60%)',
    backgroundSize: '4px 4px, 100% 100%'
  },
  [InteriorMaterial.Combined]: {
    left: '50%',
    backgroundImage: weave,
    backgroundPosition: '0px 0px, 0px 0px'
  },
  [InteriorMaterial.Alcantara]: {
    backgroundImage: 'repeating-linear-gradient(100deg, rgb(255 255 255 / 0.08) 0 1px, transparent 1px 2px), radial-gradient(circle at 50% 120%, rgb(0 0 0 / 0.38), transparent 70%)'
  }
}

export const materialShines: Record<InteriorMaterial, string> = {
  [InteriorMaterial.Fabric]: 'linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 0.35) 50%, transparent 65%)',
  [InteriorMaterial.Leather]: 'linear-gradient(105deg, transparent 32%, rgb(255 255 255 / 0.75) 50%, transparent 68%)',
  [InteriorMaterial.ArtificialLeather]: 'linear-gradient(105deg, transparent 32%, rgb(255 255 255 / 0.85) 50%, transparent 68%)',
  [InteriorMaterial.Combined]: 'linear-gradient(105deg, transparent 32%, rgb(255 255 255 / 0.55) 50%, transparent 68%)',
  [InteriorMaterial.Alcantara]: 'linear-gradient(120deg, transparent 25%, rgb(255 255 255 / 0.3) 50%, transparent 75%)'
}

export const stitchBackground = 'repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.9) 0 2px, transparent 2px 4px)'

const part = (swatch: HTMLElement, name: 'texture' | 'shine' | 'stitch') => swatch.querySelector(`[data-material-${name}]`)

const shineSweep = (swatch: HTMLElement, peakOpacity: number, duration: number) =>
  gsap.timeline()
    .fromTo(part(swatch, 'shine'), { xPercent: -110 }, { xPercent: 110, duration, ease: 'power2.inOut' })
    .fromTo(part(swatch, 'shine'), { opacity: 0 }, { keyframes: { opacity: [0, peakOpacity, 0] }, duration, ease: 'none' }, 0)

export const materialAnimations: Record<InteriorMaterial, MaterialAnimation> = {
  [InteriorMaterial.Fabric]: (swatch) => gsap.timeline()
    .fromTo(part(swatch, 'texture'), { backgroundPosition: '0px 0px, 0px 0px' }, { backgroundPosition: '6px 6px, -6px 6px', duration: 1.4, ease: 'none' })
    .to(swatch, { keyframes: { scaleY: [1, 0.9, 1], scaleX: [1, 1.08, 1] }, duration: 0.55, ease: 'sine.inOut' }, 0),

  [InteriorMaterial.Leather]: (swatch) => gsap.timeline()
    .add(shineSweep(swatch, 1, 1.1))
    .to(swatch, { keyframes: { rotationX: [0, 22, 0] }, transformPerspective: 120, duration: 1.1, ease: 'sine.inOut' }, 0),

  [InteriorMaterial.ArtificialLeather]: (swatch) => gsap.timeline()
    .to(part(swatch, 'texture'), { keyframes: { backgroundSize: ['4px 4px, 100% 100%', '5.5px 5.5px, 100% 100%', '4px 4px, 100% 100%'] }, duration: 0.9, ease: 'sine.inOut' })
    .add(shineSweep(swatch, 1, 0.7), 0.3),

  [InteriorMaterial.Combined]: (swatch) => gsap.timeline()
    .fromTo(part(swatch, 'stitch'), { backgroundPosition: '0px 0px' }, { backgroundPosition: '0px 12px', duration: 1.2, ease: 'none' })
    .to(swatch, { keyframes: { rotationY: [0, 28, -28, 0] }, transformPerspective: 120, duration: 1.2, ease: 'sine.inOut' }, 0),

  [InteriorMaterial.Alcantara]: (swatch) => gsap.timeline()
    .add(shineSweep(swatch, 1, 1.6))
    .to(part(swatch, 'texture'), { keyframes: { opacity: [1, 0.5, 1] }, duration: 1.6, ease: 'sine.inOut' }, 0)
}
