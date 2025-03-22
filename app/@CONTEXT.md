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
│   │   └── page.tsx       # Vista para aceptar/rechazar contratos
│   ├── create/
│   │   └── page.tsx       # Formulario para subir videos
│   ├── contracts/
│   │   └── page.tsx       # Listado de contratos del usuario
│   ├── edit-profile/
│   │   └── page.tsx       # Edición de información de perfil
│   ├── edit-portfolio-item/
│   │   └── page.tsx       # Edición de elementos del portfolio
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