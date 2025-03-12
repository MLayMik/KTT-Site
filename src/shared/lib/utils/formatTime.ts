export function formatTime(date: Date) {
  return date.toLocaleString('ru', { hour: 'numeric', minute: 'numeric' })
}
