"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Profile Video Maker page component
 * Shows a video editor's profile with options to chat or hire them
 */
export default function ProfileVideoMakerPage() {
  const searchParams = useSearchParams();
  const editorId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<{
    id: number;
    name: string;
    description: string;
    rating: number;
    projects: number;
    completedProjects: number;
    availableForHire: boolean;
    portfolioItems: Array<{
      id: number;
      title: string;
      thumbnail: string;
      color: string;
    }>;
  } | null>(null);
  
  // Mock editors data - in a real app, this would come from API
  const mockEditorsData = [
    {
      id: 101,
      name: "Alex Designer",
      description: "3D animation specialist with 5 years of experience. I create high-quality animations for commercial and personal projects.",
      rating: 4.8,
      projects: 32,
      completedProjects: 30,
      availableForHire: true,
      portfolioItems: [
        { id: 1, title: "3D Product Animation", thumbnail: "", color: "bg-blue-100" },
        { id: 2, title: "Character Animation", thumbnail: "", color: "bg-indigo-100" },
        { id: 3, title: "Architectural Visualization", thumbnail: "", color: "bg-purple-100" }
      ]
    },
    {
      id: 102,
      name: "Maria Motion",
      description: "Motion graphics designer specialized in creating engaging animated content for social media, commercials, and presentations.",
      rating: 4.9,
      projects: 48,
      completedProjects: 45,
      availableForHire: true,
      portfolioItems: [
        { id: 4, title: "Instagram Stories Pack", thumbnail: "", color: "bg-green-100" },
        { id: 5, title: "Corporate Animation", thumbnail: "", color: "bg-teal-100" },
        { id: 6, title: "App Promo Video", thumbnail: "", color: "bg-cyan-100" }
      ]
    },
    {
      id: 103,
      name: "John Editor",
      description: "Professional video editor with experience in documentaries, short films, and corporate videos. Fast turnaround times.",
      rating: 4.7,
      projects: 56,
      completedProjects: 52,
      availableForHire: false,
      portfolioItems: [
        { id: 7, title: "Documentary Highlights", thumbnail: "", color: "bg-amber-100" },
        { id: 8, title: "Corporate Training", thumbnail: "", color: "bg-orange-100" },
        { id: 9, title: "Wedding Compilation", thumbnail: "", color: "bg-rose-100" }
      ]
    },
    {
      id: 104,
      name: "Sarah Colorist",
      description: "Color grading specialist with a keen eye for detail. I help filmmakers achieve the perfect look for their projects.",
      rating: 4.6,
      projects: 24,
      completedProjects: 23,
      availableForHire: true,
      portfolioItems: [
        { id: 10, title: "Feature Film Grading", thumbnail: "", color: "bg-yellow-100" },
        { id: 11, title: "Commercial Color Correction", thumbnail: "", color: "bg-lime-100" },
        { id: 12, title: "Music Video Look", thumbnail: "", color: "bg-emerald-100" }
      ]
    }
  ];

  // Load editor data based on ID
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (editorId) {
        const foundEditor = mockEditorsData.find(e => e.id === parseInt(editorId));
        setProfileData(foundEditor || null);
      } else {
        // If no ID provided, show first editor as default
        setProfileData(mockEditorsData[0]);
      }
      setIsLoading(false);
      
      console.log(`Editor data loaded for ID: ${editorId || 'default'}`);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [editorId]);
  
  // Handle chat button click
  const handleChatClick = () => {
    if (profileData) {
      console.log(`Starting chat with ${profileData.name}`);
      // In a real app, navigate to chat page with this editor
    }
  };
  
  // Handle hire button click
  const handleHireClick = () => {
    if (profileData) {
      console.log(`Hiring ${profileData.name}`);
      // In a real app, navigate to contract creation page
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 mx-auto"></div>
            <div className="w-32 h-3 bg-gray-200 rounded-full mb-3 mx-auto"></div>
            <div className="w-40 h-2 bg-gray-200 rounded-full mx-auto"></div>
          </div>
        </div>
      ) : profileData ? (
        // Editor profile
        <>
          {/* Profile Header */}
          <div className="p-6 bg-white shadow-sm text-center">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-gray-400">{profileData.name.charAt(0)}</span>
            </div>
            
            {/* Name */}
            <h1 className="text-xl font-bold mb-1">{profileData.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center justify-center mb-2">
              <div className="flex text-yellow-400 mr-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={i < Math.floor(profileData.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={i < Math.floor(profileData.rating) ? 0 : 1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-sm">{profileData.rating.toFixed(1)}</span>
            </div>
            
            {/* Availability Badge */}
            {profileData.availableForHire && (
              <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mb-3">
                {config.screens.profileVideoMaker.labels.availableForHire}
              </div>
            )}
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{profileData.description}</p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
              <div>
                <span className="font-medium">{profileData.completedProjects}</span> {config.screens.profileVideoMaker.labels.completed}
              </div>
              <div>
                <span className="font-medium">{profileData.projects}</span> {config.screens.profileVideoMaker.labels.total}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-3 mt-6">
              <Link
                href={`/chat?id=${profileData.id}`}
                className="flex-1 bg-white border border-blue-500 text-blue-500 py-2 rounded-md flex items-center justify-center space-x-1 hover:bg-blue-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{config.screens.profileVideoMaker.actions.chat}</span>
              </Link>
              
              <Link
                href={`/create-contract?editorId=${profileData.id}`}
                className="flex-1 bg-blue-500 text-white py-2 rounded-md flex items-center justify-center space-x-1 hover:bg-blue-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>{config.screens.profileVideoMaker.actions.hire}</span>
              </Link>
            </div>
          </div>
          
          {/* Portfolio */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">{config.screens.profileVideoMaker.labels.portfolio}</h2>
            <div className="grid grid-cols-2 gap-3">
              {profileData.portfolioItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Item Thumbnail */}
                  <div className={`aspect-video ${item.color} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Profile not found
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-gray-600 mb-4">{config.screens.profileVideoMaker.labels.notFound}</p>
          <Link href="/feed" className="text-blue-600">
            {config.screens.profileVideoMaker.labels.returnToFeed}
          </Link>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 