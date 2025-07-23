import type { Character } from '../services/api'
import MessageHistory from '../components/MessageHistory'
import StoryTopbar from '../components/StoryTopbar'
import { useStory } from '../contexts/StoryContext'

const Story = () => {
  const { story, loading, error, currentMessages, handleMessageSubmit } = useStory()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading story...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center py-12">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <p className="text-gray-600">Please check the URL and try again.</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center py-12">
          <div className="text-gray-600">Story not found</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <StoryTopbar />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Story Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Untitled Story</h1>
          </div>
          <div className="text-sm text-gray-500 text-right">
            <div>{story.characters?.length || 0} characters</div>
            <div>{story.chapters?.length || 0} chapters</div>
          </div>
        </div>

        {/* Characters */}
        {story.characters && story.characters.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Characters:</h3>
            <div className="flex flex-wrap gap-2">
              {story.characters.map((character: Character, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                >
                  {character.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

        {/* Message History Component */}
        <MessageHistory
          oldMessages={story.old_messages || []}
          currentMessages={currentMessages}
          onMessageSubmit={handleMessageSubmit}
        />
      </div>
    </div>
  )
}

export default Story
