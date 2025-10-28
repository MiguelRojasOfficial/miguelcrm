'use client'

import { useEffect, useState } from "react"
import type { UserSettings } from "@/types/settings"
import { getUserSettings, saveUserSettings } from "@/services/settingsService"

export function useUserSettings() {
    const [settings, setSettings] = useState<UserSettings>(getUserSettings())

    useEffect (() => {
        const data = getUserSettings()
        setSettings(data)
    }, [])

    const updateSettings = (data: Partial<UserSettings>) => {
        const updated = { ...settings, ...data }
        setSettings(updated)
        saveUserSettings(updated)
    }

    return { settings, updateSettings }
}