import * as Dialog from '@radix-ui/react-dialog'
import { Button, Flex } from '@radix-ui/themes'
import { useRef, useState } from 'react'
import { KInput } from '../KInput'
import { ADMIN_PASSWORD } from '../KNavbar'

export function KLogInModal() {
  const ref = useRef<HTMLButtonElement>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogIn = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAuth', 'true')
      setError('')
      setPassword('')
      ref.current?.click()
      location.reload()
    }
    else {
      setError('Неверный пароль. Попробуйте снова.')
      setPassword('')
    }
  }

  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        onCloseAutoFocus={(event) => {
          // Возвращаем фокус на DropdownMenu.Trigger для доступности
          dropdownTriggerRef.current?.focus()
          event.preventDefault()
        }}
        className={`
          fixed left-1/2 top-1/2 mx-2 w-full max-w-sm -translate-x-1/2
          -translate-y-1/2 rounded-lg bg-white p-6 text-slate-900 shadow-lg

          dark:bg-slate-800 dark:text-slate-200

          sm:mx-0
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
                mt-2 rounded-md bg-red-100 p-1 text-sm font-medium text-red-600
                drop-shadow-sm

                dark:bg-red-700 dark:bg-opacity-80 dark:text-red-300
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

                dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-800

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
  )
}
