import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import type { Story as StoryType } from '../services/api'

interface StoryLoaderData {
  story: StoryType
}

const Story = () => {
  const { story } = useLoaderData() as StoryLoaderData
  const [title, setTitle] = useState(story.title)
  const [content, setContent] = useState(story.content)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    const hasChanges = title !== story.title || content !== story.content
    setIsModified(hasChanges)
  }, [title, content, story.title, story.content])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">Edit Story</h1>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  story.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {story.published ? 'Published' : 'Draft'}
                </span>
                {isModified && (
                  <span className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                    Modified
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 space-y-1">
              <p>Story ID: {story.id}</p>
              <p>Author: {story.author}</p>
              <p>Created: {formatDate(story.createdAt)}</p>
              <p>Last updated: {formatDate(story.updatedAt)}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your story title..."
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start writing your story..."
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <button 
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={!isModified}
              >
                Save Draft
              </button>
              <button 
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                disabled={!story.published && (!title.trim() || !content.trim())}
              >
                {story.published ? 'Update & Publish' : 'Publish'}
              </button>
              <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                Preview
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Story