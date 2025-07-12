import { useAuth0 } from '@auth0/auth0-react'

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back!</h2>
            <p className="text-gray-600 mb-4">Hello, {user?.name || 'User'}!</p>
            <p className="text-sm text-gray-500">Last login: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Stories Created:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Views:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent activity to show.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
