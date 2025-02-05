import { KInput } from '@/shared/ui/KInput'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Button, Flex } from '@radix-ui/themes'
import { Menu, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_PASSWORD } from '../Navbar'
import { ThemeSwitcher } from '../ThemeSwitcher'

export function KDropdown() {
  const navigate = useNavigate()

  const ref = useRef<HTMLButtonElement>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isAuth = localStorage.getItem('isAuth') === 'true'

  const handleLogIn = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAuth', 'true')
      setError('')
      setPassword('')
      ref.current?.click()
      setIsMenuOpen(false)
      location.reload()
    }
    else {
      setError('Неверный пароль. Попробуйте снова.')
      setPassword('')
    }
  }

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

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content
            onCloseAutoFocus={(event) => {
              // Возвращаем фокус на DropdownMenu.Trigger для доступности
              dropdownTriggerRef.current?.focus()
              event.preventDefault()
            }}
            className={`
              fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2
              -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-lg

              dark:bg-slate-800 dark:text-slate-200
            `}
          >
            <Dialog.Title className="mb-4 text-lg font-semibold">
              Вход в панель для редактирования
            </Dialog.Title>
            <Flex direction="column" gap="4">
              <KInput
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Пароль"
              />

              {error && (
                <p
                  className={`
                    rounded-md bg-red-100 p-2 text-sm font-medium text-red-600
                    drop-shadow-sm

                    dark:bg-red-800 dark:text-red-300
                  `}
                >
                  {error}
                </p>
              )}
            </Flex>

            <Flex className="mt-3 justify-end gap-3">
              <Dialog.Close>
                <Button
                  variant="soft"
                  color="gray"
                  className={`
                    rounded-md bg-slate-200 px-4 py-2 text-slate-900
                    transition-colors duration-200 ease-in-out

                    dark:bg-slate-700 dark:text-slate-200
                    dark:hover:bg-slate-800

                    hover:bg-slate-300
                  `}
                >
                  Отменить
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleLogIn}
                className={`
                  rounded-md bg-blue-600 px-4 py-2 text-white transition-colors
                  duration-200 ease-in-out

                  dark:bg-blue-700 dark:hover:bg-blue-800

                  hover:bg-blue-700
                `}
              >
                Войти
              </Button>
            </Flex>
          </Dialog.Content>

        </Dialog.Portal>

        {/* <Dialog.Root>
            <DropdownMenu.Item
              onClick={(e) => {
                e.preventDefault()
                ref?.current?.click()
              }}
            >
              <div>
                <Dialog.Trigger ref={ref}>
                  <div></div>
                </Dialog.Trigger>
                Войти
              </div>
            </DropdownMenu.Item>
            <Dialog.Content aria-describedby="">

            </Dialog.Content>
          </Dialog.Root> */}
        <div className={`
          flex px-2

          sm:hidden sm:justify-end
        `}
        >
          <ThemeSwitcher />
        </div>
      </DropdownMenu.Root>
    </Dialog.Root>

  )
}
