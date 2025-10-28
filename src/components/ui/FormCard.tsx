'use client'

import React from "react"

type Props = {
    title?: string
    children: React.ReactNode
}

export default function FormCard({ title, children }: Props) {
    return (
        <div className="max-w-2xl bg-white border border-gray-300 p-6 rounded-lg shadow mx-auto">
            {title && <h1 className="text-2xl text-blue-700 font-bold mb-6">{title}</h1>}
            {children}
        </div>
    )
}