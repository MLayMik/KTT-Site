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
  const inputRef = useRef<HTMLInputElement>(null)
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
        <DropdownMenu.Trigger ref={dropdownTriggerRef}>
          <div className={`
            ml-2 flex size-6 items-center justify-center

            focus:outline-none
          `}
          >
            {isAuth ? <Menu /> : <User />}
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side="right"
          className={`
            transform drop-shadow-mainshadow

            md:mx-4
          `}
        >

          {isAuth
            ? (
                <div>
                  <DropdownMenu.Item>
                    <Link to="admin" onClick={() => setIsMenuOpen(false)}>
                      Редактировать встречи
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className={`
                    my-1 border-t border-slate-300
                  `}
                  />
                  <DropdownMenu.Item>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleLogOff()
                        navigate('/')
                      }}
                      className="w-full"
                    >
                      Выйти
                    </button>
                  </DropdownMenu.Item>
                </div>
              )
            : (
                <Dialog.Trigger>
                  <DropdownMenu.Item>
                    LogIn
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
              -translate-y-1/2 rounded bg-white p-6 shadow-lg
            `}
          >
            <Dialog.Title className="font-medium">Вход в панель для редактирования</Dialog.Title>
            <Flex direction="column" gap="3">
              <label>
                <p className="mb-1 font-bold">Пароль</p>
                <KInput
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </label>

              {error && (
                <p className={`
                  rounded-xl bg-red-100 p-2 text-sm font-medium text-red-500
                  drop-shadow-sm
                `}
                >
                  {error}
                </p>
              )}
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Отменить
                </Button>
              </Dialog.Close>
              <Button onClick={handleLogIn}>Войти</Button>
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
