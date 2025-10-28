'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function Navbar() {
    const router = useRouter()
    const [user, setUser] = useState<{ name?: string; email?: string; imagen?: string } | null>(null)

    useEffect(() => {
        const loadUser = () => { 
            const storedUser = localStorage.getItem('user')
                setUser(storedUser? JSON.parse(storedUser) : null)
            }

        loadUser()
        window.addEventListener('storage', loadUser)
        window.addEventListener('user-updated', loadUser)

        return () => {
            window.removeEventListener('storage', loadUser)
            window.removeEventListener('user-updated', loadUser)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        router.push('/login')
    }

    if (!user) return null

    return (
        <header className="h-16 bg-white shadow flex items-center justify-between px-6 border-b border-gray-200">
            <h1
                className="text-lg text-gray-600 font-semibold pl-10 sm:pl-0"
                onClick={() => router.push('/dashboard')}   
            >
                Dashboard
            </h1>
            <div className="flex items -center space-x-4">
                {user.imagen && (
                    <img
                        src={user.imagen}
                        alt="Perfil"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                )}
                <span className="text-gray-400 py-1">{user.name || 'Usuario'}</span>
                <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    Logout
                </button>              
            </div>
        </header>
    )
}