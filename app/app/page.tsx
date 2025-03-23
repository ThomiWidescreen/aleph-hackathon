"use client";

/**
 * Importaciones de React y Next.js necesarias para el componente
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import config from "./../@config.json";
import Image from "next/image";
import { getAllVideos } from "./api/actions/file/getAllVideos";
import { IVideo } from './api/database/models/video';
import { getVideosByQuery } from "./api/actions/file/getVideosByQuery";
import { Header } from "@/components/Header";
import { getUserAddress } from "./api/helpers/getUserAddress";
import BottomNav from "@/components/BottomNav";

/**
 * Tipo que define las posibles proporciones de imagen para los videos
 */
type AspectRatioType = 'horizontal' | 'vertical' | 'square' | string;


export const getThumbnailUrl = (videoUrl: string | null | undefined): string => {
  // Fallback si la URL no existe o es inválida
  if (!videoUrl) {
    return 'https://via.placeholder.com/400x500';
  }

  // Forzar el protocolo a https
  let normalizedUrl = videoUrl;
  if (videoUrl.startsWith('http://')) {
    normalizedUrl = videoUrl.replace('http://', 'https://');
  }

  // Dividir la URL en partes para manipularla
  const urlParts = normalizedUrl.split('/');

  // Encontrar la posición de "upload" en la URL
  const uploadIndex = urlParts.indexOf('upload');
  if (uploadIndex === -1) {
    return 'https://via.placeholder.com/400x500'; // Fallback si la URL no tiene "upload"
  }

  // Insertar "so_5" después de "upload"
  urlParts.splice(uploadIndex + 1, 0, 'so_5');

  // Obtener la última parte de la URL (el nombre del archivo con extensión)
  const lastPartIndex = urlParts.length - 1;
  const lastPart = urlParts[lastPartIndex];

  // Reemplazar la extensión del archivo (por ejemplo, .mp4) por .jpg
  urlParts[lastPartIndex] = lastPart.replace(/\.(mp4|webm|ogg)$/i, '.jpg');

  // Reconstruir la URL
  const thumbnailUrl = urlParts.join('/');

  return thumbnailUrl;
};

/**
 * Estilos para ocultar la barra de desplazamiento horizontal
 * Compatible con Firefox, IE/Edge y Chrome/Safari/Opera
 */
const hideScrollbarStyle = {
  scrollbarWidth: 'none' as 'none',  // Firefox
  msOverflowStyle: 'none' as 'none',  // IE/Edge
  WebkitScrollbar: {
    display: 'none'  // Chrome/Safari/Opera
  }
} as React.CSSProperties;

/**
 * Componente principal de la página Feed (Artmarket)
 * Muestra un grid de videos disponibles en la plataforma con:
 * - Filtros de categoría
 * - Visualización en dos columnas
 * - Estados de carga y manejo de errores
 */
export default function FeedPage() {
  // Estado para el filtro activo (categoría seleccionada)
  const [activeFilter, setActiveFilter] = useState("All");
  // Estado para almacenar los videos cargados
  const [videos, setVideos] = useState<IVideo[]>([]);
  // Estado para controlar la visualización del loader
  const [isLoading, setIsLoading] = useState(true);


    const [userAddress, setUserAddress] = useState<`0x${string}` | null>(null)
  
    
      useEffect(() => {
        getUserAddress().then(e => {
          if(!e){
            window.location.href = "/welcome";
          }
          setUserAddress(e)
        }) 
      }, [
    
      ])

  /**
   * Obtiene las categorías de filtros desde el archivo de configuración
   * Si no existen, usa un array predeterminado de categorías
   */
  const filters = config.categories.video || ["All", "Fitness", "Cooking", "Lifestyle", "Streaming", "Blog", "Product Reviews"];

  /**
   * Efecto que se ejecuta al montar el componente
   * Carga todos los videos disponibles en la plataforma
   */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Activar estado de carga
        setIsLoading(true);
        console.log("Obteniendo todos los videos del servidor...");
        // Llamar al server action getAllVideos
        const response = await getAllVideos();
        // Actualizar el estado con los videos recibidos o un array vacío
        setVideos(response.videos || []);
      } catch (error) {
        // Manejo de errores: log y limpiar el estado
        console.error("Error al cargar los videos:", error);
        setVideos([]);
      } finally {
        // Desactivar estado de carga al finalizar
        setIsLoading(false);
      }
    };

    // Ejecutar la función de carga
    fetchVideos();
  }, []);

  /**
   * Maneja el cambio de filtro/categoría
   * @param filter - Categoría seleccionada por el usuario
   */
  const handleFilterChange = async (filter: string) => {
    // Actualizar el filtro activo
    setActiveFilter(filter);
    // Activar estado de carga
    setIsLoading(true);

    try {
      console.log(`Filtrando videos por categoría: ${filter}`);
      let response;
      // Si el filtro es "All", obtener todos los videos
      if (filter === "All") {
        response = await getAllVideos();
      } else {
        // Si no, filtrar por la categoría seleccionada
        response = await getVideosByQuery({ query: filter });
      }

      // Actualizar el estado con los videos filtrados
      setVideos(response.videos || []);
    } catch (error) {
      // Manejo de errores: log y limpiar el estado
      console.error(`Error al filtrar videos por ${filter}:`, error);
      setVideos([]);
    } finally {
      // Desactivar estado de carga al finalizar
      setIsLoading(false);
    }
  };

  /**
   * Determina la clase CSS para la proporción de imagen según el tipo
   * @param type - Tipo de proporción de imagen
   * @returns Clase CSS para aplicar la proporción correcta
   */
  const getAspectRatioClass = (type: AspectRatioType): string => {
    switch (type) {
      case 'horizontal':
        return 'aspect-video'; // 16:9
      case 'vertical':
        return 'aspect-[4/5]'; // 4:5
      case 'square':
        return 'aspect-square'; // 1:1
      default:
        return 'aspect-[4/5]'; // Valor predeterminado
    }
  };

  /**
   * Asigna una proporción de imagen a cada video basada en su posición
   * Nota: En una implementación real, esta información vendría del backend
   * @param index - Índice del video en la lista
   * @returns Tipo de proporción de imagen a utilizar
   */
  const getAspectRatioForVideo = (index: number): AspectRatioType => {
    // Patrón de proporciones que se repite para crear variedad visual
    const patterns = ['vertical', 'horizontal', 'square', 'vertical', 'horizontal', 'vertical'];
    return patterns[index % patterns.length];
  };







  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF9]">
      {/* Cabecera con logo y botón de chat */}
      <Header />
      {/* Barra de filtros por categoría */}
      <div className="bg-[#FEFDF9] shadow-sm px-4 py-3 overflow-x-auto scrollbar-hide" style={hideScrollbarStyle}>
        <div className="flex space-x-2 whitespace-nowrap font-montserrat">
          {filters.map(filter => (
            <button
              key={filter}
              className={`px-4 py-1.5 rounded-full text-sm font-medium font-montserrat ${activeFilter === filter
                ? 'bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white'
                : 'bg-[#EAEAEA] text-black'
                }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal - Grid de videos */}
      <main className="flex-grow p-2 sm:p-3 pb-20 bg-[#FEFDF9] font-montserrat">
        {isLoading ? (
          // Estado de carga - Muestra un spinner centrado
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3E54F5]"></div>
          </div>
        ) : videos.length === 0 ? (
          // Estado vacío - No hay videos en la categoría seleccionada
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-center">No videos found for this category</p>
          </div>
        ) : (
          // Layout de dos columnas para mostrar los videos
          <div className="flex flex-row gap-2 sm:gap-3">
            {/* Primera columna - Muestra videos en posiciones pares */}
            <div className="w-1/2 flex flex-col gap-2 sm:gap-3">
              {videos
                .filter((_, index) => index % 2 === 0)
                .map((video, index) => (
                  <div key={video.id}>
                    <Link href={`/detail?id=${video._id}`} className="block">
                      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                        {/* Etiqueta de precio */}
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-black/25 backdrop-blur-sm text-white font-light py-1 px-2 sm:py-1.5 sm:px-4 rounded-full text-xs sm:text-sm tracking-wide font-montserrat">
                          <span className="font-light">$</span>{video.price}
                        </div>

                        {/* Imagen del video con proporción dinámica */}
                        <div className={`relative w-full ${getAspectRatioClass(getAspectRatioForVideo(index * 2))}`}>
                          <Image
                            // src={"https://res.cloudinary.com/dc2xcjktb/video/upload/so_5/v1742621337/voqwurzepof1crnvjj8c.jpg"}
                            src={getThumbnailUrl(video.urlVideo)}
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 45vw, 33vw"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Segunda columna - Muestra videos en posiciones impares */}
            <div className="w-1/2 flex flex-col gap-2 sm:gap-3">
              {videos
                .filter((_, index) => index % 2 === 1)
                .map((video, index) => (
                  <div key={video.id}>
                    <Link href={`/detail?id=${video._id}`} className="block">
                      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                        {/* Etiqueta de precio */}
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-black/25 backdrop-blur-sm text-white font-light py-1 px-2 sm:py-1.5 sm:px-4 rounded-full text-xs sm:text-sm tracking-wide font-montserrat">
                          <span className="font-light">$</span>{video.price}
                        </div>

                        {/* Imagen del video con proporción dinámica */}
                        <div className={`relative w-full ${getAspectRatioClass(getAspectRatioForVideo(index * 2 + 1))}`}>
                          <Image
                            src={getThumbnailUrl(video.urlVideo)}
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 45vw, 33vw"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Barra de navegación inferior */}
      <BottomNav />
    </div>
  );
} 