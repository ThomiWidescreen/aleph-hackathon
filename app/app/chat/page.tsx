"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import config from "../../@config.json";
import BottomNav from "../../components/BottomNav";

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
};

/**
 * ChatPage component
 * Displays chat interface with message history and input for new messages
 */
export default function ChatPage() {
  const searchParams = useSearchParams();
  const contactId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<{id: number; name: string} | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Mock contacts data
  const mockContacts = [
    { id: 101, name: "Alex Designer" },
    { id: 102, name: "Maria Motion" },
    { id: 103, name: "John Editor" },
    { id: 104, name: "Sarah Colorist" },
  ];
  
  // Mock messages data
  const mockMessages = {
    101: [
      { id: 1, sender: "me", content: "Hola, me interesa tu servicio de animación 3D", timestamp: new Date(Date.now() - 86400000), isMe: true },
      { id: 2, sender: "Alex Designer", content: "¡Hola! Gracias por contactarme. ¿En qué puedo ayudarte específicamente?", timestamp: new Date(Date.now() - 85000000), isMe: false },
      { id: 3, sender: "me", content: "Necesito una animación para un producto nuevo que estamos lanzando", timestamp: new Date(Date.now() - 84000000), isMe: true },
      { id: 4, sender: "Alex Designer", content: "Suena interesante. ¿Tienes alguna referencia o idea de lo que buscas?", timestamp: new Date(Date.now() - 82000000), isMe: false },
    ],
    102: [
      { id: 5, sender: "me", content: "Hola Maria, ¿ofreces paquetes para redes sociales?", timestamp: new Date(Date.now() - 172800000), isMe: true },
      { id: 6, sender: "Maria Motion", content: "¡Hola! Sí, tengo paquetes para Instagram, TikTok y Facebook", timestamp: new Date(Date.now() - 170000000), isMe: false },
    ],
    103: [],
    104: [],
  };
  
  // Load chat data
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        if (contactId) {
          const foundContact = mockContacts.find(c => c.id === parseInt(contactId));
          setContactInfo(foundContact || null);
          
          const chatMessages = mockMessages[parseInt(contactId) as keyof typeof mockMessages] || [];
          setMessages(chatMessages);
        }
        setIsLoading(false);
        console.log(`Chat data loaded for contact ID: ${contactId || 'none'}`);
      } catch (err) {
        console.error("Error loading chat data:", err);
        setError(config.screens.chat.errors.loadFailed);
        setIsLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [contactId]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Format timestamp
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Check if a message is the first of a new day
  const isFirstOfDay = (message: Message, index: number) => {
    if (index === 0) return true;
    
    const prevMessage = messages[index - 1];
    const messageDate = message.timestamp.toDateString();
    const prevMessageDate = prevMessage.timestamp.toDateString();
    
    return messageDate !== prevMessageDate;
  };
  
  // Handle message input change
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  
  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !contactInfo) return;
    
    setIsSending(true);
    
    // Add message to state
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      content: newMessage.trim(),
      timestamp: new Date(),
      isMe: true
    };
    
    // Simulate API call delay
    setTimeout(() => {
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      setIsSending(false);
      console.log("Message sent:", newMsg);
      
      // Simulate reply after a delay (only for demo purposes)
      if (contactInfo.id === 101 || contactInfo.id === 102) {
        setTimeout(() => {
          const reply: Message = {
            id: Date.now() + 1,
            sender: contactInfo.name,
            content: `Gracias por tu mensaje. Te responderé pronto sobre "${newMsg.content.substring(0, 20)}${newMsg.content.length > 20 ? '...' : ''}"`,
            timestamp: new Date(),
            isMe: false
          };
          setMessages(prev => [...prev, reply]);
        }, 3000);
      }
    }, 500);
  };
  
  // Handle key press (send on Enter)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Retry loading if error
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {isLoading ? (
        // Loading state
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-32 h-2 bg-gray-200 rounded-full mb-4"></div>
            <div className="w-40 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {config.screens.chat.actions.retry}
          </button>
        </div>
      ) : !contactId || !contactInfo ? (
        // No contact selected or contact not found
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
            <h1 className="text-xl font-bold text-center">
              {config.screens.chat.title}
            </h1>
          </header>
          
          {/* Contact List or Not Found */}
          <main className="flex-grow p-4">
            {!contactId ? (
              // Contact list
              <div>
                {mockContacts.length > 0 ? (
                  <div className="space-y-3">
                    {mockContacts.map(contact => (
                      <Link
                        key={contact.id}
                        href={`/chat?id=${contact.id}`}
                        className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-500 font-medium">{contact.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-sm text-gray-500">
                              {mockMessages[contact.id as keyof typeof mockMessages]?.length > 0 
                                ? mockMessages[contact.id as keyof typeof mockMessages][0].content.substring(0, 25) + '...'
                                : 'No messages yet'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-gray-500 mb-4">{config.screens.chat.placeholders.noChats}</p>
                    <Link 
                      href="/feed"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {config.screens.chat.placeholders.startChat}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // Contact not found
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <p className="text-gray-500 mb-4">Contact not found</p>
                <Link 
                  href="/chat"
                  className="text-blue-600"
                >
                  Return to chats
                </Link>
              </div>
            )}
          </main>
          
          {/* Bottom Navigation */}
          <BottomNav />
        </div>
      ) : (
        // Chat interface
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
            <div className="flex items-center">
              <Link href="/chat" className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex items-center flex-grow">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-500 font-medium">{contactInfo.name.charAt(0)}</span>
                </div>
                <h1 className="text-lg font-semibold">{contactInfo.name}</h1>
              </div>
            </div>
          </header>
          
          {/* Chat Messages */}
          <main className="flex-grow p-4 overflow-y-auto bg-gray-100">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.id}>
                    {/* Date separator */}
                    {isFirstOfDay(message, index) && (
                      <div className="flex justify-center my-4">
                        <span className="px-3 py-1 bg-gray-200 rounded-full text-xs text-gray-600">
                          {formatMessageDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    {/* Message */}
                    <div 
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isMe 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p 
                          className={`text-xs mt-1 text-right ${
                            message.isMe ? 'text-blue-200' : 'text-gray-500'
                          }`}
                        >
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500">No messages yet</p>
                <p className="text-sm text-gray-400 mt-1">Start the conversation</p>
              </div>
            )}
          </main>
          
          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder={config.screens.chat.placeholders.message}
                className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSending}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
                className="ml-2 p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 