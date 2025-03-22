"use client";

import { useState } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";
import Image from "next/image";

// Definición de tipos
type AspectRatioType = 'horizontal' | 'vertical' | 'square' | string;

type Project = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  aspectRatio: AspectRatioType;
};

// Estilos para ocultar la barra de scroll usando React CSSProperties
const hideScrollbarStyle = {
  scrollbarWidth: 'none' as 'none',  // Firefox
  msOverflowStyle: 'none' as 'none',  // IE/Edge
  WebkitScrollbar: {
    display: 'none'  // Chrome/Safari/Opera
  }
} as React.CSSProperties;

// Estilos para el layout de tipo masonry (Pinterest)
const masonryStyles = {
  columnCount: 2,
  columnGap: '12px',
  margin: '0 auto',
  width: '100%',
} as React.CSSProperties;

const masonryItemStyles = {
  breakInside: 'avoid',
  marginBottom: '12px',
  width: '100%',
  display: 'inline-block',
} as React.CSSProperties;

/**
 * Feed page component displaying a grid of video editing projects
 * Acts as the main marketplace (Artmarket) for the application
 * Updated with a modern UI following design reference
 */
export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock data for projects with image URLs and their aspect ratios
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      title: "Makeup Tutorial", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format",
      aspectRatio: "vertical" // 4:5 or 9:16
    },
    { 
      id: 2, 
      title: "Fashion Model", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format",
      aspectRatio: "horizontal" // 16:9
    },
    { 
      id: 3, 
      title: "Product Photography", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format",
      aspectRatio: "square" // 1:1
    },
    { 
      id: 4, 
      title: "Perfume Promo", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1557170334-a9086418de0c?q=80&w=800&auto=format",
      aspectRatio: "vertical" // 4:5 or 9:16
    },
    { 
      id: 5, 
      title: "Gaming Intro", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format",
      aspectRatio: "horizontal" // 16:9
    },
    { 
      id: 6, 
      title: "Wedding Video", 
      price: 300, 
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format",
      aspectRatio: "vertical" // 4:5 or 9:16
    },
  ]);

  // Category filters
  const filters = ["All", "Slow Motion", "Reels", "AI", "Produ"];

  // Función para determinar la proporción de imagen basada en el tipo
  const getAspectRatioClass = (type: AspectRatioType): string => {
    switch(type) {
      case 'horizontal':
        return 'aspect-video'; // 16:9
      case 'vertical':
        return 'aspect-[4/5]'; // 4:5
      case 'square':
        return 'aspect-square'; // 1:1
      default:
        return 'aspect-[4/5]'; // Default
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF9]">
      {/* Top Header with Logo and Chat Icon */}
      <header className="sticky top-0 z-20 bg-black shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="font-bold font-montserrat text-white text-xl">LOGO</div>
        <button className="text-white">
          <Image 
            src="/icons/chat.svg"
            width={30}
            height={30}
            alt="Chat"
            className="w-7 h-7"
          />
        </button>
      </header>

      {/* Filter Buttons */}
      <div className="bg-[#FEFDF9] shadow-sm px-4 py-3 overflow-x-auto scrollbar-hide" style={hideScrollbarStyle}>
        <div className="flex space-x-2 whitespace-nowrap font-montserrat">
          {filters.map(filter => (
            <button
              key={filter}
              className={`px-4 py-1.5 rounded-full text-sm font-medium font-montserrat ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white'
                  : 'bg-black text-white'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-2 sm:p-3 pb-20 bg-[#FEFDF9] font-montserrat">
        {/* Pinterest-style Layout usando Flexbox - siempre 2 columnas */}
        <div className="flex flex-row gap-2 sm:gap-3">
          {/* Primera columna */}
          <div className="w-1/2 flex flex-col gap-2 sm:gap-3">
            {projects
              .filter((_, index) => index % 2 === 0)
              .map((project, index) => (
                <div key={project.id}>
                  <Link href={`/detail?id=${project.id}`} className="block">
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                      {/* Price Tag - más compacto en móvil */}
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-black/25 backdrop-blur-sm text-white font-light py-1 px-2 sm:py-1.5 sm:px-4 rounded-full text-xs sm:text-sm tracking-wide font-montserrat">
                        <span className="font-light">$</span>{project.price}
                      </div>
                      
                      {/* Project Image with dynamic aspect ratio */}
                      <div className={`relative w-full ${getAspectRatioClass(project.aspectRatio)}`}>
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
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
          
          {/* Segunda columna */}
          <div className="w-1/2 flex flex-col gap-2 sm:gap-3">
            {projects
              .filter((_, index) => index % 2 === 1)
              .map((project) => (
                <div key={project.id}>
                  <Link href={`/detail?id=${project.id}`} className="block">
                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
                      {/* Price Tag - más compacto en móvil */}
                      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 bg-black/25 backdrop-blur-sm text-white font-light py-1 px-2 sm:py-1.5 sm:px-4 rounded-full text-xs sm:text-sm tracking-wide font-montserrat">
                        <span className="font-light">$</span>{project.price}
                      </div>
                      
                      {/* Project Image with dynamic aspect ratio */}
                      <div className={`relative w-full ${getAspectRatioClass(project.aspectRatio)}`}>
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
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
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 