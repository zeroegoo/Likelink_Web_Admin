// StorageService.ts

export const StorageService = {
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err)
    }
  },

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch (err) {
      console.error(`Error reading ${key} from localStorage:`, err)
      return null
    }
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },
}
