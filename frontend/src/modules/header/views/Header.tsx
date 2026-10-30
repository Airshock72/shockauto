import BrandLogo from 'src/modules/header/views/BrandLogo.tsx'
import UserMenu from 'src/modules/header/views/UserMenu.tsx'
import MobileMenu from 'src/modules/header/views/MobileMenu.tsx'
import LanguageSwitcher from 'src/core/components/switchers/LanguageSwitcher.tsx'
import ThemeSwitcher from 'src/core/components/switchers/ThemeSwitcher.tsx'
import useMediaQuery from 'src/core/hooks/useMediaQuery.ts'
import useHeaderIntro from 'src/modules/header/hooks/useHeaderIntro.ts'
import useHeaderFloat from 'src/modules/header/hooks/useHeaderFloat.ts'

const Header = () => {
  const headerRef = useHeaderIntro()
  const shellRef = useHeaderFloat()
  const isDesktop = useMediaQuery('(min-width: 48rem)')

  return (
    <div className='box-content h-header-mobile shrink-0 safe-top md:h-header'>
      <header ref={headerRef} className='fixed inset-x-0 top-0 z-40 safe-top'>
        <div
          ref={shellRef}
          data-floating='false'
          className='group glass relative border border-transparent border-b-border transition-[border-color,box-shadow,background-color] duration-500 ease-fluid data-[floating=true]:border-border/70 data-[floating=true]:shadow-elevated'
        >
          <div className='container flex h-header-mobile items-center justify-between gap-4 transition-[height] duration-500 ease-fluid md:h-header md:group-data-[floating=true]:h-14'>
            <div data-header-brand className='min-w-0'>
              <BrandLogo />
            </div>

            {isDesktop
              ? <div className='flex items-center gap-3 lg:gap-4'>
                <div data-header-action><ThemeSwitcher /></div>
                <div data-header-action><LanguageSwitcher /></div>
                <span data-header-action aria-hidden='true' className='h-6 w-px bg-border' />
                <div data-header-action><UserMenu /></div>
              </div>
              : <div data-header-action><MobileMenu /></div>
            }
          </div>

          <span
            data-header-line
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-neon/60 to-transparent'
          />
        </div>
      </header>
    </div>
  )
}

export default Header
