
import React from 'react';
import ChatLogo from './ChatLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-between w-full p-2 bg-black/80 border-b border-gray-800">
      {isMobile && (
        <div className="flex items-center">
          <button className="p-2">
            <div className="w-5 h-5 border border-gray-400"></div>
          </button>
          <div className="relative mx-2">
            <select className="appearance-none bg-black text-white pr-8 pl-2 py-1 border border-gray-800 rounded">
              <option>Chat model</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <button className="p-2 flex items-center">
            <span className="text-white mr-1">+</span>
            <span className="text-white text-sm">New Chat</span>
          </button>
          <button className="ml-2 px-3 py-1 bg-white text-black rounded-md text-sm">
            Login
          </button>
        </div>
      )}
      <div className={`flex justify-center ${isMobile ? "hidden" : "w-full"}`}>
        <ChatLogo />
      </div>
    </div>
  );
};

export default Header;
