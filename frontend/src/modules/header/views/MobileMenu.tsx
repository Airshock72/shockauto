import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronRight, Globe, LogOut, Palette } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import UserAvatar from 'src/modules/header/views/UserAvatar.tsx'
import LanguageSwitcher from 'src/core/components/switchers/LanguageSwitcher.tsx'
import ThemeSwitcher from 'src/core/components/switchers/ThemeSwitcher.tsx'
import Button from 'src/core/components/buttons/Button.tsx'
import useMobileMenu from 'src/modules/header/hooks/useMobileMenu.ts'
import { userMenuLinks } from 'src/modules/header/helpers'

const MobileMenu = () => {
  const { t, user, logout, resolvedTheme, isOpen, panelRef, close, toggle } = useMobileMenu()

  return (
    <>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-controls='mobile-menu'
        aria-label={t(isOpen ? 'header.closeMenu' : 'header.openMenu')}
        onClick={toggle}
        className={cn(
          'relative size-10 shrink-0 rounded-xl border bg-card/60 text-foreground shadow-soft outline-none',
          'transition-colors duration-200 hover:bg-accent focus-visible:ring-4 focus-visible:ring-ring/40',
          isOpen && 'border-neon/40 bg-accent text-neon'
        )}
      >
        <span aria-hidden='true' className={cn('absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-fluid',
          isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-3')} />
        <span aria-hidden='true' className={cn('absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-fluid', 'top-1/2 -translate-y-1/2',
          isOpen && 'scale-x-0 opacity-0')} />
        <span aria-hidden='true' className={cn('absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-fluid',
          isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-3')} />
      </button>

      {isOpen && createPortal(
        <>
          <div
            aria-hidden='true'
            onClick={close}
            className={cn('fixed inset-x-0 bottom-0 z-40 animate-fade-in bg-background/60 backdrop-blur-sm', 'top-[calc(var(--spacing-header-mobile)+env(safe-area-inset-top))]')}
          />

          <nav
            ref={panelRef}
            id='mobile-menu'
            aria-label={t('header.menu')}
            className={cn(
              'fixed inset-x-0 z-50 max-h-[calc(100dvh-var(--spacing-header-mobile)-env(safe-area-inset-top))]',
              'overflow-y-auto border-b bg-popover/95 shadow-elevated backdrop-blur-xl safe-bottom',
              'top-[calc(var(--spacing-header-mobile)+env(safe-area-inset-top))]'
            )}
          >
            <div className='container space-y-4 py-5'>
              <div data-menu-item className='flex items-center gap-3 rounded-2xl bg-linear-to-br from-primary/10 to-neon/10 p-4'>
                <UserAvatar initials={user.initials} size='lg' />
                <div className='min-w-0'>
                  <p className='truncate font-display text-lg font-semibold'>{user.name}</p>
                  {user.email && <p className='truncate text-sm text-muted-foreground'>{user.email}</p>}
                </div>
              </div>

              <ul data-menu-item className='overflow-hidden rounded-2xl border bg-card/60'>
                {userMenuLinks.map(({ to, label, icon: Icon }) => (
                  <li key={to} className='border-b'>
                    <Link
                      to={to}
                      onClick={close}
                      className='flex items-center gap-3 px-4 py-3.5 text-sm font-medium outline-none transition-[background-color,box-shadow] hover:bg-accent hover:shadow-[inset_2px_0_0_var(--neon)] focus-visible:bg-accent focus-visible:shadow-[inset_2px_0_0_var(--neon)]'
                    >
                      <Icon aria-hidden='true' className='size-4.5 text-muted-foreground' />
                      <span className='flex-1'>{t(label)}</span>
                      <ChevronRight aria-hidden='true' className='size-4 text-muted-foreground' />
                    </Link>
                  </li>
                ))}
              </ul>

              <div data-menu-item className='space-y-3 rounded-2xl border bg-card/60 p-4'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  <span className='flex items-center gap-3 text-sm font-medium'>
                    <Globe aria-hidden='true' className='size-4.5 text-muted-foreground' />
                    {t('header.language')}
                  </span>
                  <LanguageSwitcher extended />
                </div>

                <div className='h-px bg-border' />

                <div className='flex items-center justify-between gap-3'>
                  <span className='flex items-center gap-3 text-sm font-medium'>
                    <Palette aria-hidden='true' className='size-4.5 text-muted-foreground' />
                    {t('header.theme')}
                    <span className='rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground'>
                      {t(resolvedTheme === 'dark' ? 'theme.dark' : 'theme.light')}
                    </span>
                  </span>
                  <ThemeSwitcher />
                </div>
              </div>

              <Button
                data-menu-item
                variant='outline'
                size='lg'
                fullWidth
                shimmer={false}
                leftIcon={<LogOut />}
                onClick={logout}
                className='text-destructive hover:border-destructive/40 hover:bg-destructive/10'
              >
                {t('header.logout')}
              </Button>
            </div>
          </nav>
        </>,
        document.body
      )}
    </>
  )
}

export default MobileMenu
