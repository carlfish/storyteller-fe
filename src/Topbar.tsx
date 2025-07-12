import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Topbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleNewStory = () => {
    const storyId = uuidv4();
    navigate(`/stories/${storyId}`);
  };

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
              isActive('/') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`px-3 py-2 rounded transition-colors ${
              isActive('/about') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-blue-600'
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
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button 
              onClick={() => logout()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Log out
            </button>
          </>
        ) : (
          <button 
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;