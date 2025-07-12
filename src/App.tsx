import reactLogo from './assets/react.svg'
import Topbar from './Topbar'

function App() {

return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center gap-8 mb-8">
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin" alt="React logo" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
