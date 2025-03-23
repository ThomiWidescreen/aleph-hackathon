"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadPhotoProfile } from "../api/helpers/uploadFile";
import { url } from "inspector";
import { createUser } from "../api/actions/users/createUser";
import { get } from "http";
import { getUserAddress } from "../api/helpers/getUserAddress";

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
      
      // Convert profile image to Base64
      let imageBase64 = '';
      if (formData.profileImage) {
        const response = await fetch(formData.profileImage);
        const blob = await response.blob();
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
      
      const urlImage = await uploadPhotoProfile(imageBase64);

      //TODO: para Alejo: revisar si aca se obtiene la user address asi, cuando firma el contrato.
      //TODO: también revisar si el user ya existe en DB para evitar esta pantalla al abrir la miniApp
      const address = getUserAddress();

      const user = await createUser({address, name: formData.username, description: formData.description, photo: urlImage});

      console.log({user});
      
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
      {/* Background overlay with image */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Primera capa: imagen de fondo */}
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: 'url("/images/FONDO.png")' }}>
        </div>
        
        {/* Segunda capa: overlay para oscurecer y realzar el contenido */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090619]/30 to-[#090619]/70"></div>
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
              className="w-32 h-32 rounded-full bg-gradient-to-r from-[#3E54F5] to-[#631497] flex flex-col items-center justify-center relative cursor-pointer overflow-hidden"
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
                    width="33" 
                    height="33" 
                    viewBox="0 0 33 33" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-2"
                  >
                    <path d="M3.16669 19.8334C3.16669 20.6213 3.32188 21.4015 3.62341 22.1295C3.92494 22.8574 4.3669 23.5189 4.92405 24.076C6.04927 25.2012 7.57539 25.8334 9.16669 25.8334H25.1667C26.348 25.8355 27.4861 25.3896 28.3515 24.5855C29.2169 23.7815 29.7452 22.6791 29.8298 21.5009C29.9144 20.3226 29.549 19.1561 28.8073 18.2367C28.0656 17.3173 27.0028 16.7133 25.8334 16.5467C25.8464 14.2784 25.0329 12.083 23.5449 10.3708C22.057 8.6587 19.9964 7.54704 17.7485 7.24366C15.5005 6.94029 13.219 7.46596 11.3304 8.72241C9.4418 9.97887 8.07543 11.8801 7.48669 14.0707C6.23996 14.4343 5.14486 15.1927 4.36589 16.2318C3.58691 17.2709 3.16611 18.5347 3.16669 19.8334Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M19.1667 15.1667L16.5 12.5M16.5 12.5L13.8334 15.1667M16.5 12.5V20.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p className="text-white text-sm">Upload Photo</p>
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
          </div>
          
          {/* Username Input */}
          <div className="w-full">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full bg-[#090619]/70 backdrop-blur-sm border border-[#3E54F5] rounded-lg p-3 text-white placeholder-[#ADADAD] font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-[#3E54F5]"
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
              className="w-full bg-[#090619]/70 backdrop-blur-sm border border-[#3E54F5] rounded-lg p-3 min-h-[100px] text-white placeholder-[#ADADAD] font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-[#3E54F5] resize-none"
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