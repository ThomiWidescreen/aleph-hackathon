"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Accept Contract page component
 * Shows contract details and allows a video editor to accept or reject a contract
 */
export default function AcceptContractPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const contractId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<{
    id: number;
    title: string;
    description: string;
    clientName: string;
    clientId: number;
    budget: number;
    deliveryDate: string;
    revisions: number;
    status: "pending" | "accepted" | "rejected";
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"accept" | "reject" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock contracts data - in a real app, this would come from API
  const mockContracts = [
    {
      id: 201,
      title: "Corporate Promo Video",
      description: "We need a 2-minute promotional video for our new product launch. The video should highlight key features and benefits of our software solution.",
      clientName: "TechCorp Inc.",
      clientId: 301,
      budget: 1500,
      deliveryDate: "2023-12-15",
      revisions: 2,
      status: "pending" as "pending" | "accepted" | "rejected"
    },
    {
      id: 202,
      title: "Wedding Highlights Montage",
      description: "Looking for a 5-minute highlight video of our wedding ceremony and reception. We want a modern, emotional style with smooth transitions.",
      clientName: "John & Sarah Smith",
      clientId: 302,
      budget: 800,
      deliveryDate: "2023-11-30",
      revisions: 1,
      status: "pending" as "pending" | "accepted" | "rejected"
    },
    {
      id: 203,
      title: "Product Unboxing Animation",
      description: "3D animation showing our product unboxing and assembly. Should be approximately 45 seconds with emphasis on simplicity and our brand colors.",
      clientName: "Gadget Innovations",
      clientId: 303,
      budget: 1200,
      deliveryDate: "2023-12-10",
      revisions: 3,
      status: "pending" as "pending" | "accepted" | "rejected"
    }
  ];

  // Load contract data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      if (contractId) {
        const foundContract = mockContracts.find(c => c.id === parseInt(contractId));
        setContract(foundContract || null);
      } else {
        // If no ID provided, show first contract as default
        setContract(mockContracts[0]);
      }
      setIsLoading(false);
      
      console.log(`Contract data loaded for ID: ${contractId || 'default'}`);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [contractId]);
  
  // Handle accept/reject button click
  const handleActionClick = (action: "accept" | "reject") => {
    setConfirmAction(action);
    setShowConfirmation(true);
  };
  
  // Handle confirmation
  const handleConfirm = async () => {
    if (!contract || !confirmAction) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Contract ${contract.id} ${confirmAction}ed`);
      
      // In a real app, this would update the contract in the backend
      // For demo, just simulate success and redirect
      
      // Redirect to chat with client
      if (confirmAction === "accept") {
        router.push(`/chat?id=${contract.clientId}`);
      } else {
        // If rejected, go back to feed
        router.push('/feed');
      }
    } catch (err) {
      console.error("Error processing contract:", err);
      setError(config.screens.acceptContract.errors.processingFailed);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Cancel confirmation
  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmAction(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="p-4 bg-white shadow-sm mb-4">
        <div className="flex items-center">
          <Link
            href="/feed"
            className="mr-2 text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold">{config.screens.acceptContract.title}</h1>
        </div>
      </div>
      
      <div className="flex-grow p-4">
        {isLoading ? (
          // Loading state
          <div className="animate-pulse">
            <div className="h-7 bg-gray-200 rounded-md mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded-md mb-2 w-2/5"></div>
          </div>
        ) : contract ? (
          // Contract details
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-medium mb-2">{contract.title}</h2>
            
            <div className="mb-4">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {config.screens.acceptContract.status[contract.status]}
              </span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">{config.screens.acceptContract.labels.from}</h3>
              <p className="text-gray-800">{contract.clientName}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">{config.screens.acceptContract.labels.description}</h3>
              <p className="text-gray-800 whitespace-pre-line">{contract.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{config.screens.acceptContract.labels.budget}</h3>
                <p className="text-gray-800">${contract.budget}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{config.screens.acceptContract.labels.delivery}</h3>
                <p className="text-gray-800">{new Date(contract.deliveryDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{config.screens.acceptContract.labels.revisions}</h3>
                <p className="text-gray-800">{contract.revisions}</p>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mb-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleActionClick("reject")}
                disabled={isSubmitting}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {config.screens.acceptContract.actions.reject}
              </button>
              <button
                onClick={() => handleActionClick("accept")}
                disabled={isSubmitting}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {config.screens.acceptContract.actions.accept}
              </button>
            </div>
          </div>
        ) : (
          // Contract not found
          <div className="text-center p-4">
            <p className="text-gray-600 mb-4">{config.screens.acceptContract.labels.notFound}</p>
            <Link href="/feed" className="text-blue-600">
              {config.screens.acceptContract.labels.returnToFeed}
            </Link>
          </div>
        )}
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">
              {confirmAction === "accept" 
                ? config.screens.acceptContract.confirmations.acceptTitle
                : config.screens.acceptContract.confirmations.rejectTitle}
            </h3>
            <p className="text-gray-600 mb-4">
              {confirmAction === "accept"
                ? config.screens.acceptContract.confirmations.acceptMessage
                : config.screens.acceptContract.confirmations.rejectMessage}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                {config.screens.acceptContract.actions.cancel}
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2 rounded-md text-white transition-colors ${
                  confirmAction === "accept" 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {config.screens.acceptContract.actions.processing}
                  </span>
                ) : (
                  confirmAction === "accept"
                    ? config.screens.acceptContract.actions.confirm
                    : config.screens.acceptContract.actions.confirmReject
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 