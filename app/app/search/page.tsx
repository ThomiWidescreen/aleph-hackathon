"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Search page component that displays a search bar and featured categories
 * Matches the Figma design with large category cards and text overlays
 */
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Category items with titles and image URLs
  const categories = [
    {
      id: 1,
      title: "FITNESS",
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format"
    },
    {
      id: 2,
      title: "COOKING",
      imageUrl: "https://images.unsplash.com/photo-1556909114-44e3e9699e2b?q=80&w=800&auto=format"
    },
    {
      id: 3,
      title: "LIFESTYLE",
      imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=800&auto=format"
    },
    {
      id: 4,
      title: "STREAMING",
      imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format"
    },
    {
      id: 5,
      title: "BLOG",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format"
    },
    {
      id: 6,
      title: "PRODUCT REVIEWS",
      imageUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800&auto=format"
    }
  ];
  
  // Mock user search results
  const mockUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sarah Miller",
      username: "@sarahm",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "James Wilson",
      username: "@jamesw",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    {
      id: 4,
      name: "Maria Garcia",
      username: "@mariag",
      avatar: "https://randomuser.me/api/portraits/women/58.jpg"
    }
  ];
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // In a real app, we would debounce this and make an API call
    console.log("Searching for:", value);
  };

  // Filter mock users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF9]">
      {/* Header with logo and chat icon */}
      <header className="sticky top-0 z-10 bg-black p-4 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold font-montserrat text-white">LOGO</h1>
        
        <Link href="/chat">
          <Image 
            src="/icons/chat.svg"
            width={30}
            height={30}
            alt="Chat"
            className="w-[30px] h-[30px]"
          />
        </Link>
      </header>
      
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg 
              width="21" 
              height="20" 
              viewBox="0 0 21 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path 
                d="M19.25 19L14.907 14.657M14.907 14.657C15.6499 13.9141 16.2392 13.0321 16.6412 12.0615C17.0433 11.0909 17.2502 10.0506 17.2502 8.99996C17.2502 7.94936 17.0433 6.90905 16.6412 5.93842C16.2392 4.96779 15.6499 4.08585 14.907 3.34296C14.1641 2.60007 13.2822 2.01078 12.3115 1.60874C11.3409 1.20669 10.3006 0.999756 9.25 0.999756C8.1994 0.999756 7.15908 1.20669 6.18845 1.60874C5.21782 2.01078 4.33589 2.60007 3.593 3.34296C2.09267 4.84329 1.24979 6.87818 1.24979 8.99996C1.24979 11.1217 2.09267 13.1566 3.593 14.657C5.09333 16.1573 7.12821 17.0002 9.25 17.0002C11.3718 17.0002 13.4067 16.1573 14.907 14.657Z" 
                stroke="#ADADAD" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={config.screens.search.placeholders.search}
            className="w-full p-3 pl-10 bg-white border-[2.8px] border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#3E54F5] text-black"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-4 pb-24">
        {searchQuery.length > 0 ? (
          /* User search results */
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-gray-700">Users</h3>
            
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                  <Image 
                    src={user.avatar}
                    width={50}
                    height={50}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-semibold text-black">{user.name}</h4>
                    <p className="text-gray-500 text-sm">{user.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No users found matching "{searchQuery}"
              </div>
            )}
          </div>
        ) : (
          /* Categories display */
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <div key={category.id} className="relative h-[150px] w-full rounded-2xl overflow-hidden">
                <Image 
                  src={category.imageUrl}
                  alt={category.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Category title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-xl font-bold font-montserrat text-white text-center px-4">
                    {category.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 