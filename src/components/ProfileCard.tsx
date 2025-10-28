'use client'

import { useRef, useState } from "react"
import Input from "@/components/ui/Input"
import type { UserSettings } from "@/types/settings"

interface Props {
    settings: UserSettings
    onChange: (updated: UserSettings) => void
}

export default function ProfileCard({ settings, onChange }: Props) {
    const [preview, setPreview] = useState(settings.imagen)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        onChange({ ...settings, [name]: value })   
    }




    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {    
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            const base64 = reader.result as string
            onChange({ ...settings, imagen: base64 })
            setPreview(base64)
        }
        reader.readAsDataURL(file)
    }

    const triggerFileSelect = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Perfil del Usuario</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center">
                    {preview ? (
                        <img src={preview} alt="Imagen del perfil" className="w-24 h-24 rounded-full object-cover border border-gray-300" />
                    ) : (
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 dark:text-gray-400 text-sm text-gray-500">
                            Sin imagen
                        </div>
                    )}

                    <button
                        onClick={triggerFileSelect}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                    >
                        Subir imagen
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <div>
                        <Input
                            label="Nombre"
                            name="name"
                            value={settings.name || ''}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre"
                            className="w-full p-2 rounded-md border" style={{ backgroundColor: 'var(--background', color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                        />
                    </div>

                    <div>
                        <Input
                            label="Correo"
                            name="email"
                            value={settings.email || ''}
                            onChange={handleChange}
                            placeholder="Ingrese su correo"
                            className="w-full p-2 rounded-md border" style={{ backgroundColor: 'var(--background', color: 'var(--foreground)', borderColor: 'var(--foreground)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
