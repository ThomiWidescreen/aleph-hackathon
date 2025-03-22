"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * Welcome page component for user onboarding
 * Allows users to create a profile by entering username, description, and profile image
 */
export default function WelcomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    profileImage: null as string | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    description: ""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ 
            ...prev, 
            profileImage: event.target?.result as string 
          }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Validate form data
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", description: "" };
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log profile creation attempt with available data
      console.log("Creating profile with:", { 
        username: formData.username, 
        description: formData.description,
        hasProfileImage: !!formData.profileImage 
      });
      
      // In a real application, this would call an API to create the profile
      // For demo purposes, just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful profile creation, redirect to the feed
      router.push("/feed");
    } catch (error) {
      console.error("Error creating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#090619] p-4 font-montserrat relative overflow-hidden">
      {/* Background overlay with images */}
      <div className="absolute inset-0 opacity-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E54F5] to-[#631497] filter blur-md"></div>
        {/* This would be replaced with actual images in a real implementation */}
        <div className="grid grid-cols-3 gap-2 h-full w-full p-4">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-black bg-opacity-30 rounded-lg overflow-hidden">
              <div className="h-full w-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-70"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-white text-4xl font-bold mb-2">CLIPEO</h1>
        
        {/* Tagline */}
        <p className="text-white text-sm font-normal mb-12">
          Hire top video talent or get inspired
        </p>
        
        <form onSubmit={handleCreateProfile} className="w-full space-y-6">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-24 h-24 rounded-full bg-[#631497] flex flex-col items-center justify-center relative cursor-pointer overflow-hidden"
            >
              {formData.profileImage ? (
                <img 
                  src={formData.profileImage} 
                  alt="Profile preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <svg 
                    className="w-8 h-8 text-white mb-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </>
              )}
              <input 
                type="file" 
                className="opacity-0 absolute inset-0 cursor-pointer" 
                accept="image/*"
                onChange={handleImageUpload}
                aria-label="Upload profile image"
              />
            </div>
            <p className="text-white text-sm mt-2">Upload Photo</p>
          </div>
          
          {/* Username Input */}
          <div className="w-full">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-[#090619] border border-[#3E54F5] rounded-lg p-3 text-white placeholder-[#ADADAD] font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-[#3E54F5]"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          
          {/* Description Input */}
          <div className="w-full">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-[#090619] border border-[#3E54F5] rounded-lg p-3 min-h-[100px] text-white placeholder-[#ADADAD] font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-[#3E54F5] resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          
          {/* Create Profile Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-[#090619] font-montserrat text-sm font-medium py-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-400 disabled:text-gray-600 transition-colors mt-8"
          >
            {isSubmitting ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
      
      {/* Font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
} 