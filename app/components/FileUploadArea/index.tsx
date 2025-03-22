"use client";

import { useState, useRef, ChangeEvent, useCallback } from "react";
import config from "../../@config.json";

/**
 * Reusable component for file upload area with drag and drop functionality
 * 
 * @param file - The currently selected file or null if no file is selected
 * @param setFile - Function to update the selected file
 * @param error - Error message to display if there's an issue with the file
 * @param onErrorChange - Function to update the error message
 * @param acceptedFileTypes - MIME types to accept (default: "video/*")
 * @param placeholderText - Text to display when no file is selected
 * @returns A styled file upload area with drag and drop support
 */
export default function FileUploadArea({
  file,
  setFile,
  error,
  onErrorChange,
  acceptedFileTypes = "video/*",
  placeholderText = "Upload a video file"
}: {
  file: File | null;
  setFile: (file: File | null) => void;
  error: string;
  onErrorChange: (error: string) => void;
  acceptedFileTypes?: string;
  placeholderText?: string;
}) {
  // Reference to hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Track whether user is currently dragging a file over the area
  const [isDragging, setIsDragging] = useState(false);
  
  /**
   * Handles file selection through input element
   * @param e Change event from file input
   */
  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      onErrorChange(""); // Clear any previous error
      console.log("File selected:", selectedFile.name);
    }
  }, [setFile, onErrorChange]);

  /**
   * Opens file selector when user clicks on the upload area
   */
  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Handles drag enter/leave/over events to update drag state
   * @param e Drag event from div element
   * @param isDragging Whether the user is dragging over the element
   */
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>, isDragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isDragging);
  }, []);

  /**
   * Handles file drop event
   * @param e Drop event from div element
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    const fileTypePrefix = acceptedFileTypes.replace('/*', '/');
    
    if (droppedFile && droppedFile.type.startsWith(fileTypePrefix)) {
      setFile(droppedFile);
      onErrorChange(""); // Clear any previous error
      console.log("File uploaded by drag:", droppedFile.name);
    } else {
      onErrorChange(`File must be a ${acceptedFileTypes.split('/')[0]}`);
    }
  }, [setFile, onErrorChange, acceptedFileTypes]);

  return (
    <div 
      className={`aspect-video mb-4 rounded-lg flex flex-col items-center justify-center cursor-pointer
        ${isDragging ? 'border-2 border-blue-400 bg-[#F3DDFF]' : `bg-[${config.colors.fileUploadBackground}]`}`}
      onClick={handleClickUpload}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => handleDrag(e, true)}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="flex flex-col items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3E54F5] mb-2">
            <path d="M21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7M21 7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7M21 7L12 13L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-[#3E54F5] font-montserrat text-sm font-normal">
            {file.name}
          </p>
        </div>
      ) : (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ADADAD] mb-2">
            <path d="M12 16V8M12 8L16 12M12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <p className="text-[#ADADAD] font-montserrat text-sm font-normal mb-2">
            {placeholderText}
          </p>
        </>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={acceptedFileTypes}
        className="sr-only"
      />
      
      {error && (
        <p className="text-red-500 font-montserrat text-xs mt-1">{error}</p>
      )}
    </div>
  );
} 