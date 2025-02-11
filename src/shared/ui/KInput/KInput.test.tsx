import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { KInput } from './KInput'

describe('input', () => {
  it('render with label and placholder', () => {
    render(<KInput label="Input label" placeholder="Input placeholder" />)

    expect(screen.getByText('Input label')).toBeInTheDocument()

    expect(screen.getByPlaceholderText('Input placeholder')).toBeInTheDocument()
  })

  it('calls onChange when input value changes', async () => {
    const mockOnChange = vi.fn()

    render(<KInput onChange={mockOnChange} />)

    const input = screen.getByTestId('input-value')

    await userEvent.type(input, 'Hello')

    expect(mockOnChange).toBeCalledTimes(5)
    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'Hello' }),
    }))
  })

  it('disable input by prop', () => {
    render(<KInput disabled={true} />)

    expect(screen.getByTestId('input-value')).toBeDisabled()
  })

  it('display error by prop', () => {
    render(<KInput error="error test" />)

    expect(screen.getByText('error test')).toBeInTheDocument()
  })
})
