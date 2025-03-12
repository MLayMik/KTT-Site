import { cn } from '@/shared/lib/styles'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { Switch } from 'radix-ui'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

type Theme = 'light' | 'dark'

export function KThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])

  const [enabled, setEnabled] = useState<boolean>(theme === 'light')

  const handleThemeChange = (enabled: boolean) => {
    setTheme(enabled ? 'light' : 'dark')
    setEnabled(enabled)
  }

  return (
    <Switch.Root>

      <Switch.Thumb
        onClick={() => handleThemeChange(!enabled)}
        className={cn(
          `
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer
            rounded-full border-2 border-transparent bg-blue-300
            transition-colors duration-200 ease-in-out

            dark:bg-dark-primary
          `,
        )}
      >
        <span
          className={cn(
            `
              pointer-events-none relative inline-block h-5 w-5 transform
              rounded-full bg-white shadow ring-0 transition duration-200
              ease-in-out

              dark:bg-slate-700
            `,
            enabled ? 'translate-x-0' : 'translate-x-5',
          )}
        >
          <span
            className={cn(
              `
                absolute inset-0 flex h-full w-full items-center justify-center
                transition-opacity
              `,
              enabled
                ? 'duration-200 ease-in'
                : 'duration-100 ease-out',
            )}
            aria-hidden="true"
          >
            {
              enabled
                ? <SunIcon className="h-3 w-3 text-dark-primary" />
                : <MoonIcon className="h-3 w-3 text-white" />
            }
          </span>
        </span>
      </Switch.Thumb>
    </Switch.Root>
  )
}
