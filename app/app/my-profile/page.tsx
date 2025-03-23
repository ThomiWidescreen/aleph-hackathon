"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";
import { getUser } from "../api/actions/users/getUser";
import { getVideosByAuthor } from "../api/actions/file/getVideosByAuthor";
import { getUserAddress } from "../api/helpers/getUserAddress";
import VideoThumbnail from "./VideoThumbnail";
import { getThumbnailUrl } from "../feed/page";
import User from "../api/database/models/user";

/**
 * Interfaces para los datos de usuario y videos
 */
export interface IUser {
  address: string;
  name: string;
  description: string;
  photo: string;
  state: boolean;
  hiringAvailability: boolean;
  score: number; // Score del usuario del 1 al 5 (float)
}

export interface IVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  authorAddress: string;
  urlVideo: string;
}

/**
 * Tipos para el estado de contratos (alineados con estados on-chain)
 */
type ContractStatus = "Pending" | "Accepted" | "Completed" | "Declined" | "Failed" | "Dispute";
type ContractType = {
  id: string;
  title: string;
  status: ContractStatus;
  description: string;
  price: number;
  deadline: string;
};

// Tipo para las creaciones (videos)
type CreationType = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

/**
 * Simulación de la función para obtener dirección de usuario
 * En una implementación real, esto obtendría la dirección del wallet conectado
 */


/**
 * Componente para mostrar el indicador de estado de contrato
 * @param status Estado del contrato
 * @returns Elemento JSX con el indicador visual de estado
 */
const StatusIndicator = ({ status }: { status: string }) => {
  let statusColor = "";
  let textColor = "";
  let statusText = "";

  switch (status) {
    case "Pending":
      statusColor = "bg-yellow-500";
      textColor = "text-yellow-500";
      statusText = "Pending";
      break;
    case "Accepted":
      statusColor = "bg-blue-500";
      textColor = "text-blue-500";
      statusText = "In progress";
      break;
    case "Completed":
      statusColor = "bg-green-500";
      textColor = "text-green-500";
      statusText = "Completed";
      break;
    case "Declined":
      statusColor = "bg-red-500";
      textColor = "text-red-500";
      statusText = "Declined";
      break;
    case "Failed":
      statusColor = "bg-red-500";
      textColor = "text-red-500";
      statusText = "Failed";
      break;
    case "Dispute":
      statusColor = "bg-orange-500";
      textColor = "text-orange-500";
      statusText = "In dispute";
      break;
    default:
      statusColor = "bg-gray-500";
      textColor = "text-gray-500";
      statusText = "Unknown";
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
      <span className={`text-sm font-normal font-montserrat ${textColor}`}>{statusText}</span>
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
    <p className="text-[#ADADAD] mb-4 font-montserrat">Failed to load profile</p>
    <button onClick={onRetry} className="text-[#3E54F5] font-montserrat">
      Retry
    </button>
  </div>
);

/**
 * Componente para mostrar la cabecera del perfil
 * @param userProfile Datos del perfil de usuario
 * @returns Elemento JSX con la cabecera del perfil
 */
const ProfileHeader = ({ userProfile }: { userProfile: IUser | null }) => {
  if (!userProfile) return null;

  return (
    <div className="p-6 bg-[#090619] -mt-4">
      <div className="flex items-center mb-4">
        {/* Imagen de perfil */}
        <div className="w-20 h-20 rounded-full overflow-hidden">
          {userProfile.photo ? (
            <img
              src={userProfile.photo}
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
            Edit
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
        className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${activeView === "contracts"
            ? "border-b-2 border-gradient-blue-purple"
            : "text-[#ADADAD] border-b-2 border-transparent"
          }`}
        onClick={() => onViewChange("contracts")}
      >
        <span className={activeView === "contracts" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
          Contracts
        </span>
      </button>

      {/* Pestaña de Creaciones */}
      <button
        className={`w-1/2 text-center py-3 px-3 text-base font-semibold font-montserrat ${activeView === "creations"
            ? "border-b-2 border-gradient-blue-purple"
            : "text-[#ADADAD] border-b-2 border-transparent"
          }`}
        onClick={() => onViewChange("creations")}
      >
        <span className={activeView === "creations" ? "bg-gradient-to-r from-[#3E54F5] to-[#631497] bg-clip-text text-transparent" : ""}>
          Creations
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
  if (creations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-[#555555] font-montserrat text-sm text-center">
          You don't have any creations yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {creations.map((creation) => (
        <Link
          href={`/detail?id=${creation.id}`}
          key={creation.id}
          className="block bg-[#090619] rounded-xl overflow-hidden p-4 mb-4 border border-gray-800 transition-transform hover:scale-[1.01]"
        >
          <VideoThumbnail urlVideo={creation.thumbnail} />
          <h3 className="text-white text-lg font-semibold mb-1 font-montserrat">{creation.title}</h3>
          <p className="text-[#ADADAD] text-sm font-montserrat font-normal">{creation.description}</p>
        </Link>
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
  if (contracts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-[#555555] font-montserrat text-sm text-center">
          You don't have any contracts yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      {contracts.map((contract, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[#090619] font-montserrat text-base font-medium">{contract.title}</h3>
            <StatusIndicator status={contract.status} />
          </div>
          <p className="text-[#ADADAD] font-montserrat text-xs mb-3 line-clamp-2">
            {contract.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-[#090619] font-montserrat text-xs">
              Deadline: <span className="text-[#3E54F5]">{contract.deadline}</span>
            </p>
            <Link
              href={`${config.routes.contractDetails}/${contract.id}`}
              className="bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white font-montserrat text-xs px-3 py-1 rounded-full"
            >
              {contract.status === 'Pending' ? 'Review' : 'View'}
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


  const [userAddress, setUserAddress] = useState<`0x${string}` | null>(null)

  useEffect(() => {
    getUserAddress().then(e => {
      const findUser = User.findOne({
        address: e
      })
      if (!findUser) {
        window.location.href = "/welcome";
      }
      setUserAddress(e)
    })
  }, [

  ])

  // Estado para los datos del perfil de usuario
  const [userProfile, setUserProfile] = useState<IUser | null>(null);

  // Estado para las creaciones (videos) del usuario
  const [creations, setCreations] = useState<CreationType[]>([]);

  // Estado para los contratos (aún mockupeados)
  const [contracts, setContracts] = useState<ContractType[]>([
    {
      id: "contract-request-001",
      title: "The best contract ever",
      description: "I need editing for a cooking video intended for YouTube. The raw footage is approximately 21 minutes long. The goal is to turn it into a polished, engaging video suitable for a YouTube audience.",
      status: "Pending",
      deadline: "10/10/2023",
      price: 4059
    },
    {
      id: "contract-in_progress-001",
      title: "The best contract ever",
      status: "Accepted",
      description: "I need editing for a cooking video intended for YouTube. The raw footage is approximately 21 minutes long. The goal is to turn it into a polished, engaging video suitable for a YouTube audience.",
      price: 4059,
      deadline: "15/11/2023"
    },
    {
      id: "contract-completed-001",
      title: "The best contract ever",
      status: "Completed",
      description: "I need editing for a cooking video intended for YouTube. The raw footage is approximately 21 minutes long. The goal is to turn it into a polished, engaging video suitable for a YouTube audience.",
      price: 4059,
      deadline: "05/10/2023"
    },
    {
      id: "contract-expires_soon-001",
      title: "The best contract ever",
      status: "Dispute",
      description: "I need editing for a cooking video intended for YouTube. The raw footage is approximately 21 minutes long. The goal is to turn it into a polished, engaging video suitable for a YouTube audience.",
      price: 4059,
      deadline: "25/10/2023"
    }
  ]);

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

  // Cargar datos del perfil de usuario y sus creaciones
  useEffect(() => {
    const loadUserData = async () => {
      // Registrar inicio de carga de datos
      console.log("Loading user profile data...");
      setIsLoading(true);

      try {
        // Obtener dirección del usuario
        const userAddress = getUserAddress();
        console.log("User address:", userAddress);

        // Obtener datos del usuario
        const userResponse = await getUser({ address: userAddress });
        if (userResponse.error) {
          throw new Error("Error loading user data");
        }

        console.log("User data:", userResponse.user);
        setUserProfile(userResponse.user);

        // Obtener videos del usuario
        const videosResponse = await getVideosByAuthor(userAddress);
        console.log("Videos response:", videosResponse);
        // if (videosResponse.error) {
        //   throw new Error("Error loading user videos");
        // }

        // Convertir IVideo[] a CreationType[] para mantener compatibilidad
        // Asegurarse de que videosResponse.videos es un array
        const videos = Array.isArray(videosResponse) ? videosResponse : [];
        const creationsData = videos.map(video => ({
          id: video._id,
          title: video.title,
          description: video.description,
          thumbnail: video.urlVideo
        }));

        console.log("User videos (transformed):", creationsData);
        setCreations(creationsData);

        setIsLoading(false);
        console.log("Profile data and creations loaded successfully");
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Función para reintentar la carga de datos si hay error
  const handleRetry = () => {
    setIsLoading(true);
    // El useEffect se ejecutará de nuevo al cambiar isLoading
  };

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
                <path d="M14 25C16.0767 25 18.1068 24.3842 19.8335 23.2304C21.5602 22.0767 22.906 20.4368 23.7007 18.5182C24.4955 16.5996 24.7034 14.4884 24.2982 12.4516C23.8931 10.4148 22.8931 8.54383 21.4246 7.07538C19.9562 5.60693 18.0852 4.6069 16.0484 4.20176C14.0116 3.79661 11.9004 4.00455 9.98182 4.79927C8.0632 5.59399 6.42332 6.9398 5.26957 8.66652C4.11581 10.3932 3.5 12.4233 3.5 14.5C3.5 16.236 3.92 17.8728 4.66667 19.3148L3.5 25L9.18517 23.8333C10.6272 24.58 12.2652 25 14 25Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              // Vista de Creaciones - ahora usando datos reales
              <CreationsList creations={creations} />
            ) : (
              // Vista de Contratos - aún usando datos mockupeados
              <ContractsList contracts={contracts} />
            )}
          </div>
        </>
      ) : (
        // Estado de error
        <ErrorState onRetry={handleRetry} />
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