import { Link, useLocation, useParams } from 'react-router-dom'
import 'mono-icons/iconfont/icons.css'

const StoryTopbar = () => {
  const location = useLocation()
  const { storyId } = useParams<{ storyId: string }>()

  const isActive = (path: string) => location.pathname === path

  const getTabPath = (tab: string) => {
    if (tab === 'story') return `/stories/${storyId}`
    return `/stories/${storyId}/${tab}`
  }

  return (
    <div className="bg-white border-b border-gray-200 mb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav className="flex gap-6">
          <Link
            to={getTabPath('story')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              isActive(`/stories/${storyId}`)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            <i className="mi-book text-lg" />
            <span>Story</span>
          </Link>
          
          <Link
            to={getTabPath('characters')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              isActive(`/stories/${storyId}/characters`)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            <i className="mi-people text-lg" />
            <span>Characters</span>
          </Link>
          
          <Link
            to={getTabPath('chapters')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              isActive(`/stories/${storyId}/chapters`)
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
            }`}
          >
            <i className="mi-list text-lg" />
            <span>Chapters</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default StoryTopbar