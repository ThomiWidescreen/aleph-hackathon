"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * EditPortfolioItemPage component
 * Allows users to edit an existing portfolio item
 */
export default function EditPortfolioItemPage() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("id");
  
  const [item, setItem] = useState({
    id: 0,
    title: "",
    description: "",
    category: "",
    price: "",
    tags: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load item data
  useEffect(() => {
    if (!itemId) return;
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      setItem({
        id: parseInt(itemId),
        title: "Brand Commercial",
        description: "A 30-second commercial for a premium brand, featuring motion graphics and visual effects.",
        category: "motion_graphics",
        price: "450",
        tags: "Commercial, Brand, Motion Graphics",
      });
      setIsLoading(false);
      console.log(`Item data loaded for ID: ${itemId}`);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [itemId]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call
    try {
      console.log("Saving portfolio item:", item);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveSuccess(true);
      // After successful save, hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving portfolio item:", error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    try {
      console.log("Deleting portfolio item:", item.id);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to profile
      window.location.href = "/my-profile";
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      setIsSaving(false);
    }
  };
  
  // Cancel edit and return to profile
  const handleCancel = () => {
    window.location.href = "/my-profile";
  };
  
  // Handle not found
  if (!itemId) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
          <h1 className="text-xl font-bold text-center">Editar Portfolio</h1>
        </header>
        
        <main className="flex-grow p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Elemento no encontrado</p>
            <Link href="/my-profile" className="text-blue-600">
              Volver a mi perfil
            </Link>
          </div>
        </main>
        
        <BottomNav />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">Editar Portfolio</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        {isLoading ? (
          // Loading state
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">Portfolio actualizado correctamente.</span>
              </div>
            )}
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={item.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={item.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={item.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                <option value="motion_graphics">Motion Graphics</option>
                <option value="3d_animation">3D Animation</option>
                <option value="color_grading">Color Grading</option>
                <option value="vfx">Visual Effects</option>
                <option value="editing">Video Editing</option>
              </select>
            </div>
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (USD)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={item.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Etiquetas
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={item.tags}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Separa las etiquetas con comas</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  "Guardar cambios"
                )}
              </button>
            </div>
            
            {/* Delete Button */}
            <div className="border-t border-gray-200 pt-4 mt-6">
              <button
                type="button"
                onClick={handleDelete}
                className="w-full py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                disabled={isSaving}
              >
                Eliminar elemento
              </button>
            </div>
          </form>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 