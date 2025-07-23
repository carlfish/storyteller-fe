import { withAuthenticationRequired } from '@auth0/auth0-react'
import type { ReactElement } from 'react'

interface ProtectedRouteProps {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return children
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Redirecting to login...</p>
    </div>
  </div>
)

const WrappedProtectedRoute = withAuthenticationRequired(ProtectedRoute, {
  onRedirecting: LoadingSpinner,
})

export default WrappedProtectedRoute
