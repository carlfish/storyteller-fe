import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import type { Story as StoryType, Message } from '../services/api'
import { api } from '../services/api'

interface StoryContextType {
  story: StoryType | null
  loading: boolean
  error: string | null
  currentMessages: Message[]
  setCurrentMessages: (messages: Message[]) => void
  handleMessageSubmit: (content: string) => Promise<void>
  refreshStory: () => Promise<void>
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

export const useStory = () => {
  const context = useContext(StoryContext)
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider')
  }
  return context
}

interface StoryProviderProps {
  children: ReactNode
}

export const StoryProvider = ({ children }: StoryProviderProps) => {
  const { storyId } = useParams<{ storyId: string }>()
  const { getAccessTokenSilently, isLoading: authLoading } = useAuth0()
  const [story, setStory] = useState<StoryType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMessages, setCurrentMessages] = useState<Message[]>([])

  const fetchStory = async () => {
    if (!storyId || authLoading) return

    try {
      setLoading(true)
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_SERVER_AUDIENCE,
          scope: "storyteller:use"
        }
      })
      
      const fetchedStory = await api.getStory(storyId, accessToken)
      setStory(fetchedStory)
      setCurrentMessages(fetchedStory.current_messages || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching story:', err)
      if (err instanceof Error && err.message === 'Story not found') {
        setError('Story not found')
      } else {
        setError('Failed to load story')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMessageSubmit = async (content: string) => {
    if (!story) return

    const newMessage: Message = {
      type: 'HumanMessage',
      content,
    }
    setCurrentMessages(prev => [...prev, newMessage])

    const loadingMessage: Message = {
      type: 'AIMessage',
      content: '',
      isLoading: true
    }
    setCurrentMessages(prev => [...prev, loadingMessage])

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_SERVER_AUDIENCE,
          scope: "storyteller:use"
        }
      })
      
      const response = await api.executeCommand(story.id, {
        command: 'chat',
        body: content
      }, accessToken)
      
      setCurrentMessages(prev => prev.slice(0, -1))
      
      const aiMessages: Message[] = response.messages.map(messageContent => ({
        type: 'AIMessage',
        content: messageContent
      }))
      
      setCurrentMessages(prev => [...prev, ...aiMessages])

      // Refresh story data to get updated characters/chapters
      await fetchStory()
    } catch (error) {
      console.error('Failed to send message:', error)
      setCurrentMessages(prev => prev.slice(0, -1))
    }
  }

  const refreshStory = async () => {
    await fetchStory()
  }

  useEffect(() => {
    fetchStory()
  }, [storyId, authLoading])

  const value: StoryContextType = {
    story,
    loading,
    error,
    currentMessages,
    setCurrentMessages,
    handleMessageSubmit,
    refreshStory
  }

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
}