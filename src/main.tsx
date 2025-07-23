import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import { enableMocking } from './setupMocks'
import { initRouter } from './router'

enableMocking().then(() => {
  const router = initRouter()
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_SERVER_AUDIENCE,
          scope: 'openid profile email storyteller:use',
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>
  )
})
