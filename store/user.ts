import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null as string | null,
    taskId: null as string | null
  }),
  actions: {
    setUser(userId: string, taskId: string) {
      this.userId = userId
      this.taskId = taskId
    }
  },
  persist: true
})
