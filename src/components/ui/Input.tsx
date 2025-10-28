'use client'

import React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

export default function Input({ label, ...props }: Props) {
    return (
        <div>
            <label className="block text-gray-500 font-medium mb-1">{label}</label>
                <input
                    {...props}
                    className="w-full border px-3 py-2 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition-colors"
                />
        </div>
    )
}