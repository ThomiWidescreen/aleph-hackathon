# Contexto del Proyecto Video Editor Marketplace

## Descripción General
Este proyecto es una aplicación web progresiva (PWA) que funciona como un marketplace para conectar creadores de video con clientes que necesitan servicios de edición. La plataforma permite a los editores de video mostrar su trabajo, establecer sus tarifas y recibir propuestas de contrato, mientras que los clientes pueden buscar editores según sus necesidades, ver sus portfolios y contratarlos.

## Estado actual del proyecto
**Fase actual: Paso 17 del plan de implementación - Pruebas Finales**

### Fases completadas:
- ✅ Paso 1: Estructura Inicial
- ✅ Paso 2: Creación de Componentes Base
- ✅ Paso 3: Implementación de la Pantalla de Bienvenida
- ✅ Paso 4: Implementación de la Pantalla de Feed
- ✅ Paso 5: Implementación de la Pantalla de Búsqueda
- ✅ Paso 6: Implementación de la Pantalla de Detalle
- ✅ Paso 7: Pantalla de Perfil de Video Maker
- ✅ Paso 8: Pantalla de Mi Perfil
- ✅ Paso 9: Pantalla de Crear Contrato
- ✅ Paso 10: Pantalla de Aceptar Contrato
- ✅ Paso 11: Componente de Navegación Inferior
- ✅ Paso 12: Pantalla de Subir Video
- ✅ Paso 13: Pantalla de Mis Contratos
- ✅ Paso 14: Pantalla de Editar Perfil
- ✅ Paso 15: Pantalla de Editar Item de Portfolio
- ✅ Paso 16: Pantalla de Chat

## Componentes implementados

### Pantalla de Bienvenida
- Formulario para la creación inicial del perfil
- Incluye campos para nombre, descripción y avatar
- Redirección al feed principal tras completar el registro

### Pantalla de Feed (Artmarket)
- Listado de servicios disponibles en formato grid
- Cada tarjeta muestra título, precio y thumbnail
- Navegación a la vista detallada
- Integración con la navegación inferior

### Pantalla de Búsqueda
- Barra de búsqueda con filtros desplegables
- Categorías seleccionables y filtro de precio
- Resultados en formato similar al feed
- Estado vacío para búsquedas sin resultados

### Pantalla de Detalle
- Vista ampliada de un servicio específico
- Información completa del editor y proyecto
- Opciones para contactar o contratar
- Modo de pantalla completa para previsualización

### Pantalla de Perfil de Video Maker
- Vista del perfil de un editor
- Información personal y profesional
- Rating y disponibilidad
- Portfolio con trabajos realizados
- Botones para chat y contratación directa

### Pantalla de Mi Perfil
- Gestión del perfil personal del usuario
- Toggle para marcar disponibilidad
- Estadísticas de proyectos y ganancias
- Acceso al portfolio personal con opción de añadir nuevos trabajos
- Redirecciones a pantallas de edición

### Pantalla de Crear Contrato
- Formulario de múltiples pasos para proponer un contrato
- Validación de campos en cada paso
- Resumen final antes de enviar
- Gestión de estados de carga y confirmación

### Pantalla de Aceptar Contrato
- Vista detallada de contratos recibidos
- Opciones para aceptar o rechazar
- Confirmación antes de ejecutar acciones
- Redirección a chat tras aceptación

### Componente de Navegación Inferior
- Barra de navegación presente en todas las pantallas
- Íconos personalizados para cada sección
- Resaltado automático de la sección activa
- Navegación fluida entre pantallas principales

### Pantalla de Subir Video
- Formulario completo para añadir videos al portfolio
- Funcionalidad de drag & drop para archivos
- Campos para título, descripción, categoría y precio
- Validación de formulario y feedback visual
- Gestión de estados durante la subida

### Pantalla de Mis Contratos
- Visualización de contratos en diferentes estados
- Tabs para filtrar por pendientes, activos y completados
- Información esencial de cada contrato a simple vista
- Indicadores visuales de progreso y estado
- Navegación a detalle de cada contrato

### Pantalla de Editar Perfil
- Actualización de información básica del usuario
- Cambio de nombre y descripción
- Modificación del estado de disponibilidad
- Feedback visual durante el guardado de cambios

### Pantalla de Editar Item de Portfolio
- Modificación de elementos existentes en el portfolio
- Actualización de título, descripción, categoría y precio
- Gestión de etiquetas para mejorar la búsqueda
- Opción para eliminar elementos no deseados

### Pantalla de Chat
- Sistema de mensajería entre usuarios
- Listado de conversaciones recientes
- Interfaz de chat con historial de mensajes
- Indicadores de tiempo y estado de mensajes
- Agrupación de mensajes por fecha
- Envío de nuevos mensajes con feedback inmediato
- Scroll automático al último mensaje

