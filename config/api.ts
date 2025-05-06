export function getApiBaseUrl() {
    const config = useRuntimeConfig()
    return config.public.apiBaseUrl
}