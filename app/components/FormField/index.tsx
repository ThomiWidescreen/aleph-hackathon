"use client";

import { ChangeEvent, useCallback } from "react";

/**
 * Reusable component for form input fields
 * Works with text, number, textarea, and other input types
 * 
 * @param name - Field name for form identification
 * @param value - Current field value
 * @param onChange - Function to handle value changes
 * @param placeholder - Placeholder text when field is empty
 * @param type - Input type (text, number, email, etc.)
 * @param multiline - Whether to render as textarea (for longer text)
 * @param error - Error message if validation fails
 * @param min - Minimum value (for number inputs)
 * @param step - Step increment (for number inputs)
 * @param required - Whether field is required
 * @param className - Additional CSS classes
 * @returns A styled form field with validation
 */
export default function FormField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  error = "",
  min,
  step,
  required = false,
  className = ""
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
  required?: boolean;
  className?: string;
}) {
  // Base styling for all form fields
  const baseClassName = "w-full bg-[#F5F5F5] rounded-lg p-3 placeholder-[#ADADAD] font-montserrat text-sm font-normal";
  
  /**
   * Handle focus event to log form interactions
   */
  const handleFocus = useCallback(() => {
    console.log(`Form field focused: ${name}`);
  }, [name]);
  
  return (
    <div className={`mb-4 ${className}`}>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClassName} min-h-[100px] resize-none`}
          required={required}
          onFocus={handleFocus}
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
          required={required}
          onFocus={handleFocus}
        />
      )}
      
      {error && (
        <p className="text-red-500 font-montserrat text-xs mt-1">{error}</p>
      )}
    </div>
  );
} 