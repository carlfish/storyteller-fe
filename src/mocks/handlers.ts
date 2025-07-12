import { http, HttpResponse } from 'msw'

interface Story {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  published: boolean
}

export const handlers = [
  // Get all stories
  http.get('/api/stories', () => {
    return HttpResponse.json([
      {
        id: 'fce8c922-c48d-4a95-b094-a3050e0cafb5',
        title: 'My First Story',
        content: 'This is the content of my first story...',
        author: 'John Doe',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        published: true
      },
      {
        id: '2adbd315-0d53-4f5e-86c7-91cbefcb0d02',
        title: 'Draft Story',
        content: 'This is a draft story...',
        author: 'Jane Smith',
        createdAt: '2024-01-16T14:30:00Z',
        updatedAt: '2024-01-16T15:00:00Z',
        published: false
      }
    ])
  }),

  // Get single story
  http.get('/api/stories/:storyId', ({ params }) => {
    const { storyId } = params
    
    return HttpResponse.json({
      id: storyId,
      title: 'Sample Story',
      content: 'This is the content of the story...',
      author: 'Current User',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      published: false
    })
  }),

  // Create new story
  http.post('/api/stories', async ({ request }) => {
    const newStory = await request.json() as Partial<Story>
    
    return HttpResponse.json({
      id: crypto.randomUUID(),
      title: newStory.title || 'Untitled',
      content: newStory.content || '',
      author: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: false
    }, { status: 201 })
  }),

  // Update story
  http.put('/api/stories/:storyId', async ({ params, request }) => {
    const { storyId } = params
    const updates = await request.json() as Partial<Story>
    
    return HttpResponse.json({
      id: storyId as string,
      title: updates.title || 'Untitled',
      content: updates.content || '',
      author: 'Current User',
      createdAt: '2024-01-15T10:00:00Z',
      published: updates.published || false,
      updatedAt: new Date().toISOString()
    })
  }),

  // Delete story
  http.delete('/api/stories/:storyId', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  // Publish story
  http.post('/api/stories/:storyId/publish', ({ params }) => {
    const { storyId } = params
    
    return HttpResponse.json({
      id: storyId,
      published: true,
      publishedAt: new Date().toISOString()
    })
  })
]