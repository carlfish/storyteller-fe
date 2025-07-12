import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <Outlet />
    </div>
  )
}

export default App
