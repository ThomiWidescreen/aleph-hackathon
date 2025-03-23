"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "../../../components/BottomNav";
import config from "../../../@config.json";
import { useFetchContract } from "@/blockchain/hooks/useGetContracts";

// Enum para los estados de contrato
type ContractStatus = "Pending" | "Accepted" | "Declined" | "Completed" | "Failed" | "Dispute";

// Interfaz para los datos del contrato
interface ContractData {
  id: string;
  title: string;
  description: string;
  deadline: string;
  finalPayment: number;
  minimumCommitment: number;
  recipient: string;
  status: ContractStatus;
  currency: string;
  usdEquivalent?: number;
}


/**
 * Función para actualizar el estado de un contrato
 * Simula una llamada a API para actualizar el contrato
 */
const updateContractStatus = (id: string, newStatus: ContractStatus): Promise<boolean> => {
  console.log(`Actualizando contrato ${id} a estado: ${newStatus}`);
  
  // Simulamos una llamada a API para actualizar el estado
  return new Promise((resolve) => {
    setTimeout(() => {
      // En un caso real, aquí se haría una llamada a la API
      // para actualizar el estado en la base de datos
      console.log(`Contrato ${id} actualizado exitosamente a ${newStatus}`);
      resolve(true);
    }, 1000);
  });
};

/**
 * Página de detalles de contrato unificada
 * Muestra los detalles de un contrato y adapta su comportamiento según el estado
 */
export default function ContractDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const contractId = params.id as string;
  
  // Estado para los datos del contrato
   const contractData = useFetchContract("0x132e96F1cd2FFA98Fbea103f555b210B8d0aad5f" as `0x${string}`)

  console.log({contractData})
  
  // Estado para indicar carga de datos
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para indicar procesamiento de acción
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Estado para mostrar confirmación de acción
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Estado para manejar errores
  const [error, setError] = useState<string | null>(null);
  
  // Función para determinar el color del indicador de estado
  const getStatusColor = (status: ContractStatus): string => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500"; // Amarillo
      case "Accepted":
        return "bg-blue-500"; // Azul
      case "Completed":
        return "bg-green-500"; // Verde
      case "Declined":
      case "Failed":
        return "bg-red-500"; // Rojo
      case "Dispute":
        return "bg-orange-500"; // Naranja
      default:
        return "bg-gray-500"; // Gris por defecto
    }
  };
  
  // Función para obtener el texto del estado
  const getStatusText = (status: ContractStatus): string => {
    switch (status) {
      case "Pending":
        return "Pending review";
      case "Accepted":
        return "In progress";
      case "Completed":
        return "Completed";
      case "Declined":
        return "Declined";
      case "Failed":
        return "Failed";
      case "Dispute":
        return "In dispute";
      default:
        return "Unknown";
    }
  };
  
  // Función para obtener el texto del botón según el estado
  const getButtonText = (status: ContractStatus): string => {
    console.log(`Obteniendo texto del botón para estado: ${status}`);
    switch (status) {
      case "Pending":
        return "Accept and Stake";
      case "Accepted":
        return "Mark as completed";
      default:
        return ""; // No hay botón para otros estados
    }
  };
  
  // Determinar si mostrar el botón de acción
  const shouldShowButton = (status: ContractStatus): boolean => {
    const shouldShow = ["Pending", "Accepted"].includes(status);
    console.log(`¿Mostrar botón para estado ${status}? ${shouldShow}`);
    return shouldShow;
  };

  // // Cargar datos del contrato
  // useEffect(() => {
  //   const loadContractData = async () => {
  //     setIsLoading(true);
  //     setError(null);
      
  //     try {
  //       const contract = await getContractById(contractId);
  //       setContractData(contract);
  //       console.log("Datos del contrato cargados exitosamente:", contract);
  //     } catch (err) {
  //       console.error("Error al cargar los datos del contrato:", err);
  //       setError("No se pudo cargar el contrato. Intente nuevamente.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
    
  //   loadContractData();
  // }, [contractId]);

  // Función para manejar la acción del botón
  const handleButtonAction = () => {
    if (isProcessing) return;
    
    if (contractData.status === "Pending") {
      // Para pendientes, mostrar modal de confirmación
      setShowConfirmation(true);
    } else if (contractData.status === "Accepted") {
      // Para aceptados, mostrar confirmación para completar
      setShowConfirmation(true);
    } else if (contractData.status === "Dispute") {
      // Para disputas, redirigir a una página de resolución (no implementado)
      console.log("Redirigiendo a página de resolución de disputas...");
      // En un caso real, aquí se redireccionaría a otra página
      router.push(`/dispute-resolution/${contractId}`);
    }
  };
  
  // Función para confirmar la acción
  const handleConfirmAction = async () => {
  };
  
  // Función para cancelar la confirmación
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  
  // Función para calcular el texto de confirmación
  const getConfirmationText = (): { title: string, message: string } => {
    if (contractData.status === "Pending") {
      return {
        title: "Confirmar aceptación",
        message: "¿Estás seguro de que quieres aceptar este contrato? Una vez aceptado, estarás comprometido a completar el trabajo según los términos acordados."
      };
    } else if (contractData.status === "Accepted") {
      return {
        title: "Marcar como completado",
        message: "¿Confirmas que has completado todos los requerimientos del contrato? Esta acción confirmará la finalización del trabajo."
      };
    } else {
      return {
        title: "Confirmar acción",
        message: "¿Estás seguro de que quieres continuar?"
      };
    }
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
      ) : error ? (
        // Estado de error
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">{error}</h3>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white px-4 py-2 rounded-full mt-2"
            >
              Reintentar
            </button>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Imagen de perfil */}
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#ADADAD] flex items-center justify-center">
                    <span className="text-lg text-white font-montserrat">{contractData.worker.charAt(0)}</span>
                  </div>
                </div>
                
                <div className="ml-3">
                  {/* Nombre del creador */}
                  <h2 className="text-white font-montserrat text-lg font-bold">{contractData.worker}</h2>
                  
                  {/* Texto de estado con gradiente */}
                  <p className="bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent font-montserrat text-sm font-normal">
                    {getStatusText(contractData.status)}
                  </p>
                </div>
              </div>
              
              {/* Indicador de estado */}
              <div className={`w-3 h-3 rounded-full ${getStatusColor(contractData.status)}`}></div>
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
              {contractData.overview}
            </p>
            
            {/* Pago final */}
            <div className="mb-6">
              <h3 className="text-[#090619] font-montserrat text-sm font-medium mb-2">
                FINAL PAYMENT
              </h3>
              
              <div className="flex mb-2">
                {/* Selector de moneda (no modificable) */}
                <div className="flex items-center bg-[#F5F5F5] rounded-full px-4 py-3 w-32">
                  <div className="flex items-center">
                    <span className="text-black font-montserrat text-sm">{contractData.token}</span>
                  </div>
                </div>
                
                {/* Valor */}
                <div className="flex-grow">
                  <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                    <span className="text-[#3E54F5] font-montserrat text-lg font-medium">{contractData.totalAmount}</span>
                  
                  </div>
                </div>
              </div>
            </div>
            
            {/* Compromiso mínimo */}
            <div className="mb-8">
              <div className="flex items-center gap-1 mb-2">
                <h3 className="text-[#090619] font-montserrat text-sm font-medium">
                  MINIMUM COMMITMENT STAKE
                </h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#ADADAD" strokeWidth="2"/>
                  <path d="M12 8V12M12 16V16.1" stroke="#ADADAD" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              <div className="flex mb-2">
                {/* Selector de moneda (no modificable) */}
                <div className="flex items-center bg-[#F5F5F5] rounded-full px-4 py-3 w-32">
                  <div className="flex items-center">
                    <span className="text-black font-montserrat text-sm">{contractData.token}</span>
                  </div>
                </div>
                
                {/* Valor */}
                <div className="flex-grow">
                  <div className="bg-[#F5F5F5] rounded-full py-2 px-4 h-full ml-2 flex flex-col items-end">
                    <span className="text-[#3E54F5] font-montserrat text-lg font-medium">{contractData.insurance}</span>
                    {/* {contractData.usdEquivalent && (
                      <span className="text-[#ADADAD] font-montserrat text-xs font-normal">${contractData.usdEquivalent}</span>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón de acción - se muestra solo para estados específicos */}
            {shouldShowButton(contractData.status) && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleButtonAction}
                  disabled={isProcessing}
                  className={`w-full ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-[#3E54F5] to-[#631497]'} text-white font-montserrat text-sm font-medium rounded-full py-3`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : getButtonText(contractData.status)}
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3 text-[#090619] font-montserrat">
              {getConfirmationText().title}
            </h3>
            <p className="text-[#ADADAD] mb-5 font-montserrat text-sm">
              {getConfirmationText().message}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleCancelConfirmation}
                disabled={isProcessing}
                className="flex-1 border border-[#ADADAD] text-[#090619] py-2 rounded-full hover:bg-gray-50 transition-colors font-montserrat text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={isProcessing}
                className={`flex-1 ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-[#3E54F5] to-[#631497]'} text-white py-2 rounded-full transition-colors font-montserrat text-sm flex justify-center items-center`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  'Confirmar'
                )}
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