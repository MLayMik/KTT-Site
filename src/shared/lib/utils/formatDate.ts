interface optionsProps {
  showYear?: boolean
  numericMonth?: boolean
}

export function formatDate(date: Date, options?: optionsProps) {
  return date.toLocaleString(
    'ru',
    {
      day: 'numeric',
      month: options?.numericMonth ? 'numeric' : 'long',
      year: options?.showYear ? 'numeric' : undefined,
    },
  )
}
