import { worker } from './mocks/browser'

export async function enableMocking() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: 'warn',
    })
  }
}