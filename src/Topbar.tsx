import { useState, useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from './services/api'
import 'mono-icons/iconfont/icons.css'

const Topbar = () => {
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

      // Call the real create story API
      const story = await api.createStory(accessToken)

      // Navigate to the story using the returned ID
      navigate(`/stories/${story.id}`)
    } catch (error) {
      console.error('Failed to create story:', error)
      // TODO: Show user-friendly error message
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleAuth = () => {
    if (isAuthenticated) {
      logout()
    } else {
      loginWithRedirect()
    }
    setIsDropdownOpen(false)
  }

  // Close dropdown on outside click or ESC key
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
    <div className="flex justify-between items-center p-4 border-b border-gray-300 mb-8">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold hover:text-blue-600 transition-colors">
          Storyteller
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded transition-colors ${
              isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`px-3 py-2 rounded transition-colors ${
              isActive('/about') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded transition-colors ${
                isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>
        {isAuthenticated && (
          <button
            onClick={handleNewStory}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            New Story
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-400 transition-colors focus:outline-none focus:border-blue-500"
          >
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
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                {isAuthenticated && user && (
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

export default Topbar
