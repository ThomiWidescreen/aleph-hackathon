"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";
import { createVideo } from "../api/actions/file/createVideo";

/**
 * CreateVideoPage component
 * Allows users to upload videos to their portfolio
 */
export default function CreateVideoPage() {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    tags: [],
  });
  
  const [file, setFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (reader.result) {
          setFile(reader.result.toString()); // Save Base64 string
        }
      };
  
      reader.readAsDataURL(file); // Convert file to Base64
  
      if (errors.file) {
        setErrors({ ...errors, file: "" });
      }
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        if (reader.result) {
          setFile(reader.result.toString()); // Save Base64 string
        }
      };
  
      reader.readAsDataURL(file); // Convert file to Base64
  
      if (errors.file) {
        setErrors({ ...errors, file: "" });
      }
    }
  };
  
  // Trigger file input click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!video.title.trim()) {
      newErrors.title = config.screens.createVideo.validation.titleRequired;
    }
    
    if (!video.description.trim()) {
      newErrors.description = config.screens.createVideo.validation.descriptionRequired;
    }
    
    if (!video.category) {
      newErrors.category = config.screens.createVideo.validation.categoryRequired;
    }
    
    if (!video.price) {
      newErrors.price = config.screens.createVideo.validation.priceRequired;
    }
    
    if (!file) {
      newErrors.file = config.screens.createVideo.validation.fileRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsUploading(true);
    
    // Simulate API call
    try {
      // In a real app, you would upload the file to a storage service
      // and save the video metadata to your database
      console.log("Uploading video:", { ...video, file });
      

      //TODO: authorAddress traer de la blockchain
      // Simulate delay
      await createVideo({
        title: video.title,
        description: video.description,
        category: video.category,
        price: parseFloat(video.price),
        tags: video.tags.split(",").map((tag) => tag.trim()),
        authorAddress: "0x0c892815f0B058E69987920A23FBb33c834289cf",
        videoData: file || ""
      })
      
      // Redirect to portfolio
      window.location.href = "/my-profile";
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrors({
        ...errors,
        submit: config.screens.createVideo.errors.uploadFailed
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Navigate back to profile
    window.location.href = "/my-profile";
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">
          {config.screens.createVideo.title}
        </h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-4 text-black">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.title}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={video.title}
              onChange={handleChange}
              placeholder={config.screens.createVideo.placeholders.title}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.description}
            </label>
            <textarea
              id="description"
              name="description"
              value={video.description}
              onChange={handleChange}
              placeholder={config.screens.createVideo.placeholders.description}
              rows={3}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.category}
            </label>
            <select
              id="category"
              name="category"
              value={video.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar categoría</option>
              <option value="motion_graphics">Motion Graphics</option>
              <option value="3d_animation">3D Animation</option>
              <option value="color_grading">Color Grading</option>
              <option value="vfx">Visual Effects</option>
              <option value="editing">Video Editing</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">{errors.category}</p>
            )}
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.price}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={video.price}
                onChange={handleChange}
                placeholder={config.screens.createVideo.placeholders.price}
                min="0"
                step="0.01"
                className={`w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.tags}
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={video.tags}
              onChange={handleChange}
              placeholder={config.screens.createVideo.placeholders.tags}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {config.screens.createVideo.labels.selectFile}
            </label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              } ${errors.file ? 'border-red-500' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">{config.screens.createVideo.labels.dragDrop}</p>
                  <button
                    type="button"
                    className="ml-1 text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                    onClick={handleBrowseClick}
                  >
                    {config.screens.createVideo.labels.browse}
                  </button>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                </div>
                {/* {file && (
                  <p className="text-sm text-gray-500 mt-2">
                    {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )} */}
              </div>
            </div>
            {errors.file && (
              <p className="mt-1 text-sm text-red-500">{errors.file}</p>
            )}
          </div>
          
          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {errors.submit}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isUploading}
            >
              {config.screens.createVideo.actions.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {config.screens.createVideo.actions.processing}
                </span>
              ) : (
                config.screens.createVideo.actions.upload
              )}
            </button>
          </div>
        </form>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 