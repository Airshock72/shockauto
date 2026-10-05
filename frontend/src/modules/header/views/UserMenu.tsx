import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, LogOut } from 'lucide-react'
import { cn } from 'src/core/lib/utils'
import UserAvatar from 'src/core/components/avatars/UserAvatar.tsx'
import useCurrentUser from 'src/core/hooks/useCurrentUser.ts'
import useDropdown from 'src/core/hooks/useDropdown.ts'
import useLogout from 'src/modules/header/hooks/useLogout.ts'
import useMenuReveal from 'src/modules/header/hooks/useMenuReveal.ts'
import { userMenuLinks } from 'src/modules/header/helpers'

const UserMenu = () => {
  const { t } = useTranslation()
  const user = useCurrentUser()
  const logout = useLogout()
  const { isOpen, toggle, close, rootRef, triggerRef, menuRef, handleMenuKeyDown } = useDropdown()
  useMenuReveal(menuRef, isOpen)

  return (
    <div ref={rootRef} className='relative'>
      <button
        ref={triggerRef}
        type='button'
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls='user-menu'
        onClick={toggle}
        className={cn(
          'flex items-center gap-2.5 rounded-full border bg-card/60 py-0.5 pr-3 pl-0.5 shadow-soft outline-none',
          'transition-[background-color,border-color,box-shadow] duration-200',
          'hover:border-neon/40 hover:bg-accent/50 focus-visible:ring-4 focus-visible:ring-ring/40',
          isOpen && 'border-neon/40 bg-accent/50'
        )}
      >
        <UserAvatar initials={user.initials} size='sm' />
        <span className='max-w-36 truncate text-sm font-semibold lg:max-w-48'>{user.name}</span>
        <ChevronDown
          aria-hidden='true'
          className={cn('size-4 text-muted-foreground transition-transform duration-300 ease-spring', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id='user-menu'
          role='menu'
          aria-label={t('header.userMenu')}
          onKeyDown={handleMenuKeyDown}
          className='neon-edge absolute top-full right-0 z-50 mt-2 w-72 rounded-2xl border bg-popover/95 p-2 text-popover-foreground shadow-elevated backdrop-blur-xl'
        >
          <div data-menu-item className='flex items-center gap-3 rounded-xl bg-linear-to-br from-primary/10 to-neon/10 p-3'>
            <UserAvatar initials={user.initials} size='lg' />
            <div className='min-w-0'>
              <p className='truncate font-display font-semibold'>{user.name}</p>
              {user.email && <p className='truncate text-xs text-muted-foreground'>{user.email}</p>}
            </div>
          </div>

          <div className='my-2 h-px bg-linear-to-r from-transparent via-border to-transparent' />

          {userMenuLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              role='menuitem'
              data-menu-item
              onClick={() => close()}
              className={cn(cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none',
                'transition-colors duration-150 [&_svg]:size-4.5 [&_svg]:shrink-0'
              ), 'text-foreground hover:bg-accent hover:shadow-[inset_2px_0_0_var(--neon)] focus-visible:bg-accent focus-visible:shadow-[inset_2px_0_0_var(--neon)]')}
            >
              <Icon aria-hidden='true' className='text-muted-foreground' />
              {t(label)}
            </Link>
          ))}

          <div className='my-2 h-px bg-linear-to-r from-transparent via-border to-transparent' />

          <button
            type='button'
            role='menuitem'
            data-menu-item
            onClick={logout}
            className={cn(cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium outline-none',
              'transition-colors duration-150 [&_svg]:size-4.5 [&_svg]:shrink-0'
            ), 'text-destructive hover:bg-destructive/10 focus-visible:bg-destructive/10')}
          >
            <LogOut aria-hidden='true' />
            {t('header.logout')}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
