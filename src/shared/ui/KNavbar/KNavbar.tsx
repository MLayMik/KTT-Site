import { KThemeSwitcher } from '@/shared/ui/KThemeSwitcher'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { KDropdown } from '../KDropdown'
import { KLogInModal } from '../KLogInModal'
import { links } from './config'
import '@radix-ui/themes/styles.css'

export function KNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const isAuth = localStorage.getItem('isAuth') === 'true'

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    }
    else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [isMenuOpen])

  const handleLogOff = () => {
    if (isAuth === true) {
      localStorage.setItem('isAuth', 'false')
      setIsMenuOpen(false)
      location.reload()
    }
  }
  return (
    <div className={`
      absolute left-0 top-0 z-10 flex w-full max-w-[800px] items-center
      justify-between drop-shadow-mainshadow

      dark:text-gray-200 dark:drop-shadow-none

      sm:static
    `}
    >
      <button
        className={`
          absolute left-3 top-5 z-20 rounded-md border border-gray-300 p-2
          transition-all duration-200

          dark:border-gray-600 dark:hover:bg-gray-800

          hover:bg-gray-100

          sm:hidden
        `}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <div className={`
        hidden w-full items-center gap-2

        sm:flex
      `}
      >
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
          <KThemeSwitcher />
        </div>
        <KDropdown />
      </div>

      <div className={`
        fixed inset-0 z-10 flex h-screen flex-col items-center bg-white px-3
        text-lg transition-transform duration-300

        dark:bg-slate-800 dark:text-gray-200

        sm:hidden

        ${isMenuOpen
      ? 'translate-y-0'

      : '-translate-y-full'}
      `}
      >
        <div className="flex w-full items-center justify-end">
          <div className="mb-2 mt-6">
            <KThemeSwitcher />
          </div>

        </div>
        {links.map(link => (
          <NavLink
            key={link.name}
            className={({ isActive }) =>
              isActive
                ? `
                  mb-4 w-full rounded-lg border-2 bg-blue-200 p-2 text-center
                  transition-all duration-200

                  dark:border-gray-700 dark:bg-gray-800
                `
                : `
                  mb-4 w-full rounded-md border-2 bg-white p-2 text-center
                  transition-all duration-200

                  dark:border-gray-700 dark:bg-dark-primary
                `}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}
        <Dialog.Root>

          {isAuth
            ? (
                <>
                  <NavLink
                    to="admin"
                    className={`
                      mb-4 w-full rounded-md border-2 bg-white p-2 text-center
                      transition-all duration-200

                      dark:border-gray-700 dark:bg-dark-primary
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Редактировать встречи
                  </NavLink>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleLogOff()
                      navigate('/')
                    }}
                    className={`
                      mb-4 w-full rounded-md border-2 bg-white p-2 text-center
                      transition-all duration-200

                      dark:border-gray-700 dark:bg-dark-primary
                    `}
                  >
                    Выйти
                  </button>
                </>
              )
            : (
                <Dialog.Trigger className="w-full">
                  <div className={`
                    mb-4 w-full rounded-md border-2 bg-white p-2 text-center
                    transition-all duration-200

                    dark:border-gray-700 dark:bg-dark-primary
                  `}
                  >
                    Войти
                  </div>
                </Dialog.Trigger>
              )}
          <KLogInModal />
        </Dialog.Root>
      </div>
    </div>
  )
}
