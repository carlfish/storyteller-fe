import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { api } from '../services/api'
import type { StorySummary } from '../services/api'

const Home = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0()
  const [stories, setStories] = useState<StorySummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      setLoading(false)
      return
    }

    if (isAuthenticated) {
      const fetchStories = async () => {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_SERVER_AUDIENCE,
              scope: 'storyteller:use',
            },
          })
          const fetchedStories = await api.getStories(accessToken)
          setStories(fetchedStories)
        } catch (err) {
          setError('Failed to load stories')
          console.error('Error fetching stories:', err)
        } finally {
          setLoading(false)
        }
      }

      fetchStories()
    }
  }, [isAuthenticated, authLoading, getAccessTokenSilently])

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString()
  }

  const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Storyteller</h1>
          <p className="text-xl text-gray-600 mb-8">
            Create and explore interactive stories with AI assistance
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Login to Get Started
          </button>
        </div>
      </div>
    )
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
            {stories.map(story => (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200 hover:border-blue-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{story.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <i className="mi-people text-blue-500" />
                      {story.characters} characters
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="mi-list text-green-500" />
                      {story.chapters} chapters
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <div>Created {formatDate(story.created)}</div>
                  <div>Updated {formatRelativeTime(story.last_modified)}</div>
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
