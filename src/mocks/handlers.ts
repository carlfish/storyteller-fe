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
      title: "Untitled",
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
        title: 'The Magic Kingdom Adventure',
        characters: 4,
        chapters: 3,
        created: '2024-01-15T10:00:00Z',
        last_modified: '2024-01-18T14:30:00Z',
      },
      {
        id: '8bd438f1-9410-4a2d-a9e5-00ebd21a2075',
        title: 'Space Pirates Saga',
        characters: 6,
        chapters: 5,
        created: '2024-01-10T08:15:00Z',
        last_modified: '2024-01-20T16:45:00Z',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Mystery of the Lost City',
        characters: 3,
        chapters: 2,
        created: '2024-01-05T12:30:00Z',
        last_modified: '2024-01-22T09:15:00Z',
      },
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        title: 'Dragon\'s Quest',
        characters: 8,
        chapters: 7,
        created: '2024-01-01T00:00:00Z',
        last_modified: '2024-01-23T11:20:00Z',
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
