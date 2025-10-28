'use client'

import type { UserSettings } from "@types/settings"

interface Props {
    settings: UserSettings
    onChange: (updated: UserSettings) => void
}

export default function PreferencesCard({ settings, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        onChange({ ...settings, [name]: value })
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ajustes Básico</h2>
            <div className="flex items-center justify-between grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tema</label>
                    <select
                        name="tema"
                        value={settings.tema}
                        onChange={handleChange}
                        className="w-full p-2 rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                    </select>
                
            </div>
        </div>
    )
}