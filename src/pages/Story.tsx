import MessageHistory from '../components/MessageHistory'
import StoryTopbar from '../components/StoryTopbar'
import { useStory } from '../hooks/useStory'

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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{story.title}</h1>
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
