"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "next/navigation";

/**
 * Profile Video Maker page component
 * Shows a video editor's profile with options to chat or hire them
 */
export default function ProfileVideoMakerPage() {
  const searchParams = useSearchParams();
  const editorId = searchParams.get("id");
  const router = useRouter();
  
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
        { id: 1, title: "3D Product Animation", thumbnail: "https://images.unsplash.com/photo-1616763355609-2b5a87f5b1e5?q=80&w=150&auto=format", color: "bg-blue-100" },
        { id: 2, title: "Character Animation", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150&auto=format", color: "bg-indigo-100" },
        { id: 3, title: "Architectural Visualization", thumbnail: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=150&auto=format", color: "bg-purple-100" },
        { id: 4, title: "Product Demo", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format", color: "bg-green-100" }
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
        { id: 4, title: "Instagram Stories Pack", thumbnail: "https://images.unsplash.com/photo-1616763355609-2b5a87f5b1e5?q=80&w=150&auto=format", color: "bg-green-100" },
        { id: 5, title: "Corporate Animation", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150&auto=format", color: "bg-teal-100" },
        { id: 6, title: "App Promo Video", thumbnail: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=150&auto=format", color: "bg-cyan-100" },
        { id: 7, title: "Social Media Ad", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format", color: "bg-amber-100" }
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
        { id: 7, title: "Documentary Highlights", thumbnail: "https://images.unsplash.com/photo-1616763355609-2b5a87f5b1e5?q=80&w=150&auto=format", color: "bg-amber-100" },
        { id: 8, title: "Corporate Training", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150&auto=format", color: "bg-orange-100" },
        { id: 9, title: "Wedding Compilation", thumbnail: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=150&auto=format", color: "bg-rose-100" },
        { id: 10, title: "Music Video", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format", color: "bg-yellow-100" }
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
        { id: 10, title: "Feature Film Grading", thumbnail: "https://images.unsplash.com/photo-1616763355609-2b5a87f5b1e5?q=80&w=150&auto=format", color: "bg-yellow-100" },
        { id: 11, title: "Commercial Color Correction", thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150&auto=format", color: "bg-lime-100" },
        { id: 12, title: "Music Video Look", thumbnail: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?q=80&w=150&auto=format", color: "bg-emerald-100" },
        { id: 13, title: "Short Film Grading", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format", color: "bg-teal-100" }
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
      // Navigate to contract creation page with this editor's name
      router.push(`/create-contract?name=${encodeURIComponent(profileData.name)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090619]">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 mx-auto"></div>
            <div className="w-32 h-3 bg-gray-700 rounded-full mb-3 mx-auto"></div>
            <div className="w-40 h-2 bg-gray-700 rounded-full mx-auto"></div>
          </div>
        </div>
      ) : profileData ? (
        // Editor profile
        <main className="flex flex-col flex-grow">
          {/* Header with back button and chat icon */}
          <header className="bg-black p-4 shadow-sm flex justify-between items-center">
            <Link href="/feed" className="w-[30px] h-[30px] bg-black/25 backdrop-blur-sm rounded-full p-1 flex items-center justify-center">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </header>
          
          {/* Top section with dark background */}
          <div className="flex-none p-4 flex flex-col items-start text-left">
            {/* Profile Image and Name/Buttons in a row */}
            <div className="flex flex-row items-start space-x-4 mb-6">
              {/* Profile Image */}
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={profileData.portfolioItems[0]?.thumbnail || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=60&auto=format"} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Name and Buttons in a column */}
              <div className="flex flex-col space-y-2">
                {/* Name */}
                <h1 className="text-xl font-bold font-montserrat text-white">{profileData.name}</h1>
                
                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleChatClick}
                    className="bg-white text-[#3E54F5] py-1 px-6 rounded-full text-sm font-medium font-montserrat min-w-[80px]"
                  >
                    Chat
                  </button>
                  
                  <button
                    onClick={handleHireClick}
                    className="bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white py-1 px-6 rounded-full text-sm font-medium font-montserrat min-w-[80px]"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-[#C5C5C5] text-base font-normal font-montserrat mb-6">
              {profileData.description}
            </p>
          </div>
          
          {/* White container that extends to the bottom */}
          <div className="flex-grow flex flex-col bg-white mt-4 rounded-t-2xl p-4 pt-6 pb-24">
            <div className="grid grid-cols-2 gap-3">
              {profileData.portfolioItems.map((item) => (
                <div key={item.id} className="relative overflow-hidden">
                  {/* Price Tag */}
                  <div className="absolute top-2 right-2 bg-black/25 backdrop-blur-sm text-white text-sm font-medium font-montserrat rounded-full py-1 px-2">
                    $300
                  </div>
                  
                  {/* Portfolio Image */}
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-[150px] rounded-xl object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        // Profile not found
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-white mb-4">{config.screens.profileVideoMaker.labels.notFound}</p>
          <Link href="/feed" className="text-[#3E54F5]">
            {config.screens.profileVideoMaker.labels.returnToFeed}
          </Link>
        </div>
      )}
      <BottomNav />
    </div>
  );
}