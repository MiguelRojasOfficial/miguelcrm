import type { UserSettings } from "@/types/settings"

export const defaultSettings: UserSettings = {
    nombre: 'Usuario CRM',
    correo: 'usuario@empresa.com',
    imagen: '',
    tema: 'light',
}
export const getUserSettings = (): UserSettings => {
    if (typeof window === 'undefined') return defaultSettings
    const stored = localStorage.getItem('userSettings')
    return stored ? JSON.parse(stored) :defaultSettings
}

export const saveUserSettings = (settings: UserSettings) => {
    localStorage.setItem('userSettings', JSON.stringify(settings))
}
