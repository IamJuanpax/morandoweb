# Aceitunas MORANDO - Blueprint de Desarrollo

## Estado Actual
- **Fase**: Inicialización del Proyecto.
- **Stack**: Next.js 16, React 19, Tailwind CSS 4.
- **Progreso**:
  - Estructura base de Next.js creada.
  - Dependencias iniciales instaladas.

## Plan de Acción Inmediato
1.  [x] Instalación de dependencias del núcleo (Clerk, Prisma, Zustand, Shadcn Utils).
2.  [x] Configuración de Shadcn/UI (Manual: globals.css con variables y utils.ts).
3.  [x] Inicialización de Prisma ORM y configuración de conexión a BD.
4.  [x] Configuración de la estructura de carpetas (`(shop)`, `(admin)`, `lib`, `components`).
5.  [x] Implementación del Layout base con fuentes (Outfit) y colores definidos en `GEMINI.md`.
6.  [x] Creación de Layout específico para tienda `(shop)` con Navbar/Footer básicos.

## Plan de Acción Inmediato (Fase 2: Infraestructura)
1.  [x] Configuración de autenticación con Clerk (Middleware, Providers, Auth Pages).
2.  [x] Creación de `ENV_EXAMPLE` para configuración de entorno.
3.  [x] Definición del Schema de Prisma (User, Product, Category, Specifications).
4.  [ ] Seed de base de datos con categorías y productos de prueba.
5.  [x] Implementación de Navbar funcional con menú responsivo y UserButton de Clerk.

## Plan de Acción Inmediato (Fase 3: Datos y Catálogo)
1.  [ ] Ejecutar migración de DB y script de Seed (Requiere config de usuario).
2.  [x] Crear página de Catálogo (`/productos`) con listado dummy mientras no haya DB.
3.  [x] Crear página de Detalle de Producto (`/productos/[slug]`) con datos dummy.

4.  [x] Crear página "Nosotros" con historia y valores de la marca.
5.  [x] Crear página "Contacto" con formulario funcional (frontend) y datos de contacto.

## Plan de Acción Inmediato (Fase 4: Carrito y Ordenes)
1.  [ ] Modificar Schema de Prisma (Agregar `Order`, `OrderItem`).
2.  [x] Implementar Store de Zustand para el Carrito (Persistente).
3.  [x] Crear componente de UI para el Carrito (SideCart / Sheet).
4.  [x] Implementar Server Action para checkout (Crear Orden + Mercado Pago).
5.  [x] Crear página de historial de compras para el usuario (Corregido y securizado).

## Plan de Acción Inmediato (Fase 5: Panel de Administración)
1.  [x] Crear Layout Admin con protección de rutas (Role: ADMIN).
2.  [x] Implementar Dashboard Principal con métricas básicas.
3.  [ ] CRUD de Productos (Tabla, Crear, Editar, Soft Delete).
4.  [ ] Gestión de Pedidos (Cambio de estados).

## Estado Actual
- **Catálogo**: Funcional con datos 'hardcodeados' (`lib/mock-data.ts`).
- **Páginas Institucionales**: "Nosotros" y "Contacto" implementadas.
- **Auth**: Configurada y funcional.
- **DB**: Conectada (se asume tras corrección de .env por usuario).

## Arquitectura de Aplicación
- **Rutas Públicas**: `/app/(shop)`
- **Rutas Admin**: `/app/(admin)`
- **Base de Datos**: PostgreSQL (Prisma)
- **Auth**: Clerk

## Historial de Cambios
- **[Fecha Actual]**: Creación del archivo `blueprint.md`.
