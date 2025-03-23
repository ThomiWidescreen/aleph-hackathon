"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import config from "../../@config.json";
import { getVideoDetail } from "../api/actions/file/getVideoDetail";
import { IVideo } from "@database/models/video";
import { getThumbnailUrl } from "../feed/page";
import { IUser } from "../api/database/models/user";
import { getUser } from "../api/actions/users/getUser";
import { getUserAddress } from "../api/helpers/getUserAddress";


// Create a custom BottomNav component just for the detail page
function DetailBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[42px] bg-[#FFFFFF] border-t border-gray-100 dark:bg-[#FFFFFF] dark:border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {/* Botón Create posicionado para que quede a la mitad entre el contenido y el footer */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-10">
        <Link
          href="/create"
          className="inline-flex flex-col items-center justify-center"
        >
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-br from-[#631497] to-[#3E54F5] shadow-lg">
            <Image 
              src="/icons/plus.svg"
              width={24}
              height={24}
              alt="Create"
            />
          </div>
        </Link>
      </div>

      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {/* Home icon - using SVG from config file to ensure it's gray */}
        <Link 
          href="/feed"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <div className="flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: config.icons.homeGray }} />
          </div>
        </Link>
        
        {/* Search icon */}
        <Link 
          href="/search"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <div className="flex items-center justify-center">
            <Image 
              src="/icons/glass.svg"
              width={30}
              height={30}
              alt="Search icon"
            />
          </div>
        </Link>
        
        {/* Empty space for create button */}
        <div className="inline-flex flex-col items-center justify-center px-5 relative">
          {/* Empty space */}
        </div>
        
        {/* Contracts icon */}
        <Link 
          href="/contracts"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <div className="flex items-center justify-center">
            <Image 
              src="/icons/contract.svg"
              width={30}
              height={30}
              alt="Contracts icon"
            />
          </div>
        </Link>
        
        {/* Profile icon */}
        <Link 
          href="/profile"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <div className="flex items-center justify-center">
            <Image 
              src="/icons/profile.svg"
              width={30}
              height={30}
              alt="Profile icon"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

/**
 * Detail page component showing detailed information about a specific video project
 * Includes project image background, info overlay, and chat button
 */
export default function DetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState<IVideo>()
  const [creator, setCreator] = useState<IUser>();

  const [isLoading, setIsLoading] = useState(true);
  const [profileImageError, setProfileImageError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    setIsLoading(true);

    const fetchUser = async (authorAddress: string) => {
      const user = await getUser({ address: authorAddress })
      setCreator(user?.user)
    }
    
    getVideoDetail(projectId!).then((video) => {

      if(video?.video) {
        setProject(video?.video)
        console.log(video?.video)
        fetchUser(video?.video.authorAddress)
      }
      setIsLoading(false)

    });
  }
  ,[])

  
  
  // // Mock data - in a real app, this would be fetched from an API
  // const mockProjects = [
  //   { 
  //     id: 1, 
  //     title: "3D Animation", 
  //     price: 40, 
  //     color: "bg-blue-100",
  //     description: "Professional 3D animation services for your projects. High quality renders with attention to detail.",
  //     creatorId: 101,
  //     creatorName: "Alex Designer",
  //     imageUrl: "https://images.unsplash.com/photo-1617296956430-cf0fc6cce243?q=80&w=1000&auto=format&fit=crop",
  //     profileImageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  //   },
  //   { 
  //     id: 2, 
  //     title: "Motion Graphics", 
  //     price: 20, 
  //     color: "bg-green-100",
  //     description: "Creative motion graphics for videos, presentations, and social media content.",
  //     creatorId: 102,
  //     creatorName: "Maria Motion",
  //     imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop",
  //     profileImageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  //   },
  //   { 
  //     id: 3, 
  //     title: "Video Editing", 
  //     price: 10, 
  //     color: "bg-purple-100",
  //     description: "Professional video editing services including color correction, transitions, and effects.",
  //     creatorId: 103,
  //     creatorName: "John Editor",
  //     imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
  //     profileImageUrl: "https://randomuser.me/api/portraits/men/22.jpg"
  //   },
  //   { 
  //     id: 4, 
  //     title: "Hugo Boss presentation", 
  //     price: 35, 
  //     color: "bg-yellow-100",
  //     description: "Perfume product showcase with professional lighting and composition for marketing campaigns.",
  //     creatorId: 104,
  //     creatorName: "Mikaela Ramirez",
  //     imageUrl: "https://images.unsplash.com/photo-1590736969596-b3cd92be7483?q=80&w=1000&auto=format&fit=crop",
  //     profileImageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  //   },
  // ];
  
  // Fetch project details on component mount
  // useEffect(() => {
  //   // Simulate API call delay
  //   const timer = setTimeout(() => {
  //     if (projectId) {
  //       const foundProject = mockProjects.find(p => p.id === parseInt(projectId));
  //       setProject(foundProject || null);
  //     }
  //     setIsLoading(false);
  //   }, 500);
    
  //   return () => clearTimeout(timer);
  // }, [projectId]);
  
  // Handle chat button click
  const handleChatClick = () => {
    if (project) {
      console.log(`Initiating chat with creator: ${project.authorAddress}`);
      // In a real app, this would navigate to the chat page or open a chat modal
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    router.back();
  };

  // Handle profile image loading error
  const handleProfileImageError = () => {
    console.log("Profile image failed to load, showing fallback");
    setProfileImageError(true);
  };

  // Toggle fullscreen mode for video/image
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    try {
      setShowVideo(true);
      
      if (!isFullscreen) {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error("Error playing video:", error);
          });
        }
        
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen();
        } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
          (videoContainerRef.current as any).webkitRequestFullscreen();
        } else if ((videoContainerRef.current as any).msRequestFullscreen) {
          (videoContainerRef.current as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      
      // Si se sale del modo fullscreen, ocultar el video y mostrar la miniatura
      if (!isNowFullscreen && videoRef.current) {
        videoRef.current.pause();
        setShowVideo(false);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-montserrat relative">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-32 h-2 bg-gray-200 rounded-full mb-4"></div>
            <div className="w-40 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ) : project ? (
        // Project details with full-screen background
        <>
          {/* Full-screen background image/video container */}
          <div 
            ref={videoContainerRef}
            className="absolute inset-0 w-full h-screen cursor-pointer"
            onClick={toggleFullscreen}
          >
            {/* Mostrar imagen cuando no está en modo video */}
            {!showVideo && (
              <Image 
                src={getThumbnailUrl(project.urlVideo)} 
                alt={project.title}
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            )}
            
            {/* Video que estará inicialmente oculto */}
            <video 
              ref={videoRef}
              src={project.urlVideo}
              className={`absolute inset-0 w-full h-full object-cover ${showVideo ? 'block' : 'hidden'}`}
              controls={isFullscreen}
              playsInline
            />
            
            {/* Subtle gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
            
            {/* Fullscreen indicator */}
            <div className="absolute bottom-4 right-4 bg-black/25 backdrop-blur-sm p-1.5 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </div>
          </div>
          
          {/* Top navigation icons */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
            {/* Back button - Transparent background instead of black */}
            <button 
              onClick={handleBackClick}
              className="text-white p-2 rounded-full backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Chat icon - Using the Image component with the icon from public/icons */}
            <button 
              onClick={handleChatClick}
              className="text-white p-2 rounded-full backdrop-blur-sm"
            >
              <Image 
                src="/icons/chat.svg"
                width={24}
                height={24}
                alt="Chat"
                className="w-6 h-6"
              />
            </button>
          </div>
          
          {/* Project info overlay container - positioned at bottom above footer */}
          <div className="absolute bottom-0 left-0 right-0 px-0 z-10">
            {/* Info container with semi-transparent background */}
            <div className="bg-black/25 backdrop-blur-sm rounded-t-2xl p-4 pb-[75px] w-full text-white">
              {/* Title row with chat button */}
              <div className="flex justify-between items-start mb-3">
                <h1 className="text-lg font-semibold">{project.title}</h1>
                {/* Chat button with gradient background */}
                <button 
                  onClick={handleChatClick}
                  className="bg-gradient-to-r from-[#3E54F5] to-[#631497] rounded-full py-1 px-3 text-xs text-white"
                >
                  Chat
                </button>
              </div>
              
              {/* Creator info with profile image instead of "Created by" text */}
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/profile-video-maker?id=${project.authorAddress}`}>
                  {profileImageError ? (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                      {project.authorAddress.charAt(0)}
                    </div>
                  ) : (
                    <Image 
                      src={creator?.photo || "https://randomuser.me/api/portraits/men/32.jpg"}
                      alt={creator?.name || ''}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      onError={handleProfileImageError}
                      unoptimized={true}
                    />
                  )}
                </Link>
                <Link href={`/profile-video-maker?id=${project.authorAddress}`} className="text-white text-sm">
                  {creator?.name}
                </Link>
              </div>
              
              {/* Description */}
              <p className="text-sm font-light mb-2">{project.description}</p>
            </div>
          </div>
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
      
      {/* Bottom Navigation - Using the custom DetailBottomNav instead of BottomNav */}
      <div className="relative z-10">
        <DetailBottomNav />
      </div>
    </div>
  );
}