import React from 'react';
import { HomeIcon } from './icons/HomeIcon';
import { HomeIconSolid } from './icons/HomeIconSolid';
import { SearchIcon } from './icons/SearchIcon';
import { SearchIconSolid } from './icons/SearchIconSolid';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { VideoCameraIconSolid } from './icons/VideoCameraIconSolid';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { UserCircleIconSolid } from './icons/UserCircleIconSolid';


type ActiveTab = 'home' | 'search' | 'reels' | 'profile';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}> = ({ label, isActive, onClick, icon, activeIcon }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center w-full transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100">
    {isActive ? activeIcon : icon}
  </button>
);


const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-20">
      <div className="container mx-auto max-w-lg h-16 flex justify-around items-center px-4">
        <NavButton
          label="Home"
          isActive={activeTab === 'home'}
          onClick={() => onTabChange('home')}
          icon={<HomeIcon />}
          activeIcon={<HomeIconSolid />}
        />
        <NavButton
          label="Search"
          isActive={activeTab === 'search'}
          onClick={() => onTabChange('search')}
          icon={<SearchIcon />}
          activeIcon={<SearchIconSolid />}
        />
        <NavButton
          label="Reels"
          isActive={activeTab === 'reels'}
          onClick={() => onTabChange('reels')}
          icon={<VideoCameraIcon />}
          activeIcon={<VideoCameraIconSolid />}
        />
        <NavButton
          label="Profile"
          isActive={activeTab === 'profile'}
          onClick={() => onTabChange('profile')}
          icon={<UserCircleIcon />}
          activeIcon={<UserCircleIconSolid />}
        />
      </div>
    </nav>
  );
};

export default BottomNavBar;