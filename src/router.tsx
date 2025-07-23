import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Story from './pages/Story'
import Characters from './pages/Characters'
import Chapters from './pages/Chapters'
import ProtectedRoute from './components/ProtectedRoute'
import StoryLayout from './components/StoryLayout'

export function initRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: 'stories/:storyId',
          element: (
            <ProtectedRoute>
              <StoryLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Story />,
            },
            {
              path: 'characters',
              element: <Characters />,
            },
            {
              path: 'chapters',
              element: <Chapters />,
            },
          ],
        },
      ],
    },
  ])
}
