"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "../../@config.json";

/**
 * Welcome page component for user onboarding
 * Allows users to create a profile by entering name, description, and profile image
 */
export default function WelcomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Log profile creation attempt
      console.log("Creating profile with:", { name, description });
      
      // In a real application, this would call an API to create the profile
      // For demo purposes, just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful profile creation, redirect to the feed
      router.push("/feed");
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {config.screens.welcome.title}
        </h1>
        
        <form onSubmit={handleCreateProfile} className="space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2 relative cursor-pointer">
              <span className="text-3xl text-gray-400">+</span>
              {/* Hidden file input for image upload */}
              <input 
                type="file" 
                className="opacity-0 absolute inset-0" 
                accept="image/*"
                aria-label="Upload profile image"
              />
            </div>
            <p className="text-sm text-gray-500">Add profile image</p>
          </div>
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="sr-only">
              {config.screens.welcome.placeholders.name}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={config.screens.welcome.placeholders.name}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Description Input */}
          <div>
            <label htmlFor="description" className="sr-only">
              {config.screens.welcome.placeholders.description}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={config.screens.welcome.placeholders.description}
              className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>
          
          {/* Create Profile Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? "Creating..." : config.screens.welcome.placeholders.button}
          </button>
        </form>
      </div>
    </div>
  );
} 