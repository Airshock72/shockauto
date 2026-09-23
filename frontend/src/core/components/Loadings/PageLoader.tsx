import { Skeleton } from 'src/core/components/ui/skeleton.tsx'

const STAT_CARDS = 4
const LIST_ROWS = 5

const PageLoader = () => {
  return (
    <div role='status' aria-live='polite' aria-busy='true' className='relative w-full'>
      <span className='sr-only'>იტვირთება...</span>

      {/* Top progress beam */}
      <div className='fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-primary/10'>
        <div className='h-full w-1/3 animate-progress bg-linear-to-r from-transparent via-primary to-neon' />
      </div>

      <div className='container space-y-6 py-6 md:space-y-8 md:py-8'>
        {/* Page header */}
        <div className='flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-3'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-8 w-56 sm:h-9 sm:w-72' />
            <Skeleton className='h-4 w-full max-w-md' />
          </div>
          <div className='flex gap-3'>
            <Skeleton className='h-10 flex-1 rounded-lg sm:w-28 sm:flex-none' />
            <Skeleton className='h-10 flex-1 rounded-lg sm:w-32 sm:flex-none' />
          </div>
        </div>

        {/* Stat cards */}
        <div className='grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: STAT_CARDS }, (_, index) => (
            <div
              key={index}
              className='animate-fade-up space-y-4 rounded-xl border bg-card/60 p-5 shadow-soft'
              style={{ animationDelay: `${80 + index * 60}ms` }}
            >
              <div className='flex items-center gap-3'>
                <Skeleton className='size-10 rounded-lg' />
                <Skeleton className='h-4 w-20' />
              </div>
              <Skeleton className='h-7 w-28' />
              <Skeleton className='h-3 w-16' />
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6'>
          <div className='animate-fade-up space-y-5 rounded-xl border bg-card/60 p-5 shadow-soft [animation-delay:320ms] sm:p-6 lg:col-span-2'>
            <div className='flex items-center justify-between gap-4'>
              <Skeleton className='h-5 w-40' />
              <Skeleton className='h-8 w-24 rounded-lg' />
            </div>
            <Skeleton className='h-56 w-full rounded-lg sm:h-72' />
          </div>

          <div className='animate-fade-up space-y-5 rounded-xl border bg-card/60 p-5 shadow-soft [animation-delay:380ms] sm:p-6'>
            <Skeleton className='h-5 w-32' />
            <div className='space-y-4'>
              {Array.from({ length: LIST_ROWS }, (_, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Skeleton className='size-9 shrink-0 rounded-full' />
                  <div className='flex-1 space-y-2'>
                    <Skeleton className='h-3.5 w-3/4' />
                    <Skeleton className='h-3 w-1/2' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
