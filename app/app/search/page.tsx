"use client";

import { useState } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Search page component allowing users to search for video editing projects
 * Includes search bar, filters, and search results grid
 */
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  
  // Mock categories for filters
  const categories = ["all", "3D", "motion", "editing", "color"];
  
  // Mock search results
  const [searchResults, setSearchResults] = useState([
    { id: 1, title: "3D Animation", price: 40, category: "3D", color: "bg-blue-100" },
    { id: 2, title: "Motion Graphics", price: 20, category: "motion", color: "bg-green-100" },
    { id: 3, title: "Video Editing", price: 10, category: "editing", color: "bg-purple-100" },
    { id: 4, title: "Color Grading", price: 35, category: "color", color: "bg-yellow-100" },
  ]);
  
  // Filter results based on search query, category, and price range
  const filteredResults = searchResults.filter(result => {
    // Text search
    const matchesQuery = searchQuery === "" || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "all" || 
      result.category === selectedCategory;
    
    // Price filter
    const matchesPrice = result.price >= priceRange.min && 
      result.price <= priceRange.max;
    
    return matchesQuery && matchesCategory && matchesPrice;
  });
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // In a real app, we would debounce this and make an API call
    console.log("Searching for:", value);
  };
  
  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center mb-4">
          {config.screens.search.title}
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={config.screens.search.placeholders.search}
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Filters Button */}
        <button
          onClick={toggleFilters}
          className="mt-3 w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md flex justify-center items-center"
        >
          {config.screens.search.placeholders.filters}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-2 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-3 p-4 bg-white border border-gray-200 rounded-md">
            {/* Category Filters */}
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Price Range: ${priceRange.min} - ${priceRange.max}
              </h3>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        {/* Search Results Count */}
        <p className="mb-3 text-sm text-gray-600">
          {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"} found
        </p>
        
        {/* Search Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredResults.map((result) => (
              <Link href={`/detail?id=${result.id}`} key={result.id}>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className={`relative aspect-video ${result.color} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{result.title}</h3>
                    <p className="text-blue-600 font-bold">${result.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-2">No results found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 