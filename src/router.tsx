import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Story from './pages/Story'
import { api } from './services/api'

// Loader for individual story
export async function storyLoader({ params }: LoaderFunctionArgs) {
  const { storyId } = params
  if (!storyId) {
    throw new Error('Story ID is required')
  }

  try {
    const story = await api.getStory(storyId)
    return { story }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Story not found') {
        throw new Response('Story not found', { status: 404 })
      } else {
        throw new Response(error.message, { status: 500 })
      }
    }
  }
}

export const router = createBrowserRouter([
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
        element: <Dashboard />,
      },
      {
        path: 'stories/:storyId',
        element: <Story />,
        loader: storyLoader,
      },
    ],
  },
])
