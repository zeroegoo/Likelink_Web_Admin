// middleware/auth-redirect.ts
import { StorageService } from '../utility/StorageService'
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const user = StorageService.get('UserDetail')
    if (user) {
      return navigateTo('/')
    }
  }
})
