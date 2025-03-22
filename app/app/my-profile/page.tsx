"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * MyProfilePage component
 * Displays the current user's profile with their portfolio and profile editing options
 */
export default function MyProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    id: number;
    name: string;
    description: string;
    profileImage: string;
    rating: number;
    wallet: string;
    availableForHire: boolean;
    completedProjects: number;
    activeProjects: number;
    earnings: number;
    portfolioItems: Array<{
      id: number;
      title: string;
      thumbnail: string;
      color: string;
    }>;
  } | null>(null);

  // Load user profile data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock user data - in a real app, this would come from authentication and API
      setUserProfile({
        id: 201,
        name: "Your Name",
        description: "Professional video editor specializing in motion graphics and visual effects. I help brands tell their stories through compelling visual content.",
        profileImage: "",
        rating: 4.7,
        wallet: "0x1234...5678",
        availableForHire: true,
        completedProjects: 15,
        activeProjects: 2,
        earnings: 1250,
        portfolioItems: [
          { id: 1, title: "Brand Commercial", thumbnail: "", color: "bg-indigo-100" },
          { id: 2, title: "Product Animation", thumbnail: "", color: "bg-blue-100" },
          { id: 3, title: "Motion Graphics Pack", thumbnail: "", color: "bg-green-100" },
          { id: 4, title: "Event Recap", thumbnail: "", color: "bg-amber-100" },
        ]
      });
      setIsLoading(false);
      
      console.log("User profile data loaded");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle profile edit click
  const handleEditProfileClick = () => {
    console.log("Edit profile clicked");
    // Navigate to profile edit page
    window.location.href = "/edit-profile";
  };
  
  // Handle portfolio item click
  const handlePortfolioItemClick = (itemId: number) => {
    console.log(`Portfolio item clicked: ${itemId}`);
    // Navigate to portfolio item edit page
    window.location.href = `/edit-portfolio-item?id=${itemId}`;
  };

  // Handle availability toggle
  const handleAvailabilityToggle = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        availableForHire: !userProfile.availableForHire
      });
      console.log(`Availability toggled to: ${!userProfile.availableForHire}`);
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
      ) : userProfile ? (
        // User profile
        <>
          {/* Profile Header */}
          <div className="p-6 bg-white shadow-sm">
            <div className="flex items-center mb-4">
              {/* Profile Image */}
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-2xl text-blue-500">{userProfile.name.charAt(0)}</span>
              </div>
              
              <div className="flex-grow">
                {/* Name */}
                <h1 className="text-xl font-bold">{userProfile.name}</h1>
                
                {/* Wallet Address */}
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  {userProfile.wallet}
                </div>
                
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={i < Math.floor(userProfile.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={i < Math.floor(userProfile.rating) ? 0 : 1.5}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">{userProfile.rating.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Edit Profile Button */}
              <button 
                onClick={handleEditProfileClick}
                className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
                aria-label={config.screens.myProfile.actions.editProfile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{userProfile.description}</p>
            
            {/* Availability Toggle */}
            <div className="flex items-center mb-4">
              <span className="text-sm text-gray-600 mr-2">{config.screens.myProfile.labels.availableForHire}:</span>
              <button 
                onClick={handleAvailabilityToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  userProfile.availableForHire ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    userProfile.availableForHire ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 bg-gray-50">
              <div className="text-center">
                <p className="text-xs text-gray-500">{config.screens.myProfile.labels.completed}</p>
                <p className="font-semibold text-gray-800">{userProfile.completedProjects}</p>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-xs text-gray-500">{config.screens.myProfile.labels.active}</p>
                <p className="font-semibold text-gray-800">{userProfile.activeProjects}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">{config.screens.myProfile.labels.earnings}</p>
                <p className="font-semibold text-gray-800">${userProfile.earnings}</p>
              </div>
            </div>
          </div>
          
          {/* Portfolio */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{config.screens.myProfile.labels.portfolio}</h2>
              <button className="text-blue-600 text-sm">
                {config.screens.myProfile.labels.addWork}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {userProfile.portfolioItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                  onClick={() => handlePortfolioItemClick(item.id)}
                >
                  {/* Item Thumbnail */}
                  <div className={`aspect-video ${item.color} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium truncate">{item.title}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Error state
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-gray-600 mb-4">{config.screens.myProfile.labels.unableToLoad}</p>
          <button onClick={() => setIsLoading(true)} className="text-blue-600">
            {config.screens.myProfile.labels.retry}
          </button>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}