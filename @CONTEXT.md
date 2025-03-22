# Contexto de la Aplicación

## Estructura General

Esta aplicación es una plataforma para la creación y gestión de contratos entre creadores de contenido y clientes. Basada en Next.js, utiliza una estructura de carpetas moderna con:

- `/app` - Contiene la estructura principal de páginas y componentes
- `/components` - Componentes reutilizables en toda la aplicación
- `/memory-bank` - Documentación y registros de progreso
- `/@config.json` - Configuración centralizada para valores compartidos

## Componentes Principales

### Navegación
- **BottomNav** - Barra de navegación inferior con íconos para home, contratos, search, y perfil. El botón "+" central redirige a la página de subida de proyectos.
- **TopNav** - Barra de navegación superior con botón de retroceso y acciones contextuales

### Elementos de UI
- **StatusIndicator** - Componente para mostrar el estado de un contrato (solicitud, en progreso, completado, por expirar)
- **Dropdowns** - Componentes para selección de opciones (ej. selector de divisa)
- **Modales** - Componentes para confirmación de acciones importantes
- **FileUploadArea** - Componente modular para carga de archivos con drag & drop, acepta parámetros para personalización y manejo de errores
- **FormField** - Componente modular para campos de formulario con soporte para diferentes tipos de entrada y manejo de errores

## Páginas Principales

### Creación de Contrato (`/create-contract`)
- Formulario para crear nuevos contratos
- Campos para título, descripción, fecha límite, pago final y compromiso mínimo
- Selector de divisa entre WLD y USDC

### Aceptación de Contrato (`/accept-contract`)
- Visualización de detalles de contratos pendientes de aceptación
- Interfaz para revisar términos y aceptar o rechazar
- Modal de confirmación para aceptación

### Creación de Video (`/create-video`)
- Formulario para subir nuevos videos
- Refactorizada para usar componentes modulares (FileUploadArea y FormField)
- Optimizada con useCallback para mejor rendimiento
- Logs informativos para facilitar el debugging
- Interfaz en inglés con color de fondo desde la configuración centralizada

### Subida de Proyecto (`/upload-project`)
- Versión alternativa de la página de creación de video
- Implementada con componentes modulares y reutilizables
- Misma funcionalidad pero mejor estructura de código
- Optimizada con useCallback para mejor rendimiento
- Accesible directamente desde el botón "+" en la barra de navegación inferior

### Perfil (`/my-profile`)
- Vista de información del usuario
- Pestañas para ver creaciones y contratos
- Lista de contratos con diferentes estados
- Funcionalidad para navegar a detalles de cada contrato

### Búsqueda (`/search`)
- Búsqueda de usuarios y creadores
- Filtrado por categorías
- Resultados en tiempo real

## Flujos de Trabajo

### Creación y Aceptación de Contratos
1. Usuario crea contrato en `/create-contract`
2. El contrato aparece en el perfil del destinatario con estado "contract_request"
3. Destinatario revisa y acepta/rechaza en `/accept-contract`
4. Al aceptar, el contrato cambia a estado "in_progress"
5. Al completarse, el contrato pasa a estado "completed"

### Creación y Publicación de Contenido
1. Usuario accede a `/upload-project` (preferentemente) o `/create-video`
2. Sube un archivo de video mediante selección o drag & drop
3. Completa metadatos: título, descripción, precio y etiquetas
4. Al publicar, el contenido aparece en el perfil del usuario
5. El contenido se muestra en la sección de "creaciones" del perfil

## Estilos y Diseño

La aplicación utiliza:
- Tailwind CSS para estilos
- Fuente Montserrat como tipografía principal
- Paleta de colores con gradientes (azul primario #3E54F5 a morado #631497)
- Bordes redondeados para elementos de UI
- Esquemas de color para estados (azul para activo, morado para completado, etc.)
- Color específico para áreas de carga de archivos definido en config.colors.fileUploadBackground

## Configuración (`@config.json`)

El archivo de configuración centraliza:
- Colores primarios y secundarios
- Gradientes
- Radios de borde
- Espaciados comunes
- Estados de contrato
- Rutas principales
- Opciones de divisa
- Datos de ejemplo para desarrollo

## Ampliaciones Futuras

- Integración con blockchain para gestión de pagos
- Implementación de sistema de reputación para creadores
- Funcionalidad de chat entre clientes y creadores
- Notificaciones para cambios de estado de contratos
- Vista previa de reproducción para videos subidos
- Búsqueda y categorización mejorada de contenido 