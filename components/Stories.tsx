import React from 'react';
import { type UserStory } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface StoriesProps {
  stories: UserStory[];
  onViewStory: (story: UserStory) => void;
  onAddStoryClick: () => void;
}

const Stories: React.FC<StoriesProps> = ({ stories, onViewStory, onAddStoryClick }) => {
  return (
    <div className="fixed top-16 left-0 right-0 bg-black border-b border-gray-800 z-10">
        <div className="container mx-auto max-w-lg px-2 py-3">
             <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {/* Add Your Story */}
                <div className="flex-shrink-0 text-center w-20 transition-transform duration-200 ease-in-out hover:scale-105">
                    <div className="relative">
                        <div className="h-16 w-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
                             <img src="https://picsum.photos/seed/destan_tun/40/40" alt="Your avatar" className="h-14 w-14 rounded-full" />
                        </div>
                         <button onClick={onAddStoryClick} className="absolute bottom-0 right-1 bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center border-2 border-black transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100">
                            <PlusIcon className="h-4 w-4 text-white" />
                        </button>
                    </div>
                    <p className="text-xs mt-2 truncate">destan_tun</p>
                </div>

                {/* Other Stories */}
                {stories.filter(s => s.userId !== 'destan_tun').map((userStory) => (
                    <div key={userStory.userId} className="flex-shrink-0 text-center w-20 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105" onClick={() => onViewStory(userStory)}>
                        <div className={`h-16 w-16 p-0.5 rounded-full mx-auto ${userStory.viewed ? 'bg-gray-700' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'}`}>
                             <div className="bg-black p-0.5 rounded-full">
                                <img src={userStory.avatarUrl} alt={userStory.username} className="h-full w-full rounded-full" />
                            </div>
                        </div>
                        <p className="text-xs mt-2 truncate">{userStory.username}</p>
                    </div>
                ))}
             </div>
        </div>
    </div>
  );
};

export default Stories;