"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "../../components/BottomNav";

/**
 * CreateContractPage component
 * Form for creating a new contract between users
 */
export default function CreateContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    endDate: "07/10/2028",
    finalPayment: 0,
    minimumCommitment: 0,
    recipient: ""
  });

  // Currency state for payment fields
  const [currency, setCurrency] = useState("WLD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Error state for validation
  const [errors, setErrors] = useState<{
    title?: string;
  }>({});
  
  // Get recipient name from URL params if available
  useEffect(() => {
    const recipientName = searchParams.get('name');
    if (recipientName) {
      setFormData(prev => ({
        ...prev,
        recipient: decodeURIComponent(recipientName)
      }));
      console.log(`Creating contract for ${recipientName}`);
    }
  }, [searchParams]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle currency selection
  const handleCurrencyChange = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowCurrencyDropdown(false);
  };

  // Toggle currency dropdown
  const toggleCurrencyDropdown = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
  };

  // Handle submit
  const handleSubmit = () => {
    // Basic validation
    if (!formData.title.trim()) {
      setErrors({ title: "El título del proyecto es obligatorio" });
      return;
    }
    
    // Clear errors if validation passes
    setErrors({});
    
    // Redirect to contracts page
    router.push("/my-profile?view=contracts");
  };

  // Get the first letter of the recipient's name for the avatar
  const getRecipientInitial = () => {
    if (formData.recipient) {
      return formData.recipient.charAt(0);
    }
    return "M"; // Default initial
  };

  return (
    <div className="min-h-screen bg-[#090619] flex flex-col pb-16 font-montserrat overflow-hidden">
      {/* Header */}
      <div className="bg-[#090619] pt-4 px-4 pb-2 flex justify-between items-center">
        <Link href="/my-profile?view=contracts">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* User Profile Section - Now shows the recipient instead of static "Mikaela" */}
      <div className="bg-[#090619] pt-2 px-6 pb-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#ADADAD] flex items-center justify-center text-white">
          <span>{getRecipientInitial()}</span>
        </div>
        <div className="ml-3">
          <h2 className="text-white font-bold text-lg">{formData.recipient || "New Contract"}</h2>
          <p className="bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent font-normal text-sm">Creating Contract</p>
        </div>
      </div>

      {/* Form Container - Extended white background with proper spacing */}
      <div className="flex-grow bg-white rounded-t-2xl">
        <div className="px-6 pt-5 pb-24 flex flex-col gap-5">
          {/* Contract Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-[#555555] text-sm font-medium">
              Contract name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#F5F5F5] text-[#090619] rounded-full p-3 text-sm w-full placeholder-[#ADADAD]"
              placeholder="Video promocional para mi er"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>

          {/* End date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="endDate" className="text-[#555555] text-sm font-medium">
              Select the end date
            </label>
            <div className="relative">
              <input
                type="text"
                id="endDate"
                name="endDate"
                defaultValue={formData.endDate}
                onChange={handleChange}
                className="bg-[#F5F5F5] text-[#090619] rounded-full p-3 text-sm w-full placeholder-[#ADADAD]"
                placeholder="Example: 07/10/2028"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-[#555555] text-sm font-medium">
              Describe the project
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              className="bg-[#F5F5F5] text-[#090619] rounded-lg p-3 text-sm min-h-[140px] w-full placeholder-[#ADADAD]"
              placeholder="Describe detalladamente lo que necesitas..."
            />
          </div>

          {/* Final Payment */}
          <div className="flex flex-col gap-2">
            <label htmlFor="finalPayment" className="text-[#555555] text-sm font-medium">
              Final Payment
            </label>
            <div className="flex">
              {/* Currency Selector */}
              <div className="relative">
                <div 
                  onClick={toggleCurrencyDropdown}
                  className="flex items-center justify-between bg-[#F5F5F5] rounded-full px-4 py-3 w-32 cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="text-black text-sm ml-1">{currency}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* Currency Dropdown */}
                {showCurrencyDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-md z-10">
                    <div 
                      className="px-4 py-3 hover:bg-[#F5F5F5] cursor-pointer rounded-t-lg text-black"
                      onClick={() => handleCurrencyChange("WLD")}
                    >
                      WLD
                    </div>
                    <div 
                      className="px-4 py-3 hover:bg-[#F5F5F5] cursor-pointer rounded-b-lg text-black"
                      onClick={() => handleCurrencyChange("USDC")}
                    >
                      USDC
                    </div>
                  </div>
                )}
              </div>
              
              {/* Amount Input */}
              <div className="flex-grow">
                <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                  <input
                    type="number"
                    id="finalPayment"
                    name="finalPayment"
                    defaultValue={formData.finalPayment}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-[#3E54F5] text-lg font-medium focus:outline-none text-right w-full"
                  />
                  <span className="text-[#ADADAD] text-xs -mt-1">
                    {currency === "WLD" ? "$0" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimum Commitment Stake */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <label htmlFor="minimumCommitment" className="text-[#555555] text-sm font-medium">
                Minimun Conmitment Stake
              </label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ADADAD" strokeWidth="2"/>
                <path d="M12 8V12M12 16V16.1" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex">
              <div className="flex items-center justify-between bg-[#F5F5F5] rounded-full px-4 py-3 w-32">
                <div className="flex items-center">
                  <span className="text-black text-sm">{currency}</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                  <input
                    type="number"
                    id="minimumCommitment"
                    name="minimumCommitment"
                    defaultValue={formData.minimumCommitment}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-[#3E54F5] text-lg font-medium focus:outline-none text-right w-full"
                  />
                  <span className="text-[#ADADAD] text-xs -mt-1">
                    {currency === "WLD" ? "$0" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white font-medium rounded-full py-3 text-sm"
            >
              Send contract
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeView="contracts" />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
} 