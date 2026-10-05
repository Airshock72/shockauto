import BrandLogo from 'src/modules/header/views/BrandLogo.tsx'
import UserMenu from 'src/modules/header/views/UserMenu.tsx'
import MobileMenu from 'src/modules/header/views/MobileMenu.tsx'
import LanguageSwitcher from 'src/core/components/switchers/LanguageSwitcher.tsx'
import ThemeSwitcher from 'src/core/components/switchers/ThemeSwitcher.tsx'
import useMediaQuery from 'src/core/hooks/useMediaQuery.ts'
import useHeaderIntro from 'src/modules/header/hooks/useHeaderIntro.ts'

const Header = () => {
  const headerRef = useHeaderIntro()
  const isDesktop = useMediaQuery('(min-width: 48rem)')

  return (
    <header ref={headerRef} className='glass sticky top-0 z-40 border-b safe-top'>
      <div className='container flex h-header-mobile items-center justify-between gap-4 md:h-header'>
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
    </header>
  )
}

export default Header