### Pantalla de Detalles de Contrato
- Vista unificada para contratos en cualquier estado (Pendiente, Aceptado, Rechazado, Completado, Fallido, Disputa)
- Reemplaza la funcionalidad de aceptar contrato anterior
- Interfaz adaptativa que muestra diferentes acciones según el estado
- Información detallada incluyendo título, descripción, plazos y pagos
- Sistema de confirmación modal para acciones críticas
- Indicadores visuales de estado con códigos de color
- Diseño adaptable basado en principios de la UX

## Estructura de archivos

```
aleph-hackathon/
├── app/
│   ├── @config.json       # Configuración centralizada
│   ├── @CONTEXT.md        # Este archivo de contexto
│   ├── welcome/
│   │   └── page.tsx       # Pantalla de bienvenida/onboarding
│   ├── feed/
│   │   └── page.tsx       # Listado principal de servicios
│   ├── search/
│   │   └── page.tsx       # Búsqueda con filtros
│   ├── detail/
│   │   └── page.tsx       # Vista detallada de un servicio
│   ├── profile-video-maker/
│   │   └── page.tsx       # Perfil de un editor de video
│   ├── my-profile/
│   │   └── page.tsx       # Perfil del usuario actual
│   ├── chat/
│   │   └── page.tsx       # Sistema de mensajería
│   ├── create-contract/
│   │   └── page.tsx       # Formulario para crear contratos
│   ├── accept-contract/
│   │   └── page.tsx       # Vista antigua para aceptar/rechazar contratos (a reemplazar)
│   ├── contract/
│   │   ├── page.tsx       # Índice para probar diferentes estados de contratos
│   │   └── [id]/
│   │       └── page.tsx   # Nueva vista unificada de detalles de contrato
│   ├── create/
│   │   └── page.tsx       # Formulario para subir videos
│   ├── contracts/
│   │   └── page.tsx       # Listado de contratos del usuario
│   ├── edit-profile/
│   │   └── page.tsx       # Edición de información de perfil
│   ├── edit-portfolio-item/
│   │   └── page.tsx       # Edición de elementos del portfolio
│   ├── api/
│   │   └── actions/
│   │       ├── users/     # Acciones relacionadas con usuarios
│   │       │   ├── getUser.ts
│   │       │   └── putUser.ts
│   │       └── video.actions.ts  # Acciones para gestionar videos
│   ├── components/
│   │   ├── BottomNav/
│   │   │   └── index.tsx  # Componente de navegación inferior
│   │   └── ... otros componentes compartidos
```

## Funcionalidades Principales

### Gestión de Perfiles
- Creación y edición de perfiles de usuario
- Toggle de disponibilidad para recibir trabajos
- Visualización de estadísticas y métricas

### Marketplace de Servicios
- Listado y búsqueda de editores de video
- Filtrado por categorías y precios
- Vista detallada de servicios

### Sistema de Contratación
- Creación de propuestas de contrato
- Aceptación o rechazo de contratos
- Seguimiento de proyectos activos

### Sistema de Comunicación
- Chat en tiempo real entre editores y clientes
- Historial de conversaciones
- Notificaciones de mensajes nuevos

### Gestión de Portfolio
- Subida y edición de trabajos realizados
- Categorización y etiquetado de proyectos
- Previsualización de contenido multimedia

### Sistema de Server Actions
- **Server Actions de Videos**:
  - `getAllVideos()`: Obtiene todos los videos disponibles en la plataforma
  - `getVideosByQuery({ query })`: Filtra videos por categoría o búsqueda
  - `getVideosByAuthor(authorId)`: Obtiene los videos de un autor específico
- **Server Actions de Usuarios**:
  - `getUser()`: Obtiene información del usuario actual
  - `putUser()`: Actualiza información del usuario

## Próximos pasos de desarrollo

1. **Pruebas Finales**
   - Verificar la navegación completa entre todas las pantallas
   - Comprobar la consistencia visual y de experiencia
   - Validar los formularios y su funcionamiento
   - Probar la experiencia en dispositivos móviles y escritorio

2. **Optimizaciones**
   - Revisión de rendimiento y tiempos de carga
   - Mejora de animaciones y transiciones
   - Ajustes de accesibilidad

3. **Implementación real de APIs**
   - Reemplazar datos mock por conexiones reales
   - Integración con sistema de autenticación
   - Conexión con almacenamiento de archivos 

## Navigation

### BottomNav
The main navigation component used throughout the app. Located at `components/BottomNav/index.tsx`.

### DetailBottomNav
A custom navigation component specifically for the detail page that ensures the home icon appears in gray. 
This component is defined directly in the `app/detail/page.tsx` file rather than imported.

