import type { DateValue } from 'react-aria-components'
import { useCurrentTheme } from '@/shared/lib/utils'
import {
  darkTheme,
  DatePicker,
  lightTheme,
  Provider,
} from '@adobe/react-spectrum'

import { forwardRef } from 'react'

export interface Props {
  value: DateValue | undefined
  onChange: (value: DateValue | null) => void
}

export const KDataPicker = forwardRef<HTMLDivElement, Props>((
  { onChange, value }: Props,
  ref,
) => {
  const isDarkMode = useCurrentTheme()

  return (
    <Provider
      // @ts-expect-error types error
      ref={ref}
      theme={isDarkMode ? darkTheme : lightTheme}
      colorScheme="light"
      UNSAFE_className="dark:bg-dark-primary"
    >
      <DatePicker
        value={value}
        aria-label="Select a date"
        onChange={onChange}
        UNSAFE_className="
        bg-white dark:bg-dark-primary text-black dark:text-white
        "
      />
    </Provider>
  )
})
