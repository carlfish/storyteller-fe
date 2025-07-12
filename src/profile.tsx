import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-600">Loading ...</div>
      </div>
    )
  }

  return (
    isAuthenticated &&
    user && (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    )
  )
}

export default Profile
