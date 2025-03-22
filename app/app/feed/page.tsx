"use client";

import { useState } from "react";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

/**
 * Feed page component displaying a grid of video editing projects
 * Acts as the main marketplace (Artmarket) for the application
 */
export default function FeedPage() {
  // Mock data for demo purposes
  const [projects, setProjects] = useState([
    { id: 1, title: "3D Animation", price: 40, color: "bg-blue-100" },
    { id: 2, title: "Motion Graphics", price: 20, color: "bg-green-100" },
    { id: 3, title: "Video Editing", price: 10, color: "bg-purple-100" },
    { id: 4, title: "Color Grading", price: 35, color: "bg-yellow-100" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-center">
          {config.screens.feed.title}
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link href={`/detail?id=${project.id}`} key={project.id}>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Video Thumbnail */}
                <div className={`relative aspect-video ${project.color} flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Project Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{project.title}</h3>
                  <p className="text-blue-600 font-bold">${project.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
} 