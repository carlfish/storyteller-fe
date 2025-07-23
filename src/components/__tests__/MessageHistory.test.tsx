import { describe, test, expect } from 'bun:test'
import { render, screen, fireEvent } from '@testing-library/react'
import MessageHistory from '../MessageHistory'
import type { Message } from '../../services/api'

const mockMessages: Message[] = [
  { type: 'HumanMessage', content: 'Hello, I want to start a story.' },
  { type: 'AIMessage', content: 'Welcome! Let me create an adventure for you.' },
  { type: 'HumanMessage', content: 'I choose to explore the forest.' },
  { type: 'AIMessage', content: 'You venture into the mysterious forest...' },
]

describe('MessageHistory', () => {
  test('renders empty state when no messages', () => {
    render(<MessageHistory oldMessages={[]} currentMessages={[]} />)

    expect(screen.getByText('No messages yet')).toBeInTheDocument()
    expect(screen.getByText('The story is waiting to begin...')).toBeInTheDocument()
  })

  test('displays messages correctly', () => {
    render(<MessageHistory oldMessages={mockMessages} currentMessages={[]} />)

    expect(screen.getByText('Hello, I want to start a story.')).toBeInTheDocument()
    expect(screen.getByText('Welcome! Let me create an adventure for you.')).toBeInTheDocument()
  })

  test('calls onMessageSubmit when form is submitted', () => {
    let submittedMessage = ''
    const handleSubmit = (message: string) => {
      submittedMessage = message
    }

    const { container } = render(
      <MessageHistory oldMessages={[]} currentMessages={[]} onMessageSubmit={handleSubmit} />
    )

    const input = container.querySelector('input[type="text"]') as HTMLInputElement
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement

    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.click(submitButton)

    expect(submittedMessage).toBe('Test message')
  })

  test('submit button is disabled when input is empty', () => {
    const { container } = render(<MessageHistory oldMessages={[]} currentMessages={[]} />)

    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement
    expect(submitButton).toBeDisabled()
  })

  test('submit button is enabled when input has value', () => {
    const { container } = render(<MessageHistory oldMessages={[]} currentMessages={[]} />)

    const input = container.querySelector('input[type="text"]') as HTMLInputElement
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement

    fireEvent.change(input, { target: { value: 'Test' } })
    expect(submitButton).not.toBeDisabled()
  })
})
