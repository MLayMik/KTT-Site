import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useRef } from 'react'

export function KDropDownLogIn() {
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="App">
      <Dialog.Root>
        <DropdownMenu.Root>
          {/* Триггер для DropdownMenu */}
          <DropdownMenu.Trigger ref={dropdownTriggerRef}>
            Open
          </DropdownMenu.Trigger>

          <DropdownMenu.Content sideOffset={5}>
            {/* Триггер для Dialog */}
            <Dialog.Trigger asChild>
              <DropdownMenu.Item>Delete</DropdownMenu.Item>
            </Dialog.Trigger>
            <DropdownMenu.Item>Test</DropdownMenu.Item>
            <DropdownMenu.Arrow />
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Контент для Dialog */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content
            className={`
              fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2
              -translate-y-1/2 rounded bg-white p-6 shadow-lg
            `}
            aria-describedby=""
            onCloseAutoFocus={(event) => {
              // Возвращаем фокус на DropdownMenu.Trigger для доступности
              dropdownTriggerRef.current?.focus()
              event.preventDefault()
            }}
          >
            <Dialog.Title>Are you sure?</Dialog.Title>
            <Dialog.Description>This is a dialog example.</Dialog.Description>
            <div className="mt-4 flex justify-end">
              <Dialog.Close asChild>
                <button className="rounded bg-blue-500 px-4 py-2 text-white">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
