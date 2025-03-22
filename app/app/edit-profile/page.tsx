"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * EditProfilePage component
 * Allows users to edit their profile information
 */
export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    availableForHire: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load profile data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      setProfile({
        name: "Your Name",
        description: "Professional video editor specializing in motion graphics and visual effects. I help brands tell their stories through compelling visual content.",
        availableForHire: true,
      });
      setIsLoading(false);
      console.log("Profile data loaded");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  
  // Handle availability toggle
  const handleAvailabilityToggle = () => {
    setProfile({
      ...profile,
      availableForHire: !profile.availableForHire
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call
    try {
      console.log("Saving profile:", profile);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      // After successful save, hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Cancel edit and return to profile
  const handleCancel = () => {
    window.location.href = "/my-profile";
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">
          {config.screens.myProfile.actions.editProfile}
        </h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        {isLoading ? (
          // Loading state
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">Perfil actualizado correctamente.</span>
              </div>
            )}
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Availability Toggle */}
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">
                {config.screens.myProfile.labels.availableForHire}:
              </span>
              <button 
                type="button"
                onClick={handleAvailabilityToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  profile.availableForHire ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span 
                  className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                    profile.availableForHire ? 'translate-x-6' : 'translate-x-1'
                  }`} 
                />
              </button>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  "Guardar cambios"
                )}
              </button>
            </div>
          </form>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 