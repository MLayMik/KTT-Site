import { Button, Dialog, DropdownMenu, Flex } from '@radix-ui/themes'
import { Menu, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { KInput } from '../input'
import { ADMIN_PASSWORD } from '../Navbar'

export function KDropdown() {
  const ref = useRef<HTMLButtonElement>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isAuth = localStorage.getItem('isAuth') === 'true'

  const handleLogIn = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAuth', 'true') // Сохранение состояния
      setError('') // Сброс ошибки
      setPassword('')
      ref.current?.click()
      setIsMenuOpen(false) // Закрываем меню
    }
    else {
      setError('Неверный пароль. Попробуйте снова.')
      setPassword('')
    }
  }

  const handleLogOff = () => {
    if (isAuth === true) {
      localStorage.setItem('isAuth', 'false')
      setIsMenuOpen(false) // Закрываем меню
    }
  }

  return (
    <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenu.Trigger>
        <div className="ml-2 flex size-6 items-center justify-center">
          {isAuth ? <Menu /> : <User />}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        variant="soft"
        side="right"
        className={`
          mr-2 drop-shadow-mainshadow

          md:mx-4
        `}
      >
        <div>
          {isAuth
            ? (
                <div>
                  <DropdownMenu.Item>
                    <Link to="admin">
                      Редактировать встречи
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator className="my-1 border-t border-slate-300" />
                  <DropdownMenu.Item>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleLogOff()
                      }}
                      className="w-full"
                    >
                      Выйти
                    </button>
                  </DropdownMenu.Item>
                </div>

              )
            : (
                <Dialog.Root>
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
                  <Dialog.Content maxWidth="450px" aria-describedby="">
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
                          rounded-xl bg-red-100 p-2 text-sm font-medium text-red-500 drop-shadow-sm
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
                </Dialog.Root>
              )}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
