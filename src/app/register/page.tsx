'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            return
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
        const userExists = usuarios.some((u: any) => u.email === email)

        if ( userExists) {
            setError('Este correo ya está registrado')
            return
        }

        const newUser = { name, email, password }
        usuarios.push(newUser)
        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        setSuccess('Registro exitoso. Redirigiendo al inicio de sesión...')
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleRegister}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200">Registrarse</h2>
                {error && <p className="text-red-600 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
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
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Registrarse
                </button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    ¿Ya tienes una cuenta?{" "}
                    <span
                        onClick={() => router.push('/login')}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Inicia sesión
                    </span>
                </p>
            </form>
        </div>
    )
}