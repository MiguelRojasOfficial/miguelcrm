'use client'

import React from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: Props) {
    return (
            <button
                {...props}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transitipon">
                    {children}              
            </button>
    )
}