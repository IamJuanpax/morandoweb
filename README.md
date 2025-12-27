# 🫒 Aceitunas MORANDO - E-commerce Platform

**Aceitunas MORANDO** es una plataforma de comercio electrónico moderna, rápida y escalable diseñada para la venta de aceitunas gourmet y productos regionales. Este proyecto utiliza las últimas tecnologías web para ofrecer una experiencia de usuario premium y una gestión administrativa eficiente.

---

## 🛠 Tech Stack

El proyecto está construido sobre un stack tecnológico robusto y moderno:

### Core Framework
*   **[Next.js 15+ (App Router)](https://nextjs.org/)**: Framework React para producción. Rutas server-side, server actions y optimización SEO nativa.
*   **[React 19](https://react.dev/)**: Biblioteca para interfaces de usuario interactiva (Server & Client Components).
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático estricto para mayor seguridad y mantenibilidad del código.

### Estilos & UI
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades CSS para diseño responsivo y moderno "Mobile First".
*   **[Shadcn/UI](https://ui.shadcn.com/)**: Colección de componentes UI reutilizables y accesibles (basado en Radix UI).
*   **[Lucide React](https://lucide.dev/)**: Iconografía ligera y consistente.
*   **Sonner**: Notificaciones tipo "Toast" elegantes.

### Backend y Base de Datos
*   **[PostgreSQL](https://www.postgresql.org/)**: Base de datos relacional robusta.
*   **[Prisma ORM](https://www.prisma.io/)**: ORM moderno para interactuar con la base de datos de manera segura y tipada.
*   **Server Actions**: Lógica de servidor integrada directamente en Next.js (sin API routes tradicionales separadas).

### Gestión de Estado
*   **[Zustand](https://docs.pmnd.rs/zustand)**: Gestor de estado ligero y rápido para el manejo del **Carrito de Compras**, con persistencia en LocalStorage.

### Autenticación
*   **[Clerk](https://clerk.com/)**: Gestión completa de usuarios, autenticación segura (Email, Google, etc.) y protección de rutas. Soporte para Roles (User/Admin).

---

## 🔌 Integraciones y APIs Externas

### 1. Pasarela de Pagos: [Mercado Pago](https://www.mercadopago.com.ar/developers)
*   **Integration**: SDK oficial de Mercado Pago (`mercadopago`).
*   **Flow**: Preferencias de Checkout Pro.
*   **Webhooks**: Endpoint (`/api/webhooks/mercadopago`) para confirmación automática de pagos (cambio de estado Pending -> Paid).

### 2. Emails Transaccionales: [Resend](https://resend.com/)
*   **Integration**: API REST vía SDK de Resend.
*   **Templates**: Diseño de correos con **[React Email](https://react.email/)**.
*   **Casos de Uso**:
    *   Confirmación de compra automática post-pago.
    *   Recepción de consultas desde el formulario de contacto.

---

## 📂 Estructura del Proyecto

```bash
/app
  /(shop)           # Rutas públicas (Home, Catálogo, Checkout, Contacto)
  /(admin)          # Rutas protegidas (Dashboard, Productos) - Solo ADMIN
  /actions          # Server Actions (Lógica de negocio: Ordenes, Contacto, Productos)
  /api              # Endpoints REST (Webhooks, etc.)
/components
  /ui               # Componentes base (Shadcn)
  /shop             # Componentes específicos de la tienda (Navbar, Footer)
  /admin            # Componentes del panel (Forms, Tables)
  /emails           # Templates de React Email
/lib                # Utilidades, configuración de DB, Auth y Mail
/prisma             # Esquema de base de datos y Seeds
```

---

## 🚀 Instalación y Puesta en Marcha

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/IamJuanpax/morandoweb.git
    cd morandoweb
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    npm install --legacy-peer-deps (si hay conflictos de versiones)
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en la raíz con las siguientes claves:

    ```env
    # Base de Datos
    DATABASE_URL="postgresql://user:pass@host:5432/db"

    # Autenticación (Clerk)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Pagos (Mercado Pago)
    MP_ACCESS_TOKEN=APP_USR-...
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # Emails (Resend)
    RESEND_API_KEY=re_...
    CONTACT_EMAIL="tu-email@dominio.com"
    ```

4.  **Inicializar Base de Datos**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Cargar Datos Iniciales (Seed)**:
    ```bash
    npx tsx prisma/seed.ts
    ```

6.  **Ejecutar Servidor de Desarrollo**:
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000`.

---

## 🛡 Roles y Permisos

*   **Usuario (Por defecto)**: Puede navegar, comprar y ver sus órdenes.
*   **Administrador**: Acceso completo a `/admin`. Para asignar rol de admin, ejecutar:
    ```bash
    npx ts-node prisma/set-admin.ts email@usuario.com
    ```
