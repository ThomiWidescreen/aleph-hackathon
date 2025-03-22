"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "../../@config.json";

/**
 * Página de índice para la sección de contratos
 * Permite probar diferentes estados de contrato
 */
export default function ContractIndexPage() {
  const router = useRouter();
  const [contractId, setContractId] = useState("");
  
  // Función para manejar la redirección
  const handleGoToContract = () => {
    if (contractId) {
      router.push(`/contract/${contractId}`);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {/* Encabezado con título */}
      <div className="p-4 bg-[#090619]">
        <div className="flex justify-between items-center">
          <Link href="/my-profile?view=contracts" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-white text-lg font-bold">Contratos</h1>
          <div className="w-6"></div> {/* Espacio para equilibrar */}
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-grow bg-white rounded-t-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Prueba de Estados de Contrato</h2>
        
        <p className="text-sm text-gray-600 mb-6">
          Ingresa un ID de contrato para ver diferentes estados según el último dígito:
        </p>
        
        <div className="mb-6">
          <input
            type="text"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            placeholder="Ej: contract-1"
            className="w-full px-4 py-2 rounded-full bg-[#F5F5F5] mb-2"
          />
          
          <button
            onClick={handleGoToContract}
            className="w-full bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white font-medium py-2 rounded-full"
          >
            Ver Contrato
          </button>
        </div>
        
        <div className="bg-[#F5F5F5] p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Estados disponibles:</h3>
          <ul className="text-sm space-y-2">
            <li><strong>contract-1</strong>: Estado <span className="text-yellow-500">Pendiente</span></li>
            <li><strong>contract-2</strong>: Estado <span className="text-blue-500">Aceptado</span></li>
            <li><strong>contract-3</strong>: Estado <span className="text-green-500">Completado</span></li>
            <li><strong>contract-4</strong>: Estado <span className="text-red-500">Rechazado</span></li>
            <li><strong>contract-5</strong>: Estado <span className="text-red-500">Fallido</span></li>
            <li><strong>contract-6</strong>: Estado <span className="text-orange-500">Disputa</span></li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <Link 
            href="/contract/contract-1" 
            className="block w-full text-center bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200"
          >
            Ver estado Pendiente
          </Link>
          
          <Link 
            href="/contract/contract-2" 
            className="block w-full text-center bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            Ver estado Aceptado
          </Link>
          
          <Link 
            href="/contract/contract-3" 
            className="block w-full text-center bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200"
          >
            Ver estado Completado
          </Link>
          
          <Link 
            href="/contract/contract-4" 
            className="block w-full text-center bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
          >
            Ver estado Rechazado
          </Link>
          
          <Link 
            href="/contract/contract-5" 
            className="block w-full text-center bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200"
          >
            Ver estado Fallido
          </Link>
          
          <Link 
            href="/contract/contract-6" 
            className="block w-full text-center bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200"
          >
            Ver estado Disputa
          </Link>
        </div>
      </div>
      
      {/* Footer con información */}
      <div className="py-4 px-6 bg-white border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Esta página es solo para pruebas y desarrollo. No aparecerá en la versión final.
        </p>
      </div>
    </div>
  );
} 