"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import config from '../../@config.json';

/**
 * Bottom navigation component for site-wide navigation
 * Displays icons and labels for main app sections
 * Highlights the active section based on current path
 * Can also highlight specific icons based on activeView prop
 */
export default function BottomNav({ activeView }: { activeView?: "creations" | "contracts" }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Check if we're on the detail page by looking at both pathname and query params
  const isDetailPage = pathname.endsWith('/detail') || pathname.includes('/detail');
  
  // Define types for navigation items
  type NavItem = {
    name: string;
    href: string;
  };

  // Define routes mapping - corrected paths without /app prefix
  const routes: Record<string, string> = {
    '/feed': 'Feed',
    '/search': 'Search',
    '/create': 'Create',
    '/my-profile?view=contracts': 'Contracts',
    '/my-profile?view=creations': 'Profile',
  };

  /**
   * Check if a navigation item is active based on the current pathname and activeView
   * @param currentPath - The current pathname
   * @param itemPath - The navigation item path
   * @param itemName - The navigation item name
   * @returns Whether the navigation item is active
   */
  const isActive = (currentPath: string, itemPath: string, itemName: string): boolean => {
    // If we're on the detail page, no navigation item should be active
    if (isDetailPage) {
      return false;
    }
    
    // Special case for feed (home)
    if (itemPath === '/feed' && (currentPath === '/' || currentPath === '/feed')) {
      return true;
    }
    
    // Special cases for My Profile page based on activeView
    if (currentPath.startsWith('/my-profile')) {
      if (itemName === 'Profile' && activeView === 'creations') {
        return true;
      }
      if (itemName === 'Contracts' && activeView === 'contracts') {
        return true;
      }
      return false;
    }
    
    // Normal case - check if current path starts with item path base (ignoring query params)
    const itemPathBase = itemPath.split('?')[0];
    return currentPath.startsWith(itemPathBase);
  };

  /**
   * Renders the highlighted home icon SVG
   * @returns SVG element for the highlighted home icon
   */
  const renderHighlightedHomeIcon = () => {
    return (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 8.00003C19 7.73481 18.8946 7.48046 18.7071 7.29292C18.5196 7.10539 18.2652 7.00003 18 7.00003C17.7348 7.00003 17.4804 7.10539 17.2929 7.29292C17.1054 7.48046 17 7.73481 17 8.00003H19ZM5 8.00003C5 7.73481 4.89464 7.48046 4.7071 7.29292C4.51957 7.10539 4.26521 7.00003 4 7.00003C3.73478 7.00003 3.48043 7.10539 3.29289 7.29292C3.10535 7.48046 3 7.73481 3 8.00003H5ZM19.293 10.707C19.4816 10.8892 19.7342 10.99 19.9964 10.9877C20.2586 10.9854 20.5094 10.8803 20.6948 10.6948C20.8802 10.5094 20.9854 10.2586 20.9877 9.99643C20.99 9.73423 20.8892 9.48163 20.707 9.29303L19.293 10.707ZM11 1.00003L11.707 0.293031C11.5195 0.105559 11.2652 0.000244141 11 0.000244141C10.7348 0.000244141 10.4805 0.105559 10.293 0.293031L11 1.00003ZM1.293 9.29303C1.19749 9.38528 1.1213 9.49562 1.0689 9.61763C1.01649 9.73963 0.988901 9.87085 0.987747 10.0036C0.986593 10.1364 1.01189 10.2681 1.06218 10.391C1.11246 10.5139 1.18671 10.6255 1.2806 10.7194C1.37449 10.8133 1.48615 10.8876 1.60904 10.9379C1.73194 10.9881 1.86362 11.0134 1.9964 11.0123C2.12918 11.0111 2.2604 10.9835 2.3824 10.9311C2.50441 10.8787 2.61475 10.8025 2.707 10.707L1.293 9.29303ZM6 20H16V18H6V20ZM19 17V8.00003H17V17H19ZM5 17V8.00003H3V17H5ZM20.707 9.29303L11.707 0.293031L10.293 1.70703L19.293 10.707L20.707 9.29303ZM10.293 0.293031L1.293 9.29303L2.707 10.707L11.707 1.70703L10.293 0.293031ZM16 20C16.7956 20 17.5587 19.684 18.1213 19.1214C18.6839 18.5587 19 17.7957 19 17H17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8947 16.2652 18 16 18V20ZM6 18C5.73478 18 5.48043 17.8947 5.29289 17.7071C5.10535 17.5196 5 17.2652 5 17H3C3 17.7957 3.31607 18.5587 3.87868 19.1214C4.44129 19.684 5.20435 20 6 20V18Z" fill="#ADADAD"/>
        <path d="M19 8.00003C19 7.73481 18.8946 7.48046 18.7071 7.29292C18.5196 7.10539 18.2652 7.00003 18 7.00003C17.7348 7.00003 17.4804 7.10539 17.2929 7.29292C17.1054 7.48046 17 7.73481 17 8.00003H19ZM5 8.00003C5 7.73481 4.89464 7.48046 4.7071 7.29292C4.51957 7.10539 4.26521 7.00003 4 7.00003C3.73478 7.00003 3.48043 7.10539 3.29289 7.29292C3.10535 7.48046 3 7.73481 3 8.00003H5ZM19.293 10.707C19.4816 10.8892 19.7342 10.99 19.9964 10.9877C20.2586 10.9854 20.5094 10.8803 20.6948 10.6948C20.8802 10.5094 20.9854 10.2586 20.9877 9.99643C20.99 9.73423 20.8892 9.48163 20.707 9.29303L19.293 10.707ZM11 1.00003L11.707 0.293031C11.5195 0.105559 11.2652 0.000244141 11 0.000244141C10.7348 0.000244141 10.4805 0.105559 10.293 0.293031L11 1.00003ZM1.293 9.29303C1.19749 9.38528 1.1213 9.49562 1.0689 9.61763C1.01649 9.73963 0.988901 9.87085 0.987747 10.0036C0.986593 10.1364 1.01189 10.2681 1.06218 10.391C1.11246 10.5139 1.18671 10.6255 1.2806 10.7194C1.37449 10.8133 1.48615 10.8876 1.60904 10.9379C1.73194 10.9881 1.86362 11.0134 1.9964 11.0123C2.12918 11.0111 2.2604 10.9835 2.3824 10.9311C2.50441 10.8787 2.61475 10.8025 2.707 10.707L1.293 9.29303ZM6 20H16V18H6V20ZM19 17V8.00003H17V17H19ZM5 17V8.00003H3V17H5ZM20.707 9.29303L11.707 0.293031L10.293 1.70703L19.293 10.707L20.707 9.29303ZM10.293 0.293031L1.293 9.29303L2.707 10.707L11.707 1.70703L10.293 0.293031ZM16 20C16.7956 20 17.5587 19.684 18.1213 19.1214C18.6839 18.5587 19 17.7957 19 17H17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8947 16.2652 18 16 18V20ZM6 18C5.73478 18 5.48043 17.8947 5.29289 17.7071C5.10535 17.5196 5 17.2652 5 17H3C3 17.7957 3.31607 18.5587 3.87868 19.1214C4.44129 19.684 5.20435 20 6 20V18Z" fill="url(#paint0_linear_32_385)"/>
        <defs>
          <linearGradient id="paint0_linear_32_385" x1="0.987709" y1="10.0001" x2="20.9877" y2="10.0001" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3E54F5"/>
            <stop offset="1" stopColor="#631497"/>
          </linearGradient>
        </defs>
      </svg>
    );
  };

  /**
   * Renders the highlighted search icon SVG
   * @returns SVG element for the highlighted search icon
   */
  const renderHighlightedSearchIcon = () => {
    return (
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.25 19L14.907 14.657M14.907 14.657C15.6499 13.9141 16.2392 13.0321 16.6412 12.0615C17.0433 11.0909 17.2502 10.0506 17.2502 8.99996C17.2502 7.94936 17.0433 6.90905 16.6412 5.93842C16.2392 4.96779 15.6499 4.08585 14.907 3.34296C14.1641 2.60007 13.2822 2.01078 12.3115 1.60874C11.3409 1.20669 10.3006 0.999756 9.25 0.999756C8.1994 0.999756 7.15908 1.20669 6.18845 1.60874C5.21782 2.01078 4.33589 2.60007 3.593 3.34296C2.09267 4.84329 1.24979 6.87818 1.24979 8.99996C1.24979 11.1217 2.09267 13.1566 3.593 14.657C5.09333 16.1573 7.12821 17.0002 9.25 17.0002C11.3718 17.0002 13.4067 16.1573 14.907 14.657Z" stroke="#ADADAD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.25 19L14.907 14.657M14.907 14.657C15.6499 13.9141 16.2392 13.0321 16.6412 12.0615C17.0433 11.0909 17.2502 10.0506 17.2502 8.99996C17.2502 7.94936 17.0433 6.90905 16.6412 5.93842C16.2392 4.96779 15.6499 4.08585 14.907 3.34296C14.1641 2.60007 13.2822 2.01078 12.3115 1.60874C11.3409 1.20669 10.3006 0.999756 9.25 0.999756C8.1994 0.999756 7.15908 1.20669 6.18845 1.60874C5.21782 2.01078 4.33589 2.60007 3.593 3.34296C2.09267 4.84329 1.24979 6.87818 1.24979 8.99996C1.24979 11.1217 2.09267 13.1566 3.593 14.657C5.09333 16.1573 7.12821 17.0002 9.25 17.0002C11.3718 17.0002 13.4067 16.1573 14.907 14.657Z" stroke="url(#paint0_linear_32_387)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="paint0_linear_32_387" x1="1.24979" y1="9.99986" x2="19.25" y2="9.99986" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3E54F5"/>
            <stop offset="1" stopColor="#631497"/>
          </linearGradient>
        </defs>
      </svg>
    );
  };

  // Create navigation items array from routes
  const navItems: NavItem[] = Object.entries(routes).map(([href, name]) => ({
    name,
    href,
  }));

  /**
   * Renders the appropriate icon based on the navigation item and active state
   * @param itemName - The navigation item name
   * @returns The icon element
   */
  const renderIcon = (itemName: string) => {
    // Special case for Feed when on feed page
    if (itemName === 'Feed' && (pathname === '/' || pathname === '/feed')) {
      return renderHighlightedHomeIcon();
    } 
    // Special case for Search when on search page
    else if (itemName === 'Search' && pathname === '/search') {
      return renderHighlightedSearchIcon();
    }
    // Handle special cases for Profile and Contracts when we have an activeView
    else if (itemName === 'Profile' && activeView === 'creations') {
      // Render highlighted person icon
      return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25 15C1.25 13.9391 1.67143 12.9217 2.42157 12.1716C3.17172 11.4214 4.18913 11 5.25 11H13.25C14.3109 11 15.3283 11.4214 16.0784 12.1716C16.8286 12.9217 17.25 13.9391 17.25 15C17.25 15.5304 17.0393 16.0391 16.6642 16.4142C16.2891 16.7893 15.7804 17 15.25 17H3.25C2.71957 17 2.21086 16.7893 1.83579 16.4142C1.46071 16.0391 1.25 15.5304 1.25 15Z" stroke="#ADADAD" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M1.25 15C1.25 13.9391 1.67143 12.9217 2.42157 12.1716C3.17172 11.4214 4.18913 11 5.25 11H13.25C14.3109 11 15.3283 11.4214 16.0784 12.1716C16.8286 12.9217 17.25 13.9391 17.25 15C17.25 15.5304 17.0393 16.0391 16.6642 16.4142C16.2891 16.7893 15.7804 17 15.25 17H3.25C2.71957 17 2.21086 16.7893 1.83579 16.4142C1.46071 16.0391 1.25 15.5304 1.25 15Z" stroke="url(#paint0_linear_32_393)" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M9.25 7C10.9069 7 12.25 5.65685 12.25 4C12.25 2.34315 10.9069 1 9.25 1C7.59315 1 6.25 2.34315 6.25 4C6.25 5.65685 7.59315 7 9.25 7Z" stroke="#ADADAD" strokeWidth="2"/>
          <path d="M9.25 7C10.9069 7 12.25 5.65685 12.25 4C12.25 2.34315 10.9069 1 9.25 1C7.59315 1 6.25 2.34315 6.25 4C6.25 5.65685 7.59315 7 9.25 7Z" stroke="url(#paint1_linear_32_393)" strokeWidth="2"/>
          <defs>
            <linearGradient id="paint0_linear_32_393" x1="1.25" y1="14" x2="17.25" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3E54F5"/>
              <stop offset="1" stopColor="#631497"/>
            </linearGradient>
            <linearGradient id="paint1_linear_32_393" x1="6.25" y1="4" x2="12.25" y2="4" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3E54F5"/>
              <stop offset="1" stopColor="#631497"/>
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (itemName === 'Contracts' && activeView === 'contracts') {
      // Render highlighted contract icon
      return (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 19C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V1H10L15 6V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H3Z" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 19C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V1H10L15 6V17C15 17.5304 14.7893 18.0391 14.4142 18.4142C14.0391 18.7893 13.5304 19 13 19H3Z" stroke="url(#paint0_linear_32_389)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 1V7H15M10 12.5L7 14.232V10.768L10 12.5Z" stroke="#ADADAD" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M9 1V7H15M10 12.5L7 14.232V10.768L10 12.5Z" stroke="url(#paint1_linear_32_389)" strokeWidth="2" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_32_389" x1="1" y1="10" x2="15" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3E54F5"/>
              <stop offset="1" stopColor="#631497"/>
            </linearGradient>
            <linearGradient id="paint1_linear_32_389" x1="7" y1="7.616" x2="15" y2="7.616" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3E54F5"/>
              <stop offset="1" stopColor="#631497"/>
            </linearGradient>
          </defs>
        </svg>
      );
    } else {
      // Default case - use Image component
      const active = isActive(pathname, getHrefByName(itemName), itemName);
      return (
        <Image 
          src={`/icons/${getIconName(itemName)}.svg`}
          width={30}
          height={30}
          alt={`${itemName} icon`}
          className={active ? 'active-icon' : ''}
        />
      );
    }
  };

  /**
   * Helper function to get the href by navigation item name
   * @param itemName - The navigation item name
   * @returns The href
   */
  const getHrefByName = (itemName: string): string => {
    // Find the href for the given name
    const entry = Object.entries(routes).find(([_, name]) => name === itemName);
    return entry ? entry[0] : '';
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-[42px] bg-[#FFFFFF] border-t border-gray-100 dark:bg-[#FFFFFF] dark:border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {/* Botón Create posicionado para que quede a la mitad entre el contenido y el footer */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 z-10">
        <Link
          href={config.routes.uploadProject}
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
                {renderIcon(item.name)}
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