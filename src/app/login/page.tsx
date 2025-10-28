'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
        const user = usuarios.find(
            (u: any) => u.email === email && u.password === password
        )

        if (!user) {
            setError('Correo o contraseña incorrectos')
            return
        }

        localStorage.setItem('user', JSON.stringify(user))
        router.push('/dashboard')
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Iniciar Sesión</h2>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Ingresar
                </button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    ¿No tienes una cuenta?{" "}
                    <span
                        onClick={() => router.push('/register')}
                        className="text-blue-600 hover: underline cursor-pointer"
                    >
                        Regístrate aquí
                    </span>
                </p>
            </form>
        </div>
    )
 }