"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * MyProfilePage component
 * Displays the current user's profile with their creations and contracts
 * Handles view switching based on URL query parameters
 */
export default function MyProfilePage() {
  // Access search params and router for navigation
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // User profile state
  const [userProfile, setUserProfile] = useState<{
    id: string;
    name: string;
    description: string;
    profileImage: string;
    creations: Array<{
      id: string;
      title: string;
      thumbnail: string;
      description: string;
    }>;
    contracts: Array<{
      id: string;
      title: string;
      status: "in_progress" | "completed" | "expires_soon";
      description: string;
      price: number;
    }>;
  } | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Active view state (creations or contracts)
  // Default to "contracts" but check URL params on mount
  const [activeView, setActiveView] = useState<"creations" | "contracts">("contracts");

  // Update active view based on URL query parameter
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'creations' || viewParam === 'contracts') {
      setActiveView(viewParam);
    }
  }, [searchParams]);

  // Function to handle view change and update URL
  const handleViewChange = (view: "creations" | "contracts") => {
    router.push(`/my-profile?view=${view}`);
    setActiveView(view);
  };

  // Load user profile data
  useEffect(() => {
    const loadUserData = () => {
      // Log the start of data loading
      console.log("Loading user profile data...");
      
      // Simulate API call delay
      setTimeout(() => {
        // Mock user data - in a real app, this would come from an API
        setUserProfile({
          id: "user-001",
          name: "Fransctis",
          description: "Passionate home chef sharing tasty recipes, cooking hacks, and flavor-packed content straight from the kitchen to your screen.",
          profileImage: "",
          creations: [
            { 
              id: "creation-001", 
              title: "Cooking Japanese Ramen", 
              thumbnail: "", 
              description: "A step-by-step guide to making authentic ramen at home."
            },
            { 
              id: "creation-002", 
              title: "Vietnamese Pho Recipe", 
              thumbnail: "", 
              description: "Learn how to cook traditional Vietnamese pho with fresh ingredients."
            }
          ],
          contracts: [
            { 
              id: "contract-001", 
              title: "Video vlog from Japan", 
              status: "in_progress", 
              description: "Raw video editing, to create two YouTube videos...",
              price: 300
            },
            { 
              id: "contract-002", 
              title: "Video vlog from Vietnam", 
              status: "completed", 
              description: "Raw video editing, to create two YouTube videos...",
              price: 300
            },
            { 
              id: "contract-003", 
              title: "Tiktok video", 
              status: "expires_soon", 
              description: "Raw video editing...",
              price: 150
            }
          ]
        });
        
        setIsLoading(false);
        console.log("User profile data loaded successfully");
      }, 500);
    };
    
    loadUserData();
  }, []);

  /**
   * Renders status indicator with appropriate color based on contract status
   * @param status Contract status
   * @returns JSX Element with colored status indicator
   */
  const renderStatusIndicator = (status: string) => {
    let statusColor = "";
    let textColor = "";
    let statusText = "";
    
    switch (status) {
      case "in_progress":
        statusColor = "bg-yellow-500";
        textColor = "text-yellow-500";
        statusText = "In progress";
        break;
      case "completed":
        statusColor = "bg-green-500";
        textColor = "text-green-500";
        statusText = "Completed";
        break;
      case "expires_soon":
        statusColor = "bg-orange-500";
        textColor = "text-orange-500";
        statusText = "Expires soon";
        break;
      default:
        statusColor = "bg-gray-500";
        textColor = "text-gray-500";
        statusText = "Unknown";
    }
    
    return (
      <div className="flex items-center gap-1.5">
        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
        <span className={`text-sm font-normal font-montserrat ${textColor}`}>{statusText}</span>
      </div>
    );
  };

  /**
   * Renders a video thumbnail with placeholder
   * @returns JSX Element with video thumbnail
   */
  const renderVideoThumbnail = () => {
    return (
      <div className="aspect-video bg-[#ADADAD] rounded-lg flex items-center justify-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-[#ADADAD] rounded-full mb-4 mx-auto"></div>
            <div className="w-32 h-3 bg-[#ADADAD] rounded-full mb-3 mx-auto"></div>
            <div className="w-40 h-2 bg-[#ADADAD] rounded-full mx-auto"></div>
          </div>
        </div>
      ) : userProfile ? (
        // User profile content
        <>
          {/* Header with back button and chat icon */}
          <div className="flex justify-between items-center p-4 bg-[#090619]">
            <Link href="/feed" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-white">
              {/* Updated chat bubble icon from design guidelines */}
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Profile Header - moved up by adding negative margin-top */}
          <div className="p-6 bg-[#090619] -mt-4">
            <div className="flex items-center mb-4">
              {/* Profile Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden">
                {userProfile.profileImage ? (
                  <img 
                    src={userProfile.profileImage} 
                    alt={userProfile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#ADADAD] flex items-center justify-center">
                    <span className="text-2xl text-white font-montserrat">{userProfile.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="ml-4">
                {/* Name */}
                <h1 className="text-xl font-bold text-white mb-3 font-montserrat">{userProfile.name}</h1>
                
                {/* Edit Button - made 15% smaller and text centered */}
                <Link 
                  href="/edit-profile"
                  className="px-4 py-1 bg-white text-[#090619] rounded-full text-sm font-medium inline-block font-montserrat w-[85%] text-center flex items-center justify-center"
                >
                  Edit
                </Link>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-[#ADADAD] text-sm font-normal font-montserrat mt-4">{userProfile.description}</p>
          </div>
          
          {/* White background container with toggle and content - also adjust to match the profile header movement */}
          <div className="flex-grow bg-white rounded-t-2xl pt-4 px-4 pb-24 -mt-2">
            {/* Toggle with gradient text for active button - swapped order */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200">
              {/* Contracts tab (now first/left) */}
              <button 
                className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${
                  activeView === "contracts" 
                    ? "border-b-2 border-gradient-blue-purple" 
                    : "text-[#ADADAD] border-b-2 border-transparent"
                }`}
                onClick={() => handleViewChange("contracts")}
              >
                <span className={activeView === "contracts" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
                  Contracts
                </span>
              </button>
              
              {/* Creations tab (now second/right) */}
              <button 
                className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${
                  activeView === "creations" 
                    ? "border-b-2 border-gradient-blue-purple" 
                    : "text-[#ADADAD] border-b-2 border-transparent"
                }`}
                onClick={() => handleViewChange("creations")}
              >
                <span className={activeView === "creations" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
                  Creations
                </span>
              </button>
            </div>
            
            {/* Content based on active view */}
            {activeView === "creations" ? (
              // Creations View
              <div className="space-y-4">
                {userProfile.creations.map((creation) => (
                  <div key={creation.id} className="bg-[#090619] rounded-xl overflow-hidden p-4 mb-4 border border-gray-800">
                    {renderVideoThumbnail()}
                    <h3 className="text-white text-lg font-semibold mb-1 font-montserrat">{creation.title}</h3>
                    <p className="text-[#ADADAD] text-sm font-montserrat font-normal">{creation.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Contracts View
              <div className="space-y-4">
                {userProfile.contracts.map((contract) => (
                  <div key={contract.id} className="bg-[#2d2c30] rounded-xl overflow-hidden p-4 mb-4 border border-gray-800">
                    <h3 className="text-white text-lg font-semibold mb-1 font-montserrat">{contract.title}</h3>
                    {renderStatusIndicator(contract.status)}
                    <p className="text-[#ADADAD] text-sm my-2 font-montserrat font-normal">{contract.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[#3E54F5] font-semibold font-montserrat">
                        <span className="font-light">$</span>{contract.price}
                      </span>
                      <Link 
                        href={`/contract/${contract.id}`}
                        className="px-4 py-1 bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white rounded-full text-sm font-medium font-montserrat"
                      >
                        ver
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        // Error state
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-[#ADADAD] mb-4 font-montserrat">Unable to load profile</p>
          <button onClick={() => setIsLoading(true)} className="text-[#3E54F5] font-montserrat">
            Retry
          </button>
        </div>
      )}
      
      {/* Bottom Navigation with activeView prop */}
      <BottomNav activeView={activeView} />
      
      {/* Custom styles for gradient border and text */}
      <style jsx global>{`
        .border-gradient-blue-purple {
          border-image: linear-gradient(to right, #3E54F5, #631497) 1;
        }
      `}</style>
    </div>
  );
}