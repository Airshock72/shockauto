import { cn } from 'src/core/lib/utils'
import { InteriorMaterial, type MaterialSwatchProps } from 'src/modules/applications/types'
import { getMaterialBase, materialShines, materialTextures, stitchBackground } from 'src/modules/applications/helpers/materialSwatch.ts'
import useMaterialSwatch from 'src/modules/applications/hooks/useMaterialSwatch.ts'

const MaterialSwatch = ({ material, tint, checked }: MaterialSwatchProps) => {
  const swatchRef = useMaterialSwatch(material, checked)

  return (
    <span
      ref={swatchRef}
      className={cn(
        'relative block size-6 overflow-hidden rounded-md outline-2 outline-offset-2 will-change-transform',
        'transition-[background-color,outline-color] duration-500 ease-fluid',
        checked ? 'outline-primary' : 'outline-transparent'
      )}
      style={getMaterialBase(tint)}
    >
      <span data-material-texture className='pointer-events-none absolute inset-0' style={materialTextures[material]} />
      {material === InteriorMaterial.Combined && (
        <span data-material-stitch className='pointer-events-none absolute inset-y-0 left-[calc(50%-0.5px)] w-px' style={{ backgroundImage: stitchBackground }} />
      )}
      <span data-material-shine className='pointer-events-none absolute -inset-[20%] opacity-0' style={{ backgroundImage: materialShines[material] }} />
    </span>
  )
}

export default MaterialSwatch
