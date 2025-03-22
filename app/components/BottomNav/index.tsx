"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import config from '../../@config.json';

/**
 * Bottom navigation component for site-wide navigation
 * Displays icons and labels for main app sections
 * Highlights the active section based on current path
 */
export default function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Check if we're on the detail page by looking at both pathname and query params
  const isDetailPage = pathname.endsWith('/detail') || pathname.includes('/detail');
  
  // Define types for navigation items
  type NavItem = {
    name: string;
    href: string;
  };

  // Define routes mapping
  const routes: Record<string, string> = {
    '/feed': 'Feed',
    '/search': 'Search',
    '/create': 'Create',
    '/contracts': 'Contracts',
    '/profile': 'Profile',
  };

  /**
   * Check if a navigation item is active based on the current pathname
   * @param currentPath - The current pathname
   * @param itemPath - The navigation item path
   * @returns Whether the navigation item is active
   */
  const isActive = (currentPath: string, itemPath: string): boolean => {
    // If we're on the detail page, no navigation item should be active
    if (isDetailPage) {
      return false;
    }
    
    // Special case for feed (home)
    if (itemPath === '/feed' && currentPath === '/') {
      return true;
    }
    
    // Normal case - check if current path starts with item path
    return currentPath.startsWith(itemPath);
  };

  // Create navigation items array from routes
  const navItems: NavItem[] = Object.entries(routes).map(([href, name]) => ({
    name,
    href,
  }));

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
        {navItems.map((item, index) => {
          const active = isActive(pathname, item.href);
          
          // Special case for Create button - now just a placeholder to maintain grid structure
          if (item.name === 'Create') {
            return (
              <div key={item.name} className="inline-flex flex-col items-center justify-center px-5 relative">
                {/* Espacio vacío para mantener la estructura de la grid */}
              </div>
            );
          }
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <div className="flex items-center justify-center">
                <Image 
                  src={`/icons/${getIconName(item.name)}.svg`}
                  width={30}
                  height={30}
                  alt={`${item.name} icon`}
                  className={active ? 'active-icon' : ''}
                />
              </div>
            </Link>
          );
        })}
      </div>
      
      <style jsx global>{`
        .active-icon path {
          stroke: #3E54F5;
        }
        .active-icon circle, .active-icon path[fill="#ADADAD"] {
          fill: #3E54F5;
        }
      `}</style>
    </div>
  );
}

/**
 * Helper function to get the icon name based on the navigation item name
 * @param itemName - The navigation item name
 * @returns The icon file name
 */
function getIconName(itemName: string): string {
  switch (itemName.toLowerCase()) {
    case 'feed':
      return 'house';
    case 'search':
      return 'glass';
    case 'contracts':
      return 'contract';
    case 'profile':
      return 'profile';
    default:
      return itemName.toLowerCase();
  }
} 