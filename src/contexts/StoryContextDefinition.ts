import { createContext } from 'react'
import type { Story as StoryType, Message } from '../services/api'

export interface StoryContextType {
  story: StoryType | null
  loading: boolean
  error: string | null
  currentMessages: Message[]
  setCurrentMessages: (messages: Message[]) => void
  handleMessageSubmit: (content: string) => Promise<void>
  refreshStory: () => Promise<void>
}

export const StoryContext = createContext<StoryContextType | undefined>(undefined)
