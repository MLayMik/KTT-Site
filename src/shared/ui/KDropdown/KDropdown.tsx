import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KLogInModal } from '../KLogInModal'

export function KDropdown() {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isAuth = localStorage.getItem('isAuth') === 'true'

  const handleLogOff = () => {
    if (isAuth === true) {
      localStorage.setItem('isAuth', 'false')
      setIsMenuOpen(false)
      location.reload()
    }
  }
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog.Root>
      <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenu.Trigger
          ref={dropdownTriggerRef}
          className="focus:outline-none"
        >
          <div className="ml-2 flex size-6 items-center justify-center">
            {isAuth ? <Menu /> : <User />}
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side="right"
          className={`
            absolute -top-6 mt-2 rounded-lg bg-white p-2 text-sm font-medium
            drop-shadow-mainshadow

            dark:bg-slate-900

            md:mx-4
          `}
        >

          {isAuth
            ? (
                <Dialog.Trigger>
                  <DropdownMenu.Item className={`
                    w-full whitespace-nowrap rounded-md px-3 py-1
                    transition-colors duration-300 ease-in-out

                    dark:hover:bg-slate-700

                    focus:outline-none

                    hover:bg-slate-300
                  `}
                  >
                    <Link to="admin" onClick={() => setIsMenuOpen(false)}>
                      Редактировать встречи
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className={`
                    my-1 border-t border-slate-200
                  `}
                  />
                  <DropdownMenu.Item className="focus:outline-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleLogOff()
                        navigate('/')
                      }}
                      className={`
                        w-full rounded-md px-3 py-1 transition-colors
                        duration-300 ease-in-out

                        dark:hover:bg-slate-700

                        focus:outline-none

                        hover:bg-slate-200
                      `}
                    >
                      Выйти
                    </button>
                  </DropdownMenu.Item>
                </Dialog.Trigger>
              )
            : (
                <Dialog.Trigger>
                  <DropdownMenu.Item className={`
                    rounded-md bg- px-3 py-1 transition-colors duration-300
                    ease-in-out

                    dark:hover:bg-slate-700

                    focus:outline-none

                    hover:bg-slate-200
                  `}
                  >
                    Войти
                  </DropdownMenu.Item>
                </Dialog.Trigger>
              )}
        </DropdownMenu.Content>

        <KLogInModal />

      </DropdownMenu.Root>
    </Dialog.Root>

  )
}
