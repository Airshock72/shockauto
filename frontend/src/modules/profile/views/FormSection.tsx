import type { FormSectionProps } from 'src/modules/profile/types'

const FormSection = ({ icon: Icon, title, children }: FormSectionProps) => {
  return (
    <section className='space-y-5'>
      <h2 className='flex items-center gap-2.5 text-sm font-semibold'>
        <span className='grid size-7 place-items-center rounded-lg bg-primary/10 text-primary [&_svg]:size-4'>
          <Icon aria-hidden='true' />
        </span>
        {title}
        <span aria-hidden='true' className='h-px flex-1 bg-linear-to-r from-border to-transparent' />
      </h2>
      <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2'>{children}</div>
    </section>
  )
}

export default FormSection
