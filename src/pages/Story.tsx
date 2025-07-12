import { useLoaderData } from 'react-router-dom'
import type { Story as StoryType, Message, Character } from '../services/api'

interface StoryLoaderData {
  story: StoryType
}

const Story = () => {
  const { story } = useLoaderData() as StoryLoaderData

  const formatMessage = (message: Message, index: number) => {
    const isUserMessage = message.type === 'HumanMessage'

    return (
      <div key={index} className={`flex mb-4 ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-lg px-4 py-3 ${
            isUserMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          {!isUserMessage && (
            <div className="text-xs text-gray-500 mt-2 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              AI Storyteller
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Story Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Untitled Story</h1>
            <p className="text-gray-600 text-sm">Story ID: {story.id}</p>
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

      {/* Chat Messages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            Current Story
          </h2>

          <div className="space-y-0 min-h-[400px]">
            {story.current_messages && story.current_messages.length > 0 ? (
              story.current_messages.map((message: Message, index: number) =>
                formatMessage(message, index)
              )
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-lg mb-2">No messages yet</div>
                <div className="text-sm">The story is waiting to begin...</div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="What do you do next?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Send
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
              Retry
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
              Rewind
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
              New Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story
