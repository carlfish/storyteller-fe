import { http, HttpResponse } from 'msw'
import type { Story, StorySummary, CommandRequest, CommandResponse } from '../services/api'
import mockStoryData from './mockStory.json'

// Get base URL to match API calls
const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
}

export const handlers = [
  // Create new story - matches POST /stories
  http.post(`${getBaseUrl()}/stories`, async () => {
    // Generate a UUID for the new story
    const storyId = crypto.randomUUID()

    // Create empty story object matching the real API schema
    const story: Story = {
      id: storyId,
      characters: [],
      chapters: [],
      scenes: [],
      old_messages: [],
      current_messages: [],
    }

    // Return 201 with both Location header and Story object
    return HttpResponse.json(story, {
      status: 201,
      headers: {
        Location: `/stories/${storyId}`,
      },
    })
  }),

  // Get single story - matches GET /stories/{story_uuid}
  http.get(`${getBaseUrl()}/stories/:storyId`, ({ params }) => {
    const { storyId } = params

    // Load story data from JSON file and update the ID to match the request
    const story: Story = {
      ...mockStoryData,
      id: storyId as string,
    }

    return HttpResponse.json(story)
  }),

  // Get stories - matches GET /stories/
  http.get(`${getBaseUrl()}/stories/`, () => {
    const stories: StorySummary[] = [
      {
        id: '304f17a5-571b-4bd9-9827-2245d96685f5',
        title: 'The Beginning',
        author: 'John Doe',
        summary: 'Our heroes meet and begin their quest',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        published: false,
      },
      {
        id: '8bd438f1-9410-4a2d-a9e5-00ebd21a2075',
        title: 'The Middle',
        author: 'Jane Doe',
        summary: 'Our heroes continue their quest',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        published: false,
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'The End',
        author: 'John Doe',
        summary: 'Our heroes reach the end of their quest',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        published: false,
      },
    ]

    return HttpResponse.json(stories)
  }),

  // Execute command on story - matches POST /stories/{story_uuid}
  http.post(`${getBaseUrl()}/stories/:storyId`, async ({ request }) => {
    const command = (await request.json()) as CommandRequest

    // Add 5s delay to see loading state
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Mock command response
    const response: CommandResponse = {
      status: 'success',
      messages: [`Command '${command.command}' executed successfully`, 'The story continues...'],
    }

    return HttpResponse.json(response)
  }),
]
