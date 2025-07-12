import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import type { Story as StoryType, Character, Message } from '../services/api'
import MessageHistory from '../components/MessageHistory'

interface StoryLoaderData {
  story: StoryType
}

const Story = () => {
  const { story } = useLoaderData() as StoryLoaderData
  const [currentMessages, setCurrentMessages] = useState<Message[]>(story.current_messages || [])

  const handleMessageSubmit = (content: string) => {
    const newMessage: Message = {
      type: 'HumanMessage',
      content
    }
    setCurrentMessages(prev => [...prev, newMessage])
  }

  return (
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
  )
}

export default Story
