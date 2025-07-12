export interface Story {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  published: boolean
}

export const api = {
  async getStories(): Promise<Story[]> {
    const response = await fetch('/api/stories')
    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }
    return response.json()
  },

  async getStory(id: string): Promise<Story> {
    const response = await fetch(`/api/stories/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch story')
    }
    return response.json()
  },

  async createStory(story: Partial<Story>): Promise<Story> {
    const response = await fetch('/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    })
    if (!response.ok) {
      throw new Error('Failed to create story')
    }
    return response.json()
  },

  async updateStory(id: string, story: Partial<Story>): Promise<Story> {
    const response = await fetch(`/api/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    })
    if (!response.ok) {
      throw new Error('Failed to update story')
    }
    return response.json()
  },

  async deleteStory(id: string): Promise<void> {
    const response = await fetch(`/api/stories/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete story')
    }
  },

  async publishStory(id: string): Promise<Story> {
    const response = await fetch(`/api/stories/${id}/publish`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to publish story')
    }
    return response.json()
  },
}