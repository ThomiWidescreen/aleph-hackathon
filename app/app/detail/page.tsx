"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Detail page component showing detailed information about a specific video project
 * Includes project thumbnail, name, price, and actions (chat button)
 */
export default function DetailPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  
  // State for the project details
  const [project, setProject] = useState<{
    id: number;
    title: string;
    price: number;
    color: string;
    description: string;
    creatorId: number;
    creatorName: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real app, this would be fetched from an API
  const mockProjects = [
    { 
      id: 1, 
      title: "3D Animation", 
      price: 40, 
      color: "bg-blue-100",
      description: "Professional 3D animation services for your projects. High quality renders with attention to detail.",
      creatorId: 101,
      creatorName: "Alex Designer"
    },
    { 
      id: 2, 
      title: "Motion Graphics", 
      price: 20, 
      color: "bg-green-100",
      description: "Creative motion graphics for videos, presentations, and social media content.",
      creatorId: 102,
      creatorName: "Maria Motion"
    },
    { 
      id: 3, 
      title: "Video Editing", 
      price: 10, 
      color: "bg-purple-100",
      description: "Professional video editing services including color correction, transitions, and effects.",
      creatorId: 103,
      creatorName: "John Editor"
    },
    { 
      id: 4, 
      title: "Color Grading", 
      price: 35, 
      color: "bg-yellow-100",
      description: "Expert color grading to enhance your videos with the perfect look and feel.",
      creatorId: 104,
      creatorName: "Sarah Colorist"
    },
  ];
  
  // Fetch project details on component mount
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (projectId) {
        const foundProject = mockProjects.find(p => p.id === parseInt(projectId));
        setProject(foundProject || null);
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [projectId]);
  
  // Handle chat button click
  const handleChatClick = () => {
    if (project) {
      console.log(`Initiating chat with creator: ${project.creatorName}`);
      // In a real app, this would navigate to the chat page or open a chat modal
    }
  };

  // Toggle fullscreen mode for video
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    if (videoContainerRef.current) {
      try {
        if (!isFullscreen) {
          if (videoContainerRef.current.requestFullscreen) {
            videoContainerRef.current.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      } catch (err) {
        console.error("Error toggling fullscreen:", err);
      }
    }
  };
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-32 h-2 bg-gray-200 rounded-full mb-4"></div>
            <div className="w-40 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ) : project ? (
        // Project details
        <>
          {/* Project thumbnail */}
          <div 
            ref={videoContainerRef}
            onClick={toggleFullscreen}
            className={`w-full aspect-video ${project.color} flex items-center justify-center cursor-pointer relative`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-24 h-24 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            
            {/* Fullscreen indicator */}
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-1 rounded text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </div>
          </div>
          
          {/* Project info */}
          <main className="flex-grow p-4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-blue-600 font-bold text-xl">${project.price}</p>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="border-t border-gray-200 pt-3 mt-2">
                <p className="text-sm text-gray-500">Created by</p>
                <Link href={`/profile-video-maker?id=${project.creatorId}`} className="text-blue-600 font-medium">
                  {project.creatorName}
                </Link>
              </div>
            </div>
            
            {/* Action buttons */}
            <button
              onClick={handleChatClick}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mb-4"
            >
              chatear
            </button>
          </main>
        </>
      ) : (
        // Project not found
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-gray-600 mb-4">Project not found</p>
          <Link href="/feed" className="text-blue-600">
            Return to feed
          </Link>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 