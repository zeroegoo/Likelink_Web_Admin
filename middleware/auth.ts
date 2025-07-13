import { getApiBaseUrl } from '~/config/api'
import { StorageService } from '../utility/StorageService'
export default defineNuxtRouteMiddleware(async (to) => {
    const baseURL = getApiBaseUrl()
  if (!process.client) return

  // เช็คว่า auto-login เคยทำไปแล้วหรือยัง (session memory)
  if ((window as any).__autoLoginDone) return

  const userAutoLIRaw = getCookie("UserAutoLI")

  if (!userAutoLIRaw) {
    return navigateTo('/Login')
  }

  try {
    const userAutoLI = JSON.parse(userAutoLIRaw)
    const oneDay = 24 * 60 * 60 * 1000
    const now = Date.now()
    const config = useRuntimeConfig()

    if (now - (userAutoLI.timestamp || 0) > oneDay) {
      // ลบ cookie
      document.cookie = `UserAutoLI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
      StorageService.clear()

      const payload = {
        user_type_id: "4",
        email: userAutoLI.email,
        password: userAutoLI.password,
        fcm_token: userAutoLI.fcm_token,
      }

      const fetchAPI = await import('@/service/fetchAPI')
      const result = await fetchAPI.default.post(`${baseURL}B2BUser/Login`, payload) as { user: any }

      if (result) {
        const updatedUserAutoLI = { ...userAutoLI, timestamp: now }
        const expires = new Date(Date.now() + oneDay).toUTCString()

        document.cookie = `UserAutoLI=${encodeURIComponent(JSON.stringify(updatedUserAutoLI))}; expires=${expires}; path=/`
        StorageService.set("UserDetail", result.user)
      }
    }

    // ✅ ตั้ง flag ว่าทำ auto-login แล้ว
    (window as any).__autoLoginDone = true

  } catch (error) {
    console.error('Auto-login failed:', error)
    document.cookie = `UserAutoLI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    StorageService.clear()
    return navigateTo('/Login')
  }
})

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

