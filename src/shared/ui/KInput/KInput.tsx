import { cn } from '@/shared/lib/styles'
import { forwardRef } from 'react'

interface Props {
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  error?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

export const KInput = forwardRef<HTMLInputElement, Props>((
  {
    type,
    onChange,
    value,
    label,
    error,
    disabled,
    placeholder,
    className,
  }: Props,
  ref,
) => {
  return (
    <div className="flex flex-col">
      <label className="block font-medium">{label}</label>
      <input
        data-testid="input-value"
        disabled={disabled}
        ref={ref}
        className={cn(`
          my-1 w-full rounded-lg border border-blue-200 bg-white p-1 shadow-sm
          transition duration-200 ease-in-out

          dark:border-gray-700 dark:bg-dark-bg dark:text-gray-300

          disabled:opacity-50

          focus:outline-none focus:ring-1 focus:ring-blue-300

          hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm
        `, type === 'time' && `
          mt-1 rounded-lg border border-gray-300 p-2 text-sm font-medium
          shadow-sm transition-all duration-200 ease-in-out

          dark:border-gray-600 dark:bg-dark-bg
          dark:text-gray-200dark:focus:ring-blue-500

          focus:border-blue-500 focus:outline-none focus:ring-2
          focus:ring-blue-200
        `, className)}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      >
      </input>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  )
})
