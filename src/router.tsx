import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Story from './pages/Story'
import ProtectedRoute from './components/ProtectedRoute'

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
              <Story />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ])
}