#### Icon Assets
- Home icon (gray) - Used in DetailBottomNav:
```svg
<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 8.00003C19 7.73481 18.8946 7.48046 18.7071 7.29292C18.5196 7.10539 18.2652 7.00003 18 7.00003C17.7348 7.00003 17.4804 7.10539 17.2929 7.29292C17.1054 7.48046 17 7.73481 17 8.00003H19ZM5 8.00003C5 7.73481 4.89464 7.48046 4.7071 7.29292C4.51957 7.10539 4.26521 7.00003 4 7.00003C3.73478 7.00003 3.48043 7.10539 3.29289 7.29292C3.10535 7.48046 3 7.73481 3 8.00003H5ZM19.293 10.707C19.4816 10.8892 19.7342 10.99 19.9964 10.9877C20.2586 10.9854 20.5094 10.8803 20.6948 10.6948C20.8802 10.5094 20.9854 10.2586 20.9877 9.99643C20.99 9.73423 20.8892 9.48163 20.707 9.29303L19.293 10.707ZM11 1.00003L11.707 0.293031C11.5195 0.105559 11.2652 0.000244141 11 0.000244141C10.7348 0.000244141 10.4805 0.105559 10.293 0.293031L11 1.00003ZM1.293 9.29303C1.19749 9.38528 1.1213 9.49562 1.0689 9.61763C1.01649 9.73963 0.988901 9.87085 0.987747 10.0036C0.986593 10.1364 1.01189 10.2681 1.06218 10.391C1.11246 10.5139 1.18671 10.6255 1.2806 10.7194C1.37449 10.8133 1.48615 10.8876 1.60904 10.9379C1.73194 10.9881 1.86362 11.0134 1.9964 11.0123C2.12918 11.0111 2.2604 10.9835 2.3824 10.9311C2.50441 10.8787 2.61475 10.8025 2.707 10.707L1.293 9.29303ZM6 20H16V18H6V20ZM19 17V8.00003H17V17H19ZM5 17V8.00003H3V17H5ZM20.707 9.29303L11.707 0.293031L10.293 1.70703L19.293 10.707L20.707 9.29303ZM10.293 0.293031L1.293 9.29303L2.707 10.707L11.707 1.70703L10.293 0.293031ZM16 20C16.7956 20 17.5587 19.684 18.1213 19.1214C18.6839 18.5587 19 17.7957 19 17H17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8947 16.2652 18 16 18V20ZM6 18C5.73478 18 5.48043 17.8947 5.29289 17.7071C5.10535 17.5196 5 17.2652 5 17H3C3 17.7957 3.31607 18.5587 3.87868 19.1214C4.44129 19.684 5.20435 20 6 20V18Z" fill="#ADADAD"/>
<path d="M19 8.00003C19 7.73481 18.8946 7.48046 18.7071 7.29292C18.5196 7.10539 18.2652 7.00003 18 7.00003C17.7348 7.00003 17.4804 7.10539 17.2929 7.29292C17.1054 7.48046 17 7.73481 17 8.00003H19ZM5 8.00003C5 7.73481 4.89464 7.48046 4.7071 7.29292C4.51957 7.10539 4.26521 7.00003 4 7.00003C3.73478 7.00003 3.48043 7.10539 3.29289 7.29292C3.10535 7.48046 3 7.73481 3 8.00003H5ZM19.293 10.707C19.4816 10.8892 19.7342 10.99 19.9964 10.9877C20.2586 10.9854 20.5094 10.8803 20.6948 10.6948C20.8802 10.5094 20.9854 10.2586 20.9877 9.99643C20.99 9.73423 20.8892 9.48163 20.707 9.29303L19.293 10.707ZM11 1.00003L11.707 0.293031C11.5195 0.105559 11.2652 0.000244141 11 0.000244141C10.7348 0.000244141 10.4805 0.105559 10.293 0.293031L11 1.00003ZM1.293 9.29303C1.19749 9.38528 1.1213 9.49562 1.0689 9.61763C1.01649 9.73963 0.988901 9.87085 0.987747 10.0036C0.986593 10.1364 1.01189 10.2681 1.06218 10.391C1.11246 10.5139 1.18671 10.6255 1.2806 10.7194C1.37449 10.8133 1.48615 10.8876 1.60904 10.9379C1.73194 10.9881 1.86362 11.0134 1.9964 11.0123C2.12918 11.0111 2.2604 10.9835 2.3824 10.9311C2.50441 10.8787 2.61475 10.8025 2.707 10.707L1.293 9.29303ZM6 20H16V18H6V20ZM19 17V8.00003H17V17H19ZM5 17V8.00003H3V17H5ZM20.707 9.29303L11.707 0.293031L10.293 1.70703L19.293 10.707L20.707 9.29303ZM10.293 0.293031L1.293 9.29303L2.707 10.707L11.707 1.70703L10.293 0.293031ZM16 20C16.7956 20 17.5587 19.684 18.1213 19.1214C18.6839 18.5587 19 17.7957 19 17H17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8947 16.2652 18 16 18V20ZM6 18C5.73478 18 5.48043 17.8947 5.29289 17.7071C5.10535 17.5196 5 17.2652 5 17H3C3 17.7957 3.31607 18.5587 3.87868 19.1214C4.44129 19.684 5.20435 20 6 20V18Z" fill="#ADADAD"/>
</svg>
``` 