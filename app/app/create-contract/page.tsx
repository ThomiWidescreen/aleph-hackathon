"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * CreateContractPage component
 * Form for creating a new contract between users
 */
export default function CreateContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editorId = searchParams.get("editorId");
  
  // Contract form state
  const [contract, setContract] = useState({
    title: "",
    description: "",
    deliveryDate: "",
    budget: "",
    revisions: "2", // Default to 2 revisions
    terms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  
  // Mock editor data - in a real app, this would come from API
  const editorData = {
    id: editorId || "101",
    name: "Alex Designer", 
    rating: 4.8,
    avatar: ""
  };
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContract(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setContract(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Form validation
  const validateForm = () => {
    if (step === 1) {
      if (!contract.title.trim()) return config.screens.createContract.validation.titleRequired;
      if (!contract.description.trim()) return config.screens.createContract.validation.descriptionRequired;
      return null;
    } else if (step === 2) {
      if (!contract.deliveryDate) return config.screens.createContract.validation.deliveryDateRequired;
      if (!contract.budget.trim()) return config.screens.createContract.validation.budgetRequired;
      if (parseFloat(contract.budget) <= 0) return config.screens.createContract.validation.budgetPositive;
      return null;
    } else {
      if (!contract.terms) return config.screens.createContract.validation.termsRequired;
      return null;
    }
  };
  
  // Handle next step
  const handleNextStep = () => {
    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }
    
    setError(null);
    setStep(prevStep => prevStep + 1);
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setError(null);
    setStep(prevStep => prevStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Contract created:", {
        editorId: editorData.id,
        editorName: editorData.name,
        ...contract
      });
      
      // Redirect to success page or contracts list
      router.push("/contracts?success=true");
    } catch (err) {
      console.error("Error creating contract:", err);
      setError(config.screens.createContract.errors.createFailed);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date string for min attribute (today)
  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
    
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    
    return `${year}-${month}-${day}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Link href={`/profile-video-maker?id=${editorData.id}`} className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">{config.screens.createContract.title}</h1>
        </div>
        
        {/* Progress indicator */}
        <div className="flex justify-between mt-4 px-4">
          <div className={`w-1/3 h-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className="mx-1"></div>
          <div className={`w-1/3 h-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <div className="mx-1"></div>
          <div className={`w-1/3 h-1 rounded-full ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        </div>
      </div>
      
      {/* Editor Info */}
      <div className="bg-white p-4 flex items-center border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <span className="text-blue-500 font-medium">{editorData.name.charAt(0)}</span>
        </div>
        <div>
          <h2 className="font-semibold">{editorData.name}</h2>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < Math.floor(editorData.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`w-4 h-4 ${i < Math.floor(editorData.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{editorData.rating}</span>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="flex-grow p-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 max-w-xl mx-auto">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">{config.screens.createContract.steps.details}</h2>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {config.screens.createContract.labels.title} *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={contract.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder={config.screens.createContract.placeholders.title}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {config.screens.createContract.labels.description} *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={contract.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder={config.screens.createContract.placeholders.description}
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">{config.screens.createContract.steps.conditions}</h2>
              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  {config.screens.createContract.labels.deliveryDate} *
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={contract.deliveryDate}
                  onChange={handleChange}
                  min={getTodayDateString()}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  {config.screens.createContract.labels.budget} *
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={contract.budget}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder={config.screens.createContract.placeholders.budget}
                />
              </div>
              
              <div>
                <label htmlFor="revisions" className="block text-sm font-medium text-gray-700 mb-1">
                  {config.screens.createContract.labels.revisions}
                </label>
                <select
                  id="revisions"
                  name="revisions"
                  value={contract.revisions}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="1">1 revisión</option>
                  <option value="2">2 revisiones</option>
                  <option value="3">3 revisiones</option>
                  <option value="unlimited">Ilimitadas</option>
                </select>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-lg">{config.screens.createContract.steps.summary}</h2>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">{config.screens.createContract.steps.details}</h3>
                <p className="text-sm text-gray-700">{contract.title}</p>
                <p className="text-sm text-gray-700 mt-2">{contract.description}</p>
                
                <h3 className="font-medium mt-4 mb-2">{config.screens.createContract.steps.conditions}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-500">{config.screens.createContract.labels.deliveryDate}:</p>
                  <p className="text-gray-700">{new Date(contract.deliveryDate).toLocaleDateString()}</p>
                  
                  <p className="text-gray-500">{config.screens.createContract.labels.budget}:</p>
                  <p className="text-gray-700">${parseFloat(contract.budget).toFixed(2)} USD</p>
                  
                  <p className="text-gray-500">{config.screens.createContract.labels.revisions}:</p>
                  <p className="text-gray-700">
                    {contract.revisions === "unlimited" ? "Ilimitadas" : `${contract.revisions} ${parseInt(contract.revisions) === 1 ? "revisión" : "revisiones"}`}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={contract.terms}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {config.screens.createContract.labels.termsConditions}
                  </span>
                </label>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                {config.screens.createContract.actions.previous}
              </button>
            ) : (
              <Link
                href={`/profile-video-maker?id=${editorData.id}`}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {config.screens.createContract.actions.cancel}
              </Link>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {config.screens.createContract.actions.next}
              </button>
            ) : (
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : config.screens.createContract.actions.create}
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 