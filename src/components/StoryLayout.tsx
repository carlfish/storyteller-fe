import { Outlet } from 'react-router-dom'
import { StoryProvider } from '../contexts/StoryContext'

const StoryLayout = () => {
  return (
    <StoryProvider>
      <Outlet />
    </StoryProvider>
  )
}

export default StoryLayout
