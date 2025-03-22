"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "../../components/BottomNav";
import FileUploadArea from "../../components/FileUploadArea";
import FormField from "../../components/FormField";
import config from "../../@config.json";

/**
 * CreateVideoPage - Allows users to upload and publish video content
 * 
 * This page provides a form interface for video creators to:
 * 1. Upload video files with drag & drop functionality
 * 2. Add metadata like title, description, price, and tags
 * 3. Validate and submit the form
 * 
 * The page uses modular components to handle form fields and file upload
 * for better code maintainability and reuse.
 */
export default function CreateVideoPage() {
  const router = useRouter();
  
  // Form data state
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    price: 0,
    tags: ""
  });
  
  // Video file state
  const [file, setFile] = useState<File | null>(null);
  
  // Validation errors state
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    file: ""
  });

  /**
   * Updates a specific error field
   * @param field The error field to update
   * @param value The new error message
   */
  const updateError = useCallback((field: keyof typeof errors, value: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  /**
   * Handles changes in form fields
   * @param e Change event in input or textarea
   */
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error if user starts typing
    if (errors[name as keyof typeof errors]) {
      updateError(name as keyof typeof errors, "");
    }
  }, [errors, updateError]);

  /**
   * Validates form before submission
   * @returns Boolean indicating if form is valid
   */
  const validateForm = useCallback((): boolean => {
    const newErrors = {
      title: "",
      description: "",
      file: ""
    };
    
    let isValid = true;
    
    // Validate title
    if (!videoData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    
    // Validate description
    if (!videoData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    
    // Validate file
    if (!file) {
      newErrors.file = "You must select a video file";
      isValid = false;
    }
    
    setErrors(newErrors);
    console.log("Form validation result:", isValid);
    return isValid;
  }, [videoData, file]);

  /**
   * Handles form submission
   * @param e Form submit event
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (validateForm()) {
      console.log("Video published:", {
        ...videoData,
        file: file?.name
      });
      
      // Redirect to profile page with creations view
      router.push("/my-profile?view=creations");
    }
  }, [validateForm, videoData, file, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {/* Header with back button and chat icon */}
      <div className="pt-4 px-4 pb-2 bg-[#090619]">
        <div className="flex justify-between items-center">
          <Link href="/my-profile?view=creations" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="text-white">
            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main container */}
      <div className="flex-grow bg-white rounded-t-2xl px-6 pt-5 pb-24">
        <h1 className="text-[#090619] font-montserrat text-xl font-bold mb-5">
          Upload project
        </h1>
        
        <form onSubmit={handleSubmit}>
          {/* File upload area - using reusable component */}
          <FileUploadArea 
            file={file} 
            setFile={setFile} 
            error={errors.file}
            onErrorChange={(value) => updateError("file", value)}
            placeholderText="Upload a video file"
          />
          
          {/* Form fields - using reusable components */}
          <FormField
            name="title"
            value={videoData.title}
            onChange={handleInputChange}
            placeholder="Title"
            error={errors.title}
            required
          />
          
          <FormField
            name="description"
            value={videoData.description}
            onChange={handleInputChange}
            placeholder="Description"
            multiline={true}
            error={errors.description}
            required
          />
          
          <FormField
            name="price"
            value={videoData.price || ""}
            onChange={handleInputChange}
            placeholder="Price"
            type="number"
            min={0}
            step="0.01"
          />
          
          <FormField
            name="tags"
            value={videoData.tags}
            onChange={handleInputChange}
            placeholder="Tags"
            className="mb-8"
          />
          
          {/* Publish button */}
          <button
            type="submit"
            className={`w-full ${config.gradients.primary} text-white font-montserrat text-sm font-medium rounded-full py-3`}
          >
            Publish
          </button>
        </form>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav activeView="creations" />
      
      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
} 