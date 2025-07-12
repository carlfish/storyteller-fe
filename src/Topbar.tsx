import { useAuth0 } from "@auth0/auth0-react";

const Topbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 mb-8">
      <h1 className="text-2xl font-bold">Storyteller</h1>
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button 
              onClick={() => logout()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Log out
            </button>
          </>
        ) : (
          <button 
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Topbar;