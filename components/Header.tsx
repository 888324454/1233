import React from 'react';
import { PlusSquareIcon } from './icons/PlusSquareIcon';
import { ArrowRightOnRectangleIcon } from './icons/ArrowRightOnRectangleIcon';
import { ArrowLeftOnRectangleIcon } from './icons/ArrowLeftOnRectangleIcon';
import { GemLogoIcon } from './icons/GemLogoIcon';
import { ArrowDownTrayIcon } from './icons/ArrowDownTrayIcon';

interface HeaderProps {
  onNewPostClick: () => void;
  isDirectorMode: boolean;
  onDirectorLoginClick: () => void;
  onDirectorLogoutClick: () => void;
  canInstall: boolean;
  onInstallClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    onNewPostClick, 
    isDirectorMode, 
    onDirectorLoginClick, 
    onDirectorLogoutClick,
    canInstall,
    onInstallClick
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-10 transition-shadow duration-300 ${isDirectorMode ? 'shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''}`}>
      <div className="container mx-auto max-w-lg h-16 flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
            <GemLogoIcon className="h-7 w-7" />
            <h1 className="text-2xl font-serif italic">InstaGem</h1>
        </div>
        <div className="flex items-center space-x-4">
            {isDirectorMode ? (
                 <button onClick={onDirectorLogoutClick} className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    <span className="text-sm font-bold">Logout</span>
                </button>
            ) : (
                <button onClick={onDirectorLoginClick} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-100">
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                     <span className="text-sm">Director Login</span>
                </button>
            )}
          
          {canInstall && (
            <button onClick={onInstallClick} className="text-white hover:text-gray-400 transition-all duration-200 ease-in-out hover:scale-110 active:scale-100" title="Install App">
              <ArrowDownTrayIcon className="h-7 w-7" />
            </button>
          )}

          <button onClick={onNewPostClick} className="text-white hover:text-gray-400 transition-all duration-200 ease-in-out hover:scale-110 active:scale-100" title="Create New Post">
            <PlusSquareIcon className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;