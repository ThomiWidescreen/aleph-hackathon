"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Tipos para el perfil de usuario y sus datos
 */
type ContractStatus = "in_progress" | "completed" | "expires_soon";
type ContractType = {
  id: string;
  title: string;
  status: ContractStatus;
  description: string;
  price: number;
};

type CreationType = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

type UserProfileType = {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  creations: CreationType[];
  contracts: ContractType[];
} | null;

/**
 * Componente para mostrar el indicador de estado de contrato
 * @param status Estado del contrato (en progreso, completado, expira pronto)
 * @returns Elemento JSX con el indicador visual de estado
 */
const StatusIndicator = ({ status }: { status: string }) => {
  let statusColor = "";
  let textColor = "";
  let statusText = "";
  
  switch (status) {
    case "in_progress":
      statusColor = "bg-yellow-500";
      textColor = "text-yellow-500";
      statusText = "En progreso";
      break;
    case "completed":
      statusColor = "bg-green-500";
      textColor = "text-green-500";
      statusText = "Completado";
      break;
    case "expires_soon":
      statusColor = "bg-orange-500";
      textColor = "text-orange-500";
      statusText = "Expira pronto";
      break;
    default:
      statusColor = "bg-gray-500";
      textColor = "text-gray-500";
      statusText = "Desconocido";
  }
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
      <span className={`text-sm font-normal font-montserrat ${textColor}`}>{statusText}</span>
    </div>
  );
};

/**
 * Componente para mostrar la miniatura de video con un placeholder
 * @returns Elemento JSX con placeholder de video
 */
const VideoThumbnail = () => {
  return (
    <div className="aspect-video bg-[#ADADAD] rounded-lg flex items-center justify-center mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );
};

/**
 * Componente para mostrar el estado de carga
 * @returns Elemento JSX para el estado de carga
 */
const LoadingState = () => (
  <div className="flex-grow flex items-center justify-center">
    <div className="animate-pulse">
      <div className="w-20 h-20 bg-[#ADADAD] rounded-full mb-4 mx-auto"></div>
      <div className="w-32 h-3 bg-[#ADADAD] rounded-full mb-3 mx-auto"></div>
      <div className="w-40 h-2 bg-[#ADADAD] rounded-full mx-auto"></div>
    </div>
  </div>
);

/**
 * Componente para mostrar un estado de error
 * @param onRetry Función a ejecutar al intentar de nuevo
 * @returns Elemento JSX para el estado de error
 */
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex-grow flex flex-col items-center justify-center p-4">
    <p className="text-[#ADADAD] mb-4 font-montserrat">No se pudo cargar el perfil</p>
    <button onClick={onRetry} className="text-[#3E54F5] font-montserrat">
      Reintentar
    </button>
  </div>
);

/**
 * Componente para mostrar la cabecera del perfil
 * @param userProfile Datos del perfil de usuario
 * @returns Elemento JSX con la cabecera del perfil
 */
const ProfileHeader = ({ userProfile }: { userProfile: UserProfileType }) => {
  if (!userProfile) return null;
  
  return (
    <div className="p-6 bg-[#090619] -mt-4">
      <div className="flex items-center mb-4">
        {/* Imagen de perfil */}
        <div className="w-20 h-20 rounded-full overflow-hidden">
          {userProfile.profileImage ? (
            <img 
              src={userProfile.profileImage} 
              alt={userProfile.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#ADADAD] flex items-center justify-center">
              <span className="text-2xl text-white font-montserrat">{userProfile.name.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          {/* Nombre de usuario */}
          <h1 className="text-xl font-bold text-white mb-3 font-montserrat">{userProfile.name}</h1>
          
          {/* Botón de edición */}
          <Link 
            href="/edit-profile"
            className="px-4 py-1 bg-white text-[#090619] rounded-full text-sm font-medium inline-block font-montserrat w-[85%] text-center flex items-center justify-center"
          >
            Editar
          </Link>
        </div>
      </div>
      
      {/* Descripción del perfil */}
      <p className="text-[#ADADAD] text-sm font-normal font-montserrat mt-4">{userProfile.description}</p>
    </div>
  );
};

/**
 * Componente para mostrar la navegación por pestañas
 * @param activeView Vista activa actual
 * @param onViewChange Función para cambiar entre vistas
 * @returns Elemento JSX con las pestañas de navegación
 */
const TabNavigation = ({ 
  activeView, 
  onViewChange 
}: { 
  activeView: "creations" | "contracts", 
  onViewChange: (view: "creations" | "contracts") => void 
}) => {
  return (
    <div className="flex justify-between items-center mb-6 border-b border-gray-200">
      {/* Pestaña de Contratos */}
      <button 
        className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${
          activeView === "contracts" 
            ? "border-b-2 border-gradient-blue-purple" 
            : "text-[#ADADAD] border-b-2 border-transparent"
        }`}
        onClick={() => onViewChange("contracts")}
      >
        <span className={activeView === "contracts" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
          Contratos
        </span>
      </button>
      
      {/* Pestaña de Creaciones */}
      <button 
        className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${
          activeView === "creations" 
            ? "border-b-2 border-gradient-blue-purple" 
            : "text-[#ADADAD] border-b-2 border-transparent"
        }`}
        onClick={() => onViewChange("creations")}
      >
        <span className={activeView === "creations" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
          Creaciones
        </span>
      </button>
    </div>
  );
};

/**
 * Componente para mostrar la lista de creaciones
 * @param creations Lista de creaciones del usuario
 * @returns Elemento JSX con la lista de creaciones
 */
const CreationsList = ({ creations }: { creations: CreationType[] }) => {
  return (
    <div className="space-y-4">
      {creations.map((creation) => (
        <div key={creation.id} className="bg-[#090619] rounded-xl overflow-hidden p-4 mb-4 border border-gray-800">
          <VideoThumbnail />
          <h3 className="text-white text-lg font-semibold mb-1 font-montserrat">{creation.title}</h3>
          <p className="text-[#ADADAD] text-sm font-montserrat font-normal">{creation.description}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * Componente para mostrar la lista de contratos
 * @param contracts Lista de contratos del usuario
 * @returns Elemento JSX con la lista de contratos
 */
const ContractsList = ({ contracts }: { contracts: ContractType[] }) => {
  return (
    <div className="space-y-4">
      {contracts.map((contract) => (
        <div key={contract.id} className="bg-[#2d2c30] rounded-xl overflow-hidden p-4 mb-4 border border-gray-800">
          <h3 className="text-white text-lg font-semibold mb-1 font-montserrat">{contract.title}</h3>
          <StatusIndicator status={contract.status} />
          <p className="text-[#ADADAD] text-sm my-2 font-montserrat font-normal">{contract.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-[#3E54F5] font-semibold font-montserrat">
              <span className="font-light">$</span>{contract.price}
            </span>
            <Link 
              href={`/contract/${contract.id}`}
              className="px-4 py-1 bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white rounded-full text-sm font-medium font-montserrat"
            >
              ver
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Componente principal de la página de Mi Perfil
 * Muestra el perfil del usuario actual con sus creaciones y contratos
 * Permite cambiar entre las vistas de contratos y creaciones
 */
export default function MyProfilePage() {
  // Acceso a parámetros de búsqueda y router para navegación
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Estado para los datos del perfil
  const [userProfile, setUserProfile] = useState<UserProfileType>(null);
  
  // Estado para indicar carga de datos
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para la vista activa (creaciones o contratos)
  // Por defecto mostrar "contracts" pero verificar parámetros de URL al montar
  const [activeView, setActiveView] = useState<"creations" | "contracts">("contracts");

  // Actualizar vista activa basada en parámetro de URL
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'creations' || viewParam === 'contracts') {
      setActiveView(viewParam);
    }
  }, [searchParams]);

  // Función para cambiar la vista y actualizar URL
  const handleViewChange = (view: "creations" | "contracts") => {
    router.push(`/my-profile?view=${view}`);
    setActiveView(view);
  };

  // Cargar datos del perfil de usuario
  useEffect(() => {
    const loadUserData = () => {
      // Registrar inicio de carga de datos
      console.log("Cargando datos del perfil de usuario...");
      
      // Simular retraso de llamada a API
      setTimeout(() => {
        // Datos simulados - en una app real, esto vendría de una API
        setUserProfile({
          id: "user-001",
          name: "Fransctis",
          description: "Apasionado chef casero compartiendo recetas sabrosas, trucos de cocina y contenido lleno de sabor directo de la cocina a tu pantalla.",
          profileImage: "",
          creations: [
            { 
              id: "creation-001", 
              title: "Cocinando Ramen Japonés", 
              thumbnail: "", 
              description: "Una guía paso a paso para hacer ramen auténtico en casa."
            },
            { 
              id: "creation-002", 
              title: "Receta de Pho Vietnamita", 
              thumbnail: "", 
              description: "Aprende a cocinar pho vietnamita tradicional con ingredientes frescos."
            }
          ],
          contracts: [
            { 
              id: "contract-001", 
              title: "Video vlog de Japón", 
              status: "in_progress", 
              description: "Edición de video en bruto, para crear dos videos de YouTube...",
              price: 300
            },
            { 
              id: "contract-002", 
              title: "Video vlog de Vietnam", 
              status: "completed", 
              description: "Edición de video en bruto, para crear dos videos de YouTube...",
              price: 300
            },
            { 
              id: "contract-003", 
              title: "Video de Tiktok", 
              status: "expires_soon", 
              description: "Edición de video en bruto...",
              price: 150
            }
          ]
        });
        
        setIsLoading(false);
        console.log("Datos de perfil de usuario cargados exitosamente");
      }, 500);
    };
    
    loadUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#090619] font-montserrat">
      {isLoading ? (
        // Estado de carga
        <LoadingState />
      ) : userProfile ? (
        // Contenido del perfil de usuario
        <>
          {/* Cabecera con botón de regreso y chat */}
          <div className="flex justify-between items-center p-4 bg-[#090619]">
            <Link href="/feed" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-white">
              {/* Icono de burbuja de chat actualizado desde pautas de diseño */}
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Cabecera del perfil - desplazada hacia arriba con margen negativo */}
          <ProfileHeader userProfile={userProfile} />
          
          {/* Contenedor de fondo blanco con toggle y contenido - ajustado para coincidir con el movimiento de la cabecera */}
          <div className="flex-grow bg-white rounded-t-2xl pt-4 px-4 pb-24 -mt-2">
            {/* Pestañas de navegación - cambiado orden */}
            <TabNavigation activeView={activeView} onViewChange={handleViewChange} />
            
            {/* Contenido basado en la vista activa */}
            {activeView === "creations" ? (
              // Vista de Creaciones
              <CreationsList creations={userProfile.creations} />
            ) : (
              // Vista de Contratos
              <ContractsList contracts={userProfile.contracts} />
            )}
          </div>
        </>
      ) : (
        // Estado de error
        <ErrorState onRetry={() => setIsLoading(true)} />
      )}
      
      {/* Navegación inferior con prop de vista activa */}
      <BottomNav activeView={activeView} />
      
      {/* Estilos personalizados para borde y texto con gradiente */}
      <style jsx global>{`
        .border-gradient-blue-purple {
          border-image: linear-gradient(to right, #3E54F5, #631497) 1;
        }
      `}</style>
    </div>
  );
}