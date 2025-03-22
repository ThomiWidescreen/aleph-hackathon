"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import config from '../../@config.json';

/**
 * Bottom navigation component for site-wide navigation
 * Displays icons and labels for main app sections
 * Highlights the active section based on current path
 */
export default function BottomNav() {
  const pathname = usePathname();
  
  // Icon components for the nav items
  const navIcons = {
    feed: (isActive: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isActive ? 0 : 1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
        />
      </svg>
    ),
    search: (isActive: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isActive ? 0 : 1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
    ),
    create: (isActive: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isActive ? 0 : 1.5}
          d="M12 4v16m8-8H4" 
        />
      </svg>
    ),
    contracts: (isActive: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isActive ? 0 : 1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
    ),
    profile: (isActive: boolean) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isActive ? 0 : 1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    ),
  };

  // Map of routes to item names
  const routeToItemMap: {[key: string]: string} = {
    "/feed": "feed",
    "/search": "search",
    "/create": "create",
    "/my-profile": "profile",
    // Add mappings for contracts pages
    "/create-contract": "contracts",
    "/accept-contract": "contracts",
  };
  
  /**
   * Check if a nav item is active based on the current path
   * For contracts section, check multiple possible routes
   */
  const isItemActive = (route: string) => {
    const basePathname = pathname.split('?')[0]; // Remove query params for comparison
    
    if (route === "/feed" && basePathname === "/") {
      return true; // Home page also highlights feed
    }
    
    if (routeToItemMap[basePathname] && routeToItemMap[route] && 
        routeToItemMap[basePathname] === routeToItemMap[route]) {
      return true;
    }
    
    return basePathname === route;
  };

  /**
   * Render the icon for a nav item, using the mapping if available
   */
  const renderNavIcon = (name: string, isActive: boolean) => {
    // @ts-ignore - We know these keys exist
    const IconComponent = navIcons[name.toLowerCase()];
    
    if (IconComponent) {
      return IconComponent(isActive);
    }
    
    // Fallback icon if not found in the mapping
    return (
      <div className={`w-6 h-6 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
    );
  };

  // Log the current path for debugging
  console.log('Current path:', pathname);

  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 p-2 mt-auto z-10">
      <div className="flex justify-around items-center">
        {config.screens.bottomNav.items.map((item, index) => {
          const isActive = isItemActive(item.route);
          
          return (
            <Link 
              href={item.route} 
              key={index}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {renderNavIcon(item.name, isActive)}
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 