import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import { api } from '../services/api'
import type { Story } from '../services/api'

const Home = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = await api.getStories()
        setStories(fetchedStories)
      } catch (err) {
        setError('Failed to load stories')
        console.error('Error fetching stories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto px-4">            
      {/* Stories List */}
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Stories</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Loading stories...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-red-600">{error}</div>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-600">No stories yet. Create your first story!</div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {story.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    story.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {story.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {story.content}
                </p>
                
                <div className="text-xs text-gray-500">
                  <div>By {story.author}</div>
                  <div>Updated {formatDate(story.updatedAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home