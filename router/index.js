import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/index.vue'
import EmergencyAlert from '~/pages/EmergencyAlert.vue'
import History from '~/pages/History.vue'
import { StorageService } from '../utility/StorageService'
// import หน้าอื่น ๆ ที่ใช้

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        name: 'EmergencyAlert',
        component: EmergencyAlert,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        name: 'History',
        component: History,
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!StorageService.get<UserType>("UserDetail")
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' }) // ❌ ยังไม่ได้ล็อกอิน ให้กลับไปหน้า Login
    } else if (to.name === 'Login' && isAuthenticated) {
        next({ name: 'Home' }) // ✅ ถ้าล็อกอินแล้วไปหน้า Login ให้ redirect ไปหน้าแรก
    } else {
        next()
    }
})

export default router
