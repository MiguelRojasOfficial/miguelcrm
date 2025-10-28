'use client'

import { useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"

type Props = {
    children: ReactNode
}

export default function ProtectedRoute({ children }: Props)  {
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) router.push('/login')
    }, [router])

    return <>{children}</>
}