import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { NavLink } from 'react-router-dom'
import { KDropdown } from '../KDropdown'
import { links } from './config'
import '@radix-ui/themes/styles.css'

export function Navbar() {
  // const isAuth = localStorage.getItem('isAuth') === 'true'
  return (
    <div className={`
      mx-2 flex w-full max-w-[800px] items-center justify-between
      drop-shadow-mainshadow

      dark:text-gray-200 dark:drop-shadow-none

      md:ml-0
    `}
    >
      <div className="flex w-full items-center gap-2">
        {links.map(link => (
          <NavLink
            key={link.name}
            className={({ isActive }) => isActive
              ? `
                w-full rounded-lg border-2 bg-blue-200 p-2 text-center
                transition-all duration-200 ease-in-out

                dark:border-gray-700 dark:bg-gray-800
              `
              : `
                w-full rounded-md border-2 bg-white p-2 text-center
                transition-all duration-200 ease-in-out

                dark:border-gray-700 dark:bg-dark-primary
              `}
            to={link.path}
          >
            {link.name}
          </NavLink>
        ))}
        <div className={`
          hidden

          sm:block
        `}
        >
          <ThemeSwitcher />
        </div>
        <KDropdown />
      </div>
    </div>
  )
}
