"use server";

import { revalidatePath } from "next/cache";

/**
 * Interfaz IVideo que define la estructura de datos de un video
 * Esta interfaz es utilizada para tipar los datos de videos en toda la aplicación
 * 
 * @property id - Identificador único del video
 * @property title - Título del video
 * @property description - Descripción detallada del video
 * @property thumbnailUrl - URL de la imagen de miniatura
 * @property price - Precio del video en USD
 * @property category - Categoría a la que pertenece el video
 * @property authorId - ID del autor/creador del video
 * @property authorName - Nombre del autor/creador
 * @property createdAt - Fecha de creación en formato ISO
 */
export interface IVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  category: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

/**
 * Datos de prueba (mock) para videos
 * En un entorno de producción, estos datos serían reemplazados
 * por consultas a una base de datos o API externa
 */
const mockVideos: IVideo[] = [
  {
    id: "video-001",
    title: "Cooking Japanese Ramen",
    description: "A step-by-step guide to making authentic ramen at home.",
    thumbnailUrl: "/images/video1.jpg",
    price: 25,
    category: "Cooking",
    authorId: "user-123",
    authorName: "Chef Mike",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-002",
    title: "Vietnamese Pho Recipe",
    description: "Learn to cook traditional Vietnamese pho with fresh ingredients.",
    thumbnailUrl: "/images/video2.jpg",
    price: 20,
    category: "Cooking",
    authorId: "user-456",
    authorName: "Lisa Wong",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-003",
    title: "Morning Yoga Routine",
    description: "Start your day with this energizing 15-minute yoga flow.",
    thumbnailUrl: "/images/video3.jpg",
    price: 15,
    category: "Fitness",
    authorId: "user-789",
    authorName: "Yoga Master",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-004",
    title: "Home Workout Without Equipment",
    description: "Full body workout you can do at home with no equipment.",
    thumbnailUrl: "/images/video4.jpg",
    price: 10,
    category: "Fitness",
    authorId: "user-123",
    authorName: "Fitness Pro",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-005",
    title: "Daily Vlog: City Life",
    description: "A day in the life of a city dweller.",
    thumbnailUrl: "/images/video5.jpg",
    price: 5,
    category: "Lifestyle",
    authorId: "user-101",
    authorName: "Urban Explorer",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-006",
    title: "Streaming Setup Guide",
    description: "Complete guide to setting up your streaming studio.",
    thumbnailUrl: "/images/video6.jpg",
    price: 30,
    category: "Streaming",
    authorId: "user-202",
    authorName: "Tech Streamer",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-007",
    title: "Weekly Blog: Tech News",
    description: "Latest technology news and updates.",
    thumbnailUrl: "/images/video7.jpg",
    price: 0,
    category: "Blog",
    authorId: "user-303",
    authorName: "Tech Blogger",
    createdAt: new Date().toISOString()
  },
  {
    id: "video-008",
    title: "Smartphone Review",
    description: "Detailed review of the latest smartphone.",
    thumbnailUrl: "/images/video8.jpg",
    price: 0,
    category: "Product Reviews",
    authorId: "user-404",
    authorName: "Tech Reviewer",
    createdAt: new Date().toISOString()
  }
];

/**
 * Obtiene todos los videos de la base de datos
 * 
 * PARA INTEGRACIÓN BACKEND:
 * - Reemplazar esta función con una consulta real a la base de datos o API
 * - Mantener la estructura de retorno (Promise<IVideo[]>)
 * - Asegurar el manejo de errores y revalidación del caché
 * 
 * @returns Promise con un array de videos
 */
export async function getAllVideos(): Promise<IVideo[]> {
  try {
    console.log("Fetching all videos...");
    
    // PUNTO DE INTEGRACIÓN: Reemplazar este bloque con una llamada a la API/base de datos real
    // Esta simulación de retardo se eliminaría en la implementación real
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Revalidar la página para asegurar que se muestren los datos más recientes
    // Es importante mantener esta línea para que Next.js actualice la página cuando cambien los datos
    revalidatePath("/feed");
    
    return mockVideos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

/**
 * Obtiene videos que coinciden con una consulta específica (categoría)
 * 
 * PARA INTEGRACIÓN BACKEND:
 * - Reemplazar con una consulta filtrada a la base de datos o API
 * - Mantener el parámetro query para permitir filtrado por categoría
 * - Considerar implementar búsqueda por texto, además de por categoría
 * 
 * @param params Objeto que contiene la consulta de búsqueda
 * @returns Promise con un array de videos filtrados
 */
export async function getVideosByQuery({ query }: { query: string }): Promise<IVideo[]> {
  try {
    console.log(`Fetching videos with query: ${query}`);
    
    // PUNTO DE INTEGRACIÓN: Reemplazar este bloque con una llamada filtrada a la API/base de datos real
    // Esta simulación de retardo se eliminaría en la implementación real
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Si la query es "all", devolver todos los videos
    if (query.toLowerCase() === "all") {
      return mockVideos;
    }
    
    // Filtrar videos por categoría
    // En la implementación real, este filtrado se realizaría en la consulta a la base de datos
    const filteredVideos = mockVideos.filter(
      video => video.category.toLowerCase() === query.toLowerCase()
    );
    
    // Revalidar la página para asegurar que se muestren los datos más recientes
    revalidatePath("/feed");
    
    return filteredVideos;
  } catch (error) {
    console.error(`Error fetching videos with query ${query}:`, error);
    return [];
  }
}

/**
 * Obtiene videos de un autor específico
 * 
 * PARA INTEGRACIÓN BACKEND:
 * - Reemplazar con una consulta que filtre por authorId en la base de datos
 * - Considerar añadir paginación para grandes colecciones de videos
 * - Se puede extender para incluir ordenamiento (más recientes, más populares, etc.)
 * 
 * @param authorId ID del autor cuyos videos se desean obtener
 * @returns Promise con un array de videos del autor
 */
export async function getVideosByAuthor(authorId: string): Promise<IVideo[]> {
  try {
    console.log(`Fetching videos by author: ${authorId}`);
    
    // PUNTO DE INTEGRACIÓN: Reemplazar este bloque con una llamada a la API/base de datos real
    // Esta simulación de retardo se eliminaría en la implementación real
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filtrar videos por autor
    // En la implementación real, este filtrado se realizaría en la consulta a la base de datos
    const authorVideos = mockVideos.filter(
      video => video.authorId === authorId
    );
    
    return authorVideos;
  } catch (error) {
    console.error(`Error fetching videos for author ${authorId}:`, error);
    return [];
  }
} 