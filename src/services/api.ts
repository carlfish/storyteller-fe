// Real API types based on the OpenAPI spec
export interface Story {
  id: string
  characters: Character[]
  chapters: object[]
  scenes: object[]
  old_messages: Message[]
  current_messages: Message[]
}
export interface Character {
  name: string
  role: string
  bio: string
}

export interface CreateStoryResponse {
  location: string // URL from Location header
}

export interface CommandRequest {
  command: 'chat' | 'retry' | 'rewind' | 'fix' | 'replace' | 'chapter'
  body?: string
}

export interface CommandResponse {
  status: 'success'
  messages: string[]
}

export interface ErrorResponse {
  detail: string
}
export interface Message {
  type: string
  content: string
}

export interface StorySummary {
  id: string
  title: string
  author: string
  summary: string
  createdAt: string
  updatedAt: string
  published: boolean
}

// Get base URL from environment variable
const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
}

export const api = {
  async createStory(): Promise<Story> {
    const response = await fetch(`${getBaseUrl()}/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to create story')
    }

    // Return the full story object from the response body
    return response.json()
  },

  async getStory(id: string): Promise<Story> {
    const response = await fetch(`${getBaseUrl()}/stories/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Story not found')
      }
      throw new Error('Failed to fetch story')
    }
    return response.json()
  },

  async getStories(): Promise<StorySummary[]> {
    const response = await fetch(`${getBaseUrl()}/stories/`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Story not found')
      }
      throw new Error('Failed to fetch story')
    }
    return response.json()
  },

  async executeCommand(storyId: string, command: CommandRequest): Promise<CommandResponse> {
    const response = await fetch(`${getBaseUrl()}/stories/${storyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Story not found')
      }
      throw new Error('Failed to execute command')
    }

    return response.json()
  },
}
