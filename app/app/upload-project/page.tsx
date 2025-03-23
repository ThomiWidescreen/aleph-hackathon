"use client";

import { useState, useRef, ChangeEvent, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "../../components/BottomNav";
import config from "../../@config.json";
import { createVideo } from "../api/actions/file/createVideo";

/**
 * Modular component for file upload area
 * Encapsulates all drag and drop functionality
 */
function FileUploadArea({
  file,
  setFile,
  error,
  onErrorChange
}: {
  file: File | null;
  setFile: (file: File | null) => void;
  error: string;
  onErrorChange: (error: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  /**
   * Handles file selection through input
   * @param e Change event in file input
   */
  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      onErrorChange("");
      console.log("File selected:", selectedFile.name);
    }
  }, [setFile, onErrorChange]);

  /**
   * Opens file selector on click
   */
  const handleClickUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Handles drag events
   */
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>, isDragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isDragging);
  }, []);

  /**
   * Handles file drop event
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
      onErrorChange("");
      console.log("File uploaded by drag:", droppedFile.name);
    } else {
      onErrorChange("File must be a video");
    }
  }, [setFile, onErrorChange]);

  return (
    <div 
      className={`aspect-video mb-4 rounded-lg flex flex-col items-center justify-center cursor-pointer
        ${isDragging ? 'border-2 border-blue-400 bg-[#F3DDFF]' : 'bg-[#EDD1FF]'}`}
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
            Upload a video file
          </p>
        </>
      )}
      
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="sr-only"
      />
      
      {error && (
        <p className="text-red-500 font-montserrat text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

/**
 * Modular component for form field
 * Can be used for different input types
 */
function FormField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  error = "",
  min,
  step
}: {
  name: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  error?: string;
  min?: number;
  step?: string;
}) {
  const baseClassName = "w-full bg-[#F5F5F5] rounded-lg p-3 placeholder-[#ADADAD] font-montserrat text-sm font-normal text-gray-700";
  
  return (
    <div className="mb-4">
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClassName} min-h-[100px] resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClassName}
          min={min}
          step={step}
        />
      )}
      
      {error && (
        <p className="text-red-500 font-montserrat text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

/**
 * Main component for uploading a project
 * Uses modular components for the user interface
 */
export default function UploadProjectPage() {
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
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Validation errors state
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    file: "",
    submit: ""
  });

  /**
   * Updates a specific field in errors state
   * @param field Field to update
   * @param value New error value
   */
  const updateError = useCallback((field: keyof typeof errors, value: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  /**
   * Handles changes in form fields
   * @param e Change event in form field
   */
  const handleInputChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
   * Converts file to Base64 string for upload
   */
  const convertFileToBase64 = useCallback(async () => {
    if (!file) return null;
    
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error("Failed to convert file to Base64"));
        }
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  }, [file]);

  /**
   * Validates form before submission
   * @returns Boolean indicating if form is valid
   */
  const validateForm = useCallback((): boolean => {
    const newErrors = {
      title: "",
      description: "",
      file: "",
      submit: ""
    };
    
    let isValid = true;
    
    if (!videoData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    
    if (!videoData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    
    if (!file) {
      newErrors.file = "You must select a video file";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }, [videoData, file]);

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsUploading(true);
    setErrors(prev => ({ ...prev, submit: "" }));
    
    try {
      // Convert file to Base64 for upload
      const base64Data = await convertFileToBase64();
      
      if (!base64Data) {
        throw new Error("Failed to prepare video data");
      }
      
      console.log("Uploading video to backend...");
      
      // Prepare tags array from comma-separated string
      const tagsArray = videoData.tags ? 
        videoData.tags.split(",").map(tag => tag.trim()) : 
        [];
      
        
      // Call backend API to create video
      const result = await createVideo({
        title: videoData.title,
        description: videoData.description,
        category: "General", // Default category
        price: Number(videoData.price),
        tags: tagsArray,
        authorAddress: "0x0c892815f0B058E69987920A23FBb33c834289cf", // TODO: Get from actual user wallet
        videoData: base64Data
      });
      
      console.log("Video uploaded successfully:", result);
      
      // Redirect to profile page with creations view
      router.push("/my-profile?view=creations");
    } catch (error) {
      console.error("Error uploading video:", error);
      setErrors(prev => ({ 
        ...prev, 
        submit: "Failed to upload video. Please try again." 
      }));
    } finally {
      setIsUploading(false);
    }
  }, [validateForm, videoData, file, convertFileToBase64, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {/* Header with back button and chat icon */}
      <div className="pt-4 px-4 pb-2 bg-[#090619]">
        <div className="flex justify-between items-center">
          <Link href="/my-profile?view=creations" className="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="text-gray-700">
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
          {/* Modular video upload area */}
          <FileUploadArea 
            file={file} 
            setFile={setFile} 
            error={errors.file}
            onErrorChange={(value) => updateError("file", value)}
          />
          
          {/* Modular form fields - Title moved above description */}
          <FormField
            name="title"
            value={videoData.title}
            onChange={handleInputChange}
            placeholder="Title"
            error={errors.title}
          />
          
          <FormField
            name="description"
            value={videoData.description}
            onChange={handleInputChange}
            placeholder="Description"
            multiline={true}
            error={errors.description}
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
          
          <div className="mb-8">
            <FormField
              name="tags"
              value={videoData.tags}
              onChange={handleInputChange}
              placeholder="Tags (separate with commas)"
            />
          </div>
          
          {/* Error message */}
          {errors.submit && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md mb-4">
              {errors.submit}
            </div>
          )}
          
          {/* Publish button */}
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full ${config.gradients.primary} text-white font-montserrat text-sm font-medium rounded-full py-3 flex items-center justify-center`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : "Publish"}
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