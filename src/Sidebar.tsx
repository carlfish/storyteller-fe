import { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from './services/api'
import 'mono-icons/iconfont/icons.css'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: (collapsed: boolean) => void
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0()
  const location = useLocation()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => location.pathname === path

  const handleNewStory = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_SERVER_AUDIENCE,
          scope: 'storyteller:use',
        },
      })

      const story = await api.createStory(accessToken)
      navigate(`/stories/${story.story_id}`)
    } catch (error) {
      console.error('Failed to create story:', error)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleSidebar = () => {
    onToggle(!isCollapsed)
  }

  const handleAuth = () => {
    if (isAuthenticated) {
      logout()
    } else {
      loginWithRedirect()
    }
    setIsDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isDropdownOpen])

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-300 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
      >
        <i className={`mi-chevron-${isCollapsed ? 'right' : 'left'} text-gray-600`} />
      </button>

      <div className="flex flex-col h-full p-4">
        {/* Brand */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold hover:text-blue-600 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <i className="mi-book text-lg" />
            </div>
            {!isCollapsed && <span>Storyteller</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mb-8 flex-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-3 rounded transition-colors ${
              isActive('/')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
            title={isCollapsed ? 'Home' : ''}
          >
            <i className="mi-home text-lg" />
            {!isCollapsed && <span>Home</span>}
          </Link>

          <Link
            to="/about"
            className={`flex items-center gap-3 px-3 py-3 rounded transition-colors ${
              isActive('/about')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
            title={isCollapsed ? 'About' : ''}
          >
            <i className="mi-info text-lg" />
            {!isCollapsed && <span>About</span>}
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-3 rounded transition-colors ${
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              title={isCollapsed ? 'Dashboard' : ''}
            >
              <i className="mi-dashboard text-lg" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={handleNewStory}
              className="flex items-center gap-3 px-3 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors mt-4"
              title={isCollapsed ? 'New Story' : ''}
            >
              <i className="mi-plus text-lg" />
              {!isCollapsed && <span>New Story</span>}
            </button>
          )}
        </nav>

        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={`flex items-center gap-3 w-full p-3 rounded hover:bg-gray-50 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? (isAuthenticated ? user?.name || 'Profile' : 'Login') : ''}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-400 transition-colors">
              {isAuthenticated && user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <i className="mi-user" />
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 text-left">
                {isAuthenticated && user ? (
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Not logged in</p>
                )}
              </div>
            )}
            {!isCollapsed && <i className="mi-chevron-up text-gray-400" />}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className={`absolute ${isCollapsed ? 'left-16 bottom-0' : 'right-0 bottom-16'} w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50`}
            >
              <div className="py-1">
                {isAuthenticated && user && isCollapsed && (
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                )}
                <button
                  onClick={handleAuth}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {isAuthenticated ? 'Log out' : 'Log in'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
