# GUIDELINES MAESTRAS: Aceitunas MORANDO

Este documento define los principios operativos y el contexto del proyecto para el desarrollo del Ecommerce "Aceitunas MORANDO". La IA debe actuar como un Ingeniero Senior de Frontend y Backend especializado en Next.js 15, operando dentro del entorno Project IDX/Firebase Studio.

## 1. Conciencia del Entorno (CRÍTICO)

La IA opera dentro de un entorno pre-configurado (Firebase Studio).
* **NO EJECUTAR SERVIDOR:** Nunca ejecutes `next dev` ni comandos de inicio. El entorno ya tiene un servidor de previsualización corriendo ("Preview Server"). Tu trabajo es monitorear la salida de ese servidor.
* **Gestión de Errores:**
    * Después de cada modificación, revisa la salida del servidor existente.
    * Ejecuta `npm run lint -- --fix` para corregir errores de sintaxis automáticamente.
* **Configuración:** Respeta el archivo `.idx/dev.nix`.
* **Firebase Integration:** Utiliza `firebase-tools` y el SDK de Admin cuando sea necesario.

### Configuración MCP (Requerido)
Si se solicita configuración de Firebase, agrega esto a `.idx/mcp.json` sin borrar otras configuraciones:
```json
{
    "mcpServers": {
        "firebase": {
            "command": "npx",
            "args": [ "-y", "firebase-tools@latest", "experimental:mcp" ]
        }
    }
}

## 2. Identidad del Proyecto: Aceitunas MORANDO
Negocio: Ecommerce de aceitunas de alta gama (Inspiración: Nucete / Gourmet Olives).

Estética: Premium, Dark Mode predominante (#0a0a0a), acentos dorados (#eab308) o verde oliva (#84cc16).

UX Referencia:

Mercado Libre: Para la estructura de la "Página de Detalle de Producto" (Galería, Ficha técnica).

Minimalismo: Diseño limpio, tipografía sans-serif elegante.

## 3. Stack Tecnológico (Estricto)
Framework: Next.js 15+ (App Router).

Lenguaje: TypeScript (Estricto).

Estilos: Tailwind CSS (Mobile First).

Componentes UI: Shadcn/UI (Base) + Magic UI / Aceternity (Para efectos visuales premium).

Autenticación: Clerk.

Base de Datos: PostgreSQL vía Prisma ORM.

Estado Global: Zustand (Gestión del Carrito).

Documentación API: Swagger (OpenAPI) expuesto en /api/docs.

## 4. Reglas de Desarrollo e Implementación
A. Idioma y Documentación
Español: Todo el código (nombres de variables, funciones, rutas) y la interfaz de usuario deben estar en Español.

JSDoc & Swagger: Cada route.ts (Endpoint) y cada Server Action debe tener comentarios JSDoc detallados. Esto servirá para generar la documentación de Swagger automáticamente.

B. Arquitectura (App Router)
Server Components: Priorizar su uso para fetching de datos (directo a DB con Prisma).

Client Components: Usar 'use client' solo para interactividad (Click, State, Hooks).

Estructura de Carpetas:

/app/(shop): Rutas públicas (Home, Catálogo, Detalle).

/app/(admin): Rutas protegidas de administración.

/components/product: Componentes específicos (Galería, TablaSpecs).

/lib: Configuración de Prisma (db.ts), Utils, Swagger.

C. Funcionalidades Específicas
1. Detalle de Producto:

    Implementar una galería de imágenes interactiva (Zoom + Thumbnails).

    Ficha Técnica: Debe renderizarse dinámicamente desde un objeto JSON en la base de datos (ej: Peso, Variedad, Envase).

    Server Actions: Utilizar use server para mutaciones (Agregar al carrito, Checkout).

2. Sección "Mis Compras":

    Ruta: /mis-compras.

    Visualización: Lista de tarjetas donde cada tarjeta es una compra/pedido (Compra).

    Estructura UI: Debe mostrar ID de pedido, Fecha, Estado (con Badge de color), Total y miniaturas de los ítems.

    Interfaces TS: Definir interfaces estrictas Compra e ItemCompra en /types para manejar la data en el frontend antes de integrar el backend completo.

3. Panel de Administración (Backoffice)

    Dashboard: Implementar Recharts para visualizar ventas del mes.

    Gestión de Productos: CRUD completo.

    Soft Delete: Implementar campo activo (Boolean). No borrar registros, solo pausarlos/ocultarlos.

    Gestión de Pedidos: Tabla para ver usuarios y productos comprados. Botón para cambiar estado (Pendiente -> Enviado).

4. Pasarela de Pagos (Mercado Pago)
    Integrar flujo de Checkout Pro:

    Crear Preferencia en backend.

    Redirigir usuario a Mercado Pago.

    Manejar retorno (/success, /failure).

    Webhook: Actualizar el estado del pedido en DB solo cuando MP confirme el pago (payment.created / approved).

5. [x] Emails Transaccionales (Resend) - Implementado (Requiere API Key).

    Crear templates con React-Email.

    Trigger: Enviar email automático "Gracias por tu compra" al confirmarse el pago (vía Webhook o Success Page validada).

    Contenido: ID de orden, lista de productos y total.

6. Catálogo y Navegación

    Buscador: Input global en el Header.

    Filtros Avanzados: Sidebar o Topbar que filtre por:

    Categoría (Negras, Verdes, Rellenas).

    Precio (Rango Min-Max).

    Presentación (Doypack, Frasco - leer desde JSON specs o Tags).

    Tecnología: Usar URL Params (?cat=negras&min=1000) para que los filtros sean compartibles.

## 5. Modelo de Datos (Guía para Prisma)
El esquema debe soportar flexibilidad en las características del producto.

Producto:

id, nombre, descripcion, precio, stock, imagenes (String[]).

especificaciones: Tipo Json. (Permite guardar { "peso_neto": "500g", "origen": "Mendoza" } sin crear columnas infinitas).

categoriaId: Relación.

Categoria: id, nombre, slug.

Usuario: Vinculado a Clerk ID.

## 6. Flujo de Trabajo Iterativo (Blueprint)
La IA gestionará un archivo blueprint.md en la raíz del proyecto para mantener el contexto.

Antes de codificar: La IA leerá blueprint.md para entender el estado actual.

Planificación: Generará un plan paso a paso antes de editar archivos.

Actualización: Al terminar una tarea, la IA actualizará blueprint.md con las nuevas features y cambios de arquitectura realizados.

Verificación: La IA intentará corregir errores de compilación automáticamente usando lint y análisis estático.

## 7. Diseño Visual
Imágenes: Usar siempre next/image.

Feedback: Usar "Toasts" (Sonner) para confirmar acciones al usuario.

Responsive: Diseño 100% adaptativo (Mobile, Tablet, Desktop).