export const backToTopOffset = 480

export const wheelCenter = 32

export const wheelTireRadius = 25

export const wheelRimRadius = 16

export const wheelSpokeCount = 5

export const progressRadius = 30

export const progressCircumference = 2 * Math.PI * progressRadius

export const rollDistance = 112

export const backToTopSize = 56

export const rollRotation = (rollDistance / (wheelTireRadius * (backToTopSize / (wheelCenter * 2)))) * (180 / Math.PI)

export const scrollSpinRatio = 0.35

export const smokePuffCount = 4

export const getScrollUpDuration = (scrollY: number) => Math.min(1.4, Math.max(0.6, scrollY / 2500))

export const spokeAngles = Array.from({ length: wheelSpokeCount }, (_, index) => (360 / wheelSpokeCount) * index)
