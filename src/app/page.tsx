'use client'

import ClientSplash from "@/components/ClientSplash"
import LoginPage from "./login/page"

export default function HomePage() {
    return (
        <ClientSplash>
            <LoginPage />
        </ClientSplash>
    )
}