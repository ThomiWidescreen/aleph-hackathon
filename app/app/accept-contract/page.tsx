"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "../../components/BottomNav";
import { useFetchContract } from "@/blockchain/hooks/useGetContracts";

/**
 * Página para aceptar un contrato
 * Muestra los detalles de un contrato y permite al usuario aceptarlo
 */
export default function AcceptContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractId = searchParams.get('id');
  
  // Estado para los datos del contrato
  // const [contractData, setContractData] = useState({
  //   title: "",
  //   description: "",
  //   deadline: "",
  //   finalPayment: 0,
  //   minimumCommitment: 0,
  //   recipient: ""
  // });

   const contractData = useFetchContract("0x132e96F1cd2FFA98Fbea103f555b210B8d0aad5f" as `0x${string}`)

  
  // Estado para indicar carga de datos
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para mostrar confirmación de acción
  const [showConfirmation, setShowConfirmation] = useState(false);


  // Función para manejar la aceptación del contrato
  const handleAcceptContract = () => {
    setShowConfirmation(true);
  };
  
  // Función para confirmar la aceptación
  const handleConfirmAccept = () => {
    console.log("Contrato aceptado, redirigiendo...");
    router.push("/my-profile?view=contracts");
  };
  
  // Función para cancelar la confirmación
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {isLoading ? (
        // Estado de carga
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-60 h-6 bg-[#ADADAD] rounded-full mb-4 mx-auto"></div>
            <div className="w-40 h-4 bg-[#ADADAD] rounded-full mb-3 mx-auto"></div>
            <div className="w-72 h-4 bg-[#ADADAD] rounded-full mx-auto"></div>
          </div>
        </div>
      ) : (
        // Contenido del contrato
        <>
          {/* Encabezado con botón de retroceso e ícono de chat */}
          <div className="pt-4 px-4 pb-2 bg-[#090619]">
            <div className="flex justify-between items-center">
              <Link href="/my-profile?view=contracts" className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="text-white">
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Perfil del usuario */}
          <div className="pt-2 px-6 pb-4 bg-[#090619]">
            <div className="flex items-center">
              {/* Imagen de perfil */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#ADADAD] flex items-center justify-center">
                  <span className="text-lg text-white font-montserrat">{contractData.recipient.charAt(0)}</span>
                </div>
              </div>
              
              <div className="ml-3">
                {/* Nombre del creador */}
                <h2 className="text-white font-montserrat text-lg font-bold">{contractData.recipient}</h2>
                
                {/* Texto "Accept contract" con gradiente */}
                <p className="bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent font-montserrat text-sm font-normal">
                  Accept contract
                </p>
              </div>
            </div>
          </div>
          
          {/* Contenedor de detalles del contrato */}
          <div className="flex-grow bg-white rounded-t-2xl px-6 pt-5 pb-24">
            {/* Título del contrato */}
            <h1 className="text-[#090619] font-montserrat text-xl font-bold mb-2">
              {contractData.title}
            </h1>
            
            {/* Fecha límite */}
            <div className="mb-4">
              <span className="text-[#090619] font-montserrat text-sm font-medium">Deadline: </span>
              <span className="text-[#3E54F5] font-montserrat text-sm font-medium">{contractData.deadline}</span>
            </div>
            
            {/* Descripción */}
            <p className="text-[#ADADAD] font-montserrat text-sm font-normal mb-6">
              {contractData.description}
            </p>
            
            {/* Pago final */}
            <div className="mb-6">
              <h3 className="text-[#090619] font-montserrat text-sm font-medium mb-2">
                Final Payment
              </h3>
              
              <div className="flex mb-2">
                {/* Selector de WLD (no modificable) */}
                <div className="flex items-center bg-[#F5F5F5] rounded-full px-4 py-3 w-32">
                  <div className="flex items-center">
                    <span className="text-black font-montserrat text-sm">WLD</span>
                  </div>
                </div>
                
                {/* Valor */}
                <div className="flex-grow">
                  <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                    <span className="text-[#3E54F5] font-montserrat text-lg font-medium">{contractData.finalPayment}</span>
                    <span className="text-[#ADADAD] font-montserrat text-xs font-normal">$100</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Compromiso mínimo */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-2">
                <h3 className="text-[#090619] font-montserrat text-sm font-medium">
                  Minimun Commitment Stake
                </h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#ADADAD" strokeWidth="2"/>
                  <path d="M12 8V12M12 16V16.1" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              <div className="flex mb-2">
                {/* Selector de WLD (no modificable) */}
                <div className="flex items-center bg-[#F5F5F5] rounded-full px-4 py-3 w-32">
                  <div className="flex items-center">
                    <span className="text-black font-montserrat text-sm">WLD</span>
                  </div>
                </div>
                
                {/* Valor */}
                <div className="flex-grow">
                  <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                    <span className="text-[#3E54F5] font-montserrat text-lg font-medium">{contractData.minimumCommitment}</span>
                    <span className="text-[#ADADAD] font-montserrat text-xs font-normal">$100</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón de acción */}
            <button
              onClick={handleAcceptContract}
              className="w-full bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white font-montserrat text-sm font-medium rounded-full py-3"
            >
              Accept Contract
            </button>
          </div>
        </>
      )}
      
      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3 text-[#090619] font-montserrat">
              Confirmar aceptación
            </h3>
            <p className="text-[#ADADAD] mb-5 font-montserrat text-sm">
              ¿Estás seguro de que quieres aceptar este contrato? Una vez aceptado, estarás comprometido a completar el trabajo según los términos acordados.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelConfirmation}
                className="flex-1 border border-[#ADADAD] text-[#090619] py-2 rounded-full hover:bg-gray-50 transition-colors font-montserrat text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAccept}
                className="flex-1 bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white py-2 rounded-full transition-colors font-montserrat text-sm"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Navegación inferior */}
      <BottomNav activeView="contracts" />
      
      {/* Estilos globales */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
} 