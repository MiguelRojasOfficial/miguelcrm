'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Tema = 'light' | 'dark'

interface ThemeContextProps {
  tema: Tema
  setTema: (t: Tema) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTemaState] = useState<Tema>('light')

  useEffect(() => {
      const stored = localStorage.getItem('userSettings')
      if (stored) {
        const data = JSON.parse(stored)
        if (data.tema) setTemaState(data.tema)
        document.documentElement.classList.toggle('dark', data.tema === 'dark')
      }
  }, [])

  const setTema = (t: Tema) => {
    setTemaState(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
    const settings = JSON.parse(localStorage.getItem('userSetting') || "{}")
    localStorage.setItem('userSettings', JSON.stringify({ ...settings, tema: t }))
  }

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
