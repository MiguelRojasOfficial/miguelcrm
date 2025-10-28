# 🚀 MIGUEL CRM

**MIGUEL CRM** es una aplicación profesional desarrollada con **Next.js 15**, **TypeScript** y **Tailwind CSS**, diseñada para la gestión interna de clientes, ventas, tareas y configuraciones de usuario.  
Incluye autenticación local básica, cambio de tema (claro/oscuro), y persistencia en `localStorage`.

---

## 🧩 Características principales

- 🔐 **Autenticación básica**
  - Inicio y cierre de sesión almacenado en `localStorage`.
  - Rutas protegidas con `ProtectedRoute`.

- 🧠 **Gestión de usuarios**
  - Visualización y edición del perfil del usuario.
  - Subida de imagen de perfil (base64).
  - Preferencias personalizables (tema claro/oscuro).

- 📊 **Módulos principales**
  - **Dashboard:** vista general del sistema.
  - **Clientes:** listado y gestión de clientes.
  - **Ventas:** control y registro de ventas.
  - **Tareas:** creación y actualización del estado de tareas.
  - **Configuración:** ajustes de usuario y tema.

- 🎨 **Interfaz moderna**
  - Navbar y Sidebar responsive.
  - TailwindCSS con soporte `dark mode`.
  - Componentes reutilizables (`Button`, `Input`, `FormCard`).

- 💾 **Persistencia**
  - Todos los datos (clientes, ventas, tareas y configuración) se almacenan en `localStorage`.

---

## 🧱 Estructura del proyecto

src/
├─ app/
│ ├─ dashboard/
│ ├─ clientes/
│ ├─ ventas/
│ ├─ tareas/
│ ├─ configuracion/
│ ├─ login/
│ ├─ layout.tsx
│ └─ page.tsx
│
├─ components/
│ ├─ ClientSplash.tsx
│ ├─ ProtectedRoute.tsx
│ └─ ui/
│ ├─ Button.tsx
│ ├─ Input.tsx
│ └─ FormCard.tsx
│ └─ layout/
│ ├─ Navbar.tsx
│ ├─ Sidebar.tsx
│
├─ hooks/
│ └─ useUserSettings.ts
│
├─ context/
│ └─ ThemeContext.tsx
│
├─ services/
│ ├─ settingsService.ts
│ └─ storageService.ts
│
├─ types/
│ ├─ cliente.ts
│ ├─ venta.ts
│ ├─ tarea.ts
│ └─ settings.ts
│
└─ styles/
└─ globals.css

yaml
Copiar código

---

## ⚙️ Instalación y ejecución

```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/MiguelRojasOfficial/miguel-crm.git
cd miguel-crm

# 2️⃣ Instala dependencias
npm install

# 3️⃣ Inicia el entorno de desarrollo
npm run dev

# 4️⃣ Compila para producción
npm run build && npm start
### 🧠 Tecnologías utilizadas

| Tecnología       | Uso                                |
|------------------|------------------------------------|
| **Next.js 15**   | Framework principal                |
| **TypeScript**   | Tipado estático                    |
| **TailwindCSS**  | Estilos modernos y responsive       |
| **Lucide Icons** | Iconos para interfaz                |
| **LocalStorage** | Persistencia local de datos         |
| **React Hooks**  | Manejo de estado y contexto         |


🔒 Autenticación
El login se gestiona en el frontend mediante localStorage:

Si no hay usuario, el sistema redirige automáticamente a /login.

Al cerrar sesión se limpia el almacenamiento local.

🎨 Modo oscuro / claro
Controlado mediante el contexto ThemeContext:

ts
Copiar código
document.documentElement.classList.toggle('dark', tema === 'dark')
Las preferencias se guardan automáticamente en localStorage bajo la clave userSettings.

### 📁 Datos locales

| Tipo                    | Clave en `localStorage` |
|--------------------------|------------------------|
| **Clientes**             | `clientes`             |
| **Ventas**               | `ventas`               |
| **Tareas**               | `tareas`               |
| **Configuración usuario**| `userSettings`         |


🧑‍💻 Desarrollador
Miguel Rojas
📧 miguelrojasoficial@gmail.com
🌐 https://miguelrojasoficial.onrender.com
💼 GitHub: MiguelRojasOfficial

🪪 Licencia
Proyecto con fines educativos y profesionales.
© 2025 Miguel Rojas — Todos los derechos reservados.