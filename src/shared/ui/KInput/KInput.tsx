import { forwardRef } from 'react'

interface Props {
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  error?: string
  disabled?: boolean
}

export const KInput = forwardRef<HTMLInputElement, Props>((
  {
    type,
    onChange,
    value,
    label,
    error,
    disabled,
  }: Props,
  ref,
) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        disabled={disabled}
        ref={ref}
        className={`
          my-1 w-full rounded-lg border border-blue-200 bg-white p-1 shadow-sm transition
          duration-200 ease-in-out

          dark:border-gray-700 dark:bg-dark-bg dark:text-gray-300

          disabled:opacity-50

          focus:outline-none focus:ring-1 focus:ring-blue-300

          hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm
        `}
        type={type}
        value={value}
        onChange={onChange}
      >
      </input>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  )
})
