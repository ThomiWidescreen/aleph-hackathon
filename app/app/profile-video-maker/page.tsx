"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "next/navigation";
import { getUserAddress } from "../api/helpers/getUserAddress";
import { getUser } from "../api/actions/users/getUser";
import { IUser } from "../my-profile/page";
import { getVideosByAuthor } from "../api/actions/file/getVideosByAuthor";
import { IVideo } from "../api/database/models/video";
import { getThumbnailUrl } from "../feed/page";

/**
 * Profile Video Maker page component
 * Shows a video editor's profile with options to chat or hire them
 */
export default function ProfileVideoMakerPage() {
  const searchParams = useSearchParams();
  const editorId = searchParams.get("id");
  const router = useRouter();

  const userAddress = getUserAddress();

  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [portfolio, setPortfolio] = useState<IVideo[]>([]);
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        // Ejecutar ambas promesas en paralelo
        const [userResponse, videos] = await Promise.all([
          getUser({ address: userAddress }),
          getVideosByAuthor(userAddress),
        ]);

        if (!userResponse.user) {
          console.log("No user found");
          setProfileData(null);
        } else {
          setProfileData(userResponse.user);
          setPortfolio(videos);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userAddress]);

  const handleChatClick = () => {
    if (profileData) {
      console.log(`Starting chat with ${profileData.name}`);
      // Navigate to chat page
    }
  };

  const handleHireClick = () => {
    if (profileData) {
      console.log(`Hiring ${profileData.name}`);
      router.push(`/create-contract?name=${encodeURIComponent(profileData.name)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090619]">
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 mx-auto"></div>
            <div className="w-32 h-3 bg-gray-700 rounded-full mb-3 mx-auto"></div>
            <div className="w-40 h-2 bg-gray-700 rounded-full mx-auto"></div>
          </div>
        </div>
      ) : profileData ? (
        <main className="flex flex-col flex-grow">
          <header className="bg-black p-4 shadow-sm flex justify-between items-center">
            <Link
              href="/feed"
              className="w-[30px] h-[30px] bg-black/25 backdrop-blur-sm rounded-full p-1 flex items-center justify-center"
            >
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M15 19L8 12L15 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </header>

          <div className="flex-none p-4 flex flex-col items-start text-left">
            <div className="flex flex-row items-start space-x-4 mb-6">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={profileData.photo || "https://via.placeholder.com/60"}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-xl font-bold font-montserrat text-white">
                  {profileData.name}
                </h1>
                <div className="flex space-x-3">
                  <button
                    onClick={handleChatClick}
                    className="bg-white text-[#3E54F5] py-1 px-6 rounded-full text-sm font-medium font-montserrat min-w-[80px]"
                  >
                    Chat
                  </button>
                  <button
                    onClick={handleHireClick}
                    className="bg-gradient-to-r from-[#3E54F5] to-[#631497] text-white py-1 px-6 rounded-full text-sm font-medium font-montserrat min-w-[80px]"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[#C5C5C5] text-base font-normal font-montserrat mb-6">
              {profileData.description}
            </p>
          </div>

          <div className="flex-grow flex flex-col bg-white mt-4 rounded-t-2xl p-4 pt-6 pb-24">
            <div className="grid grid-cols-2 gap-3">
              {/* {profileData.} */}
              {portfolio?.map((item) => (
                <div key={item.id} className="relative overflow-hidden">
                  <Link
                    href={`/detail?id=${item._id}`}
                    key={item.id}
                    className="block transition-transform hover:scale-[1.01]"
                    >
                    <img
                      src={getThumbnailUrl(item.urlVideo)}
                      alt={item.title}
                      className="w-full h-[150px] rounded-xl object-cover"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-white mb-4">Perfil no encontrado</p>
          <Link href="/feed" className="text-[#3E54F5]">
            Volver al feed
          </Link>
        </div>
      )}
      <BottomNav />
    </div>
  );
}