// https://nuxt.com/docs/api/configuration/nuxt-config
import { config as loadEnv } from 'dotenv'
import tailwindcss from '@tailwindcss/vite'

// Custom environment flag
const envFile = `.env.${process.env.APP_ENV || 'dev'}`
loadEnv({ path: envFile })

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL_LIFELINK || "",
    },
  },
  css: [
    '~/assets/css/main.css',
    'leaflet/dist/leaflet.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
