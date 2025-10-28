'use client'

import "./globals.css"
import React from "react"
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"
import { ThemeProvider } from "@/context/ThemeContext"
import ClientSplash from "@/components/ClientSplash"
import ProtectedRoute from "@/components/ProtectedRoute"
import { usePathname } from "next/navigation"


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayout = pathname === "/login" || pathname === "/register"

  return (
    <html lang="es">
      <body className="h-screen bg-gray-100 dark:bg-gray-900">
        <ClientSplash>
        <ThemeProvider>
          {hideLayout ? (
            children
          ) : (
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
              </div>
            </ProtectedRoute>
          )}
        </ThemeProvider></ClientSplash>
      </body>
    </html>
  )
}
