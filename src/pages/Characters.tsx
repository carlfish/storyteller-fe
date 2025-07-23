import type { Character } from '../services/api'
import StoryTopbar from '../components/StoryTopbar'
import { useStory } from '../contexts/StoryContext'

const Characters = () => {
  const { story, loading, error } = useStory()

  if (loading) {
    return (
      <div>
        <StoryTopbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading characters...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StoryTopbar />
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="text-red-600 text-xl mb-4">{error}</div>
            <p className="text-gray-600">Please check the URL and try again.</p>
          </div>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div>
        <StoryTopbar />
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <div className="text-gray-600">Story not found</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <StoryTopbar />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Characters</h1>
          
          {/* Floating Character Navigation */}
          {story.characters && story.characters.length > 3 && (
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 -mx-6 px-6 py-3 mb-6">
              <div className="flex flex-wrap gap-2">
                {story.characters.map((character: Character, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.getElementById(`character-${index}`)
                      if (element) {
                        const yOffset = -80 // Offset for the floating bar height
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                        window.scrollTo({ top: y, behavior: 'smooth' })
                      }
                    }}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    {character.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {story.characters && story.characters.length > 0 ? (
            <div className="space-y-6">
              {story.characters.map((character: Character, index: number) => (
                <div
                  key={index}
                  id={`character-${index}`}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {character.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{character.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{character.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{character.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="mi-people text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Characters Yet</h3>
              <p className="text-gray-500">
                Characters will appear here as your story develops.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Characters