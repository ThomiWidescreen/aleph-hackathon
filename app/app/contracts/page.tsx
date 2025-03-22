"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * MyContracts component
 * Displays user's contracts with filter tabs
 */
export default function MyContractsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [contracts, setContracts] = useState<any[]>([]);
  
  // Mock contract data
  const mockContracts = {
    pending: [
      {
        id: 201,
        title: "Corporate Promo Video",
        client: "TechCorp Inc.",
        date: "2023-10-25",
        amount: 450,
        status: "pending"
      },
      {
        id: 202,
        title: "Wedding Highlights Montage",
        client: "Jane & John",
        date: "2023-11-05",
        amount: 300,
        status: "pending"
      }
    ],
    active: [
      {
        id: 101,
        title: "Product Explainer Video",
        client: "EcoSolutions",
        date: "2023-09-15",
        amount: 520,
        status: "inProgress",
        progress: 60
      }
    ],
    completed: [
      {
        id: 50,
        title: "Social Media Ads",
        client: "FitLife Gym",
        date: "2023-08-10",
        amount: 280,
        status: "completed"
      },
      {
        id: 42,
        title: "App Tutorial Series",
        client: "MobileApp Co.",
        date: "2023-07-22",
        amount: 750,
        status: "completed"
      }
    ]
  };
  
  // Load contracts on mount and tab change
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setContracts(mockContracts[activeTab as keyof typeof mockContracts]);
      setIsLoading(false);
      console.log(`Loaded ${activeTab} contracts`);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeTab]); // Dependency array with activeTab

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  
  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsLoading(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">
          {config.screens.myContracts.title}
        </h1>
      </header>
      
      {/* Tabs */}
      <div className="bg-white px-4 border-b border-gray-200">
        <div className="flex -mb-px">
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 flex-1 ${
              activeTab === 'pending' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabChange('pending')}
          >
            {config.screens.myContracts.tabs.pending}
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 flex-1 ${
              activeTab === 'active' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabChange('active')}
          >
            {config.screens.myContracts.tabs.active}
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm border-b-2 flex-1 ${
              activeTab === 'completed' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabChange('completed')}
          >
            {config.screens.myContracts.tabs.completed}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        {isLoading ? (
          // Loading state
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : contracts.length > 0 ? (
          // Contracts list
          <div className="space-y-3">
            {contracts.map((contract) => (
              <Link 
                href={`/accept-contract?id=${contract.id}`} 
                key={contract.id}
                className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{contract.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {config.screens.myContracts.labels.from}: {contract.client}
                    </p>
                    <p className="text-sm text-gray-500">
                      {config.screens.myContracts.labels.date}: {formatDate(contract.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">${contract.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      contract.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : contract.status === 'inProgress' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {config.screens.myContracts.status[contract.status as keyof typeof config.screens.myContracts.status]}
                    </span>
                  </div>
                </div>
                
                {contract.status === 'inProgress' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right mt-1">{contract.progress}%</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          // No contracts
          <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-4">{config.screens.myContracts.labels.noContracts}</p>
            <Link 
              href="/feed"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {config.screens.myContracts.actions.create}
            </Link>
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 