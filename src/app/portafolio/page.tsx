'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Linkedin, Send, Github } from "lucide-react"
import { SiVercel } from "react-icons/si"

interface FormData {
  name: string
  email: string
  message: string
}

interface State {
  success: boolean
  errors: Record<string, string[]>
  loading: boolean
}

export default function PortfolioPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })
  const [state, setState] = useState<State>({ success: false, errors: {}, loading: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState({ success: false, errors: {}, loading: true })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (res.ok && result.success) {
        setState({ success: true, errors: {}, loading: false })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setState({ success: false, errors: result.errors || {}, loading: false })
      }
    } catch {
      setState({ success: false, errors: { general: ["Error de red"] }, loading: false })
    }
  }

  const proyectos = [
    { id: 1, titulo: "Miguelflix", descripcion: "Next + React + Typescript + Tailwind + CSS + API de Contentful", imagen: "/images/miguelflix.png", url: "https://tu-proyecto-en-vercel.vercel.app" },
    { id: 2, titulo: "Migueltify", descripcion: "Next + React + Typescript + Tailwind + API de Deezer + Multilenguaje", imagen: "/images/migueltify.png", url: "https://tu-proyecto-en-vercel.vercel.app" },
    { id: 3, titulo: "Miguel TV", descripcion: "Next + React + Typescript + Tailwind + API de TMDb", imagen: "/images/migueltv.png", url: "https://tu-proyecto-en-vercel.vercel.app" },
    { id: 4, titulo: "MiguelStore", descripcion: "Next + React + Typescript + Tailwind + CSS", imagen: "/images/miguelstore.png", url: "https://tu-proyecto-en-vercel.vercel.app" },
    { id: 5, titulo: "Airport", descripcion: "React + Three.js + @react-three/fiber + CSS", imagen: "/images/airplane.png", url: "https://miguelrojasoficial.onrender.com/" },
  ]

  const socialLinks = [
    { id: 1, name: "GitHub", icon: <Github className="w-6 h-6" />, url: "https://github.com/MiguelRojasOfficial", text: "@MiguelRojasOfficial" },
    { id: 2, name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com/in/miguelrojasoficial", text: "@miguelrojasoficial" },
    { id: 3, name: "Render", icon: (     
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        fill="currentColor"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M26.827.01c-4.596-.216-8.461 3.107-9.12 7.487-.027.203-.066.4-.099.596-1.025 5.454-5.797 9.584-11.53 9.584a11.67 11.67 0 0 1-5.634-1.442.298.298 0 0 0-.444.262v18.854h17.602V22.097c0-2.439 1.971-4.419 4.4-4.419h4.4c4.982 0 8.99-4.15 8.795-9.197C35.02 3.937 31.35.226 26.827.01Z"/>
      </svg>
    ), 
    url: "https://miguelrojasoficial.onrender.com", text: "@miguelrojasofficial" },
    { id: 4, name: "Correo", icon: <Mail className="w-6 h-6" />, url: "https://mail.google.com/mail/?view=cm&fs=1&to=miguelrojasy3@gmail.com", text: "miguelrojasy3@gmail.com" },
  ]

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <section className="py-16 px-6 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Mi Portafolio</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative w-full md:h-56 h-35 bg-gray-800">
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  className="w-full h-auto object-cover rounded-t-lg bg-gray-800"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mt-5 mb-2">{p.titulo}</h3>
                <p className="text-sm text-gray-300 mb-4">{p.descripcion}</p>
                <div className="flex justify-end mt-2">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline"
                  >
                    Ver proyecto →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="bg-gray-800 rounded-lg shadow-md flex flex-col justify-center items-center p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Conecta conmigo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 rounded-xl border border-gray-700 hover:bg-gray-700 transition-colors duration-300 group text-left"
                >
                  <span className="text-3xl text-red-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {item.icon}
                  </span>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400 break-words whitespace-normal">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
