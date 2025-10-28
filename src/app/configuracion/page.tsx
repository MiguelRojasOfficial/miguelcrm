'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserSettings } from "@/hooks/useUserSettings"
import ProfileCard from "@/components/ProfileCard"
import PreferencesCard from "@/components/PreferencesCard"
import Button from "@/components/ui/Button" 

export default function ConfiguracionPage() {
    const {settings, updateSettings} = useUserSettings()
    const [toast, setToast] = useState('')
    const router = useRouter()

    useEffect(() => {
            document.documentElement.classList.toggle("dark", settings.tema === 'dark')
    }, [settings.tema])

    const handleSave = () => {
        updateSettings(settings)
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
        const updatedUser = { ...storedUser, name: settings.name || storedUser.name, email: settings.email || storedUser.email, imagen: settings.imagen || storedUser.imagen, }
        localStorage.setItem('user', JSON.stringify(updatedUser))

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
        const updatedUsuarios = usuarios.map((u: any) =>
            u.email === storedUser.email ? updatedUser : u
        ) 
        
        localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios))

        window.dispatchEvent(new Event('user-updated'))
        setToast('Configuración guardada correctamente')

        if (storedUser.email !== updatedUser.email) {
            setTimeout(() => {
                localStorage.removeItem('user')
                router.push('/login')
            }, 2000)
        }
        setTimeout(() => setToast(''), 2800)
    }
        
    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            
                <h1 className="text-2xl font-semibold text-gray-500 ">Configuración</h1>
                <ProfileCard settings={settings} onChange={updateSettings} />
                <PreferencesCard settings={settings} onChange={updateSettings} />

                <div className="flex justify-end">
                    <Button onClick={handleSave}>Guardar cambios</Button>
                </div>

                {toast && (
                    <div className="fixed bottom-5 rigth-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                        {toast}
                    </div>
                )}
            
        </div>
    )
}