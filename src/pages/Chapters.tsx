import StoryTopbar from '../components/StoryTopbar'
import { useStory } from '../contexts/StoryContext'

const Chapters = () => {
  const { story, loading, error } = useStory()

  if (loading) {
    return (
      <div>
        <StoryTopbar />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chapters...</p>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Chapters</h1>
          
          {story.chapters && story.chapters.length > 0 ? (
            <div className="space-y-4">
              {story.chapters.map((chapter: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {chapter.title || `Chapter ${index + 1}`}
                    </h3>
                  </div>
                  {chapter.summary && (
                    <p className="text-gray-600 text-sm leading-relaxed ml-11">
                      {chapter.summary}
                    </p>
                  )}
                  {chapter.content && (
                    <p className="text-gray-600 text-sm leading-relaxed ml-11 mt-2">
                      {chapter.content.length > 200 
                        ? `${chapter.content.substring(0, 200)}...`
                        : chapter.content
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="mi-list text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Chapters Yet</h3>
              <p className="text-gray-500">
                Chapters will appear here as your story progresses.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chapters