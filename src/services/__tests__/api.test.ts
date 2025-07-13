import { describe, test, expect, beforeEach } from 'bun:test';
import { api } from '../api';

// Mock fetch
const mockFetch = (response: any, status = 200) => {
  global.fetch = async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => response,
  }) as any;
};

describe('api', () => {
  beforeEach(() => {
    // Reset fetch mock
    global.fetch = undefined as any;
  });

  describe('createStory', () => {
    test('creates a story successfully', async () => {
      const mockStory = {
        id: 'story-123',
        characters: [],
        chapters: [],
        scenes: [],
        old_messages: [],
        current_messages: []
      };

      mockFetch(mockStory, 200);

      const result = await api.createStory();
      expect(result).toEqual(mockStory);
    });

    test('throws error when creation fails', async () => {
      mockFetch({ detail: 'Server error' }, 500);

      expect(api.createStory()).rejects.toThrow('Failed to create story');
    });
  });

  describe('getStory', () => {
    test('fetches a story successfully', async () => {
      const mockStory = {
        id: 'story-123',
        characters: [],
        chapters: [],
        scenes: [],
        old_messages: [],
        current_messages: []
      };

      mockFetch(mockStory, 200);

      const result = await api.getStory('story-123');
      expect(result).toEqual(mockStory);
    });

    test('throws "Story not found" for 404', async () => {
      mockFetch({ detail: 'Not found' }, 404);

      expect(api.getStory('nonexistent')).rejects.toThrow('Story not found');
    });

    test('throws generic error for other failures', async () => {
      mockFetch({ detail: 'Server error' }, 500);

      expect(api.getStory('story-123')).rejects.toThrow('Failed to fetch story');
    });
  });

  describe('executeCommand', () => {
    test('executes command successfully', async () => {
      const mockResponse = {
        status: 'success' as const,
        messages: ['Command executed successfully']
      };

      mockFetch(mockResponse, 200);

      const result = await api.executeCommand('story-123', {
        command: 'chat',
        body: 'Hello'
      });

      expect(result).toEqual(mockResponse);
    });

    test('throws error for failed command', async () => {
      mockFetch({ detail: 'Invalid command' }, 400);

      expect(api.executeCommand('story-123', { command: 'chat' }))
        .rejects.toThrow('Failed to execute command');
    });
  });
});