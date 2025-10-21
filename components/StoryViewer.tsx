import React, { useState, useEffect, useRef } from 'react';
import { type UserStory } from '../types';

interface StoryViewerProps {
  userStory: UserStory;
  onClose: () => void;
  onNextUser: () => void;
  onPrevUser: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ userStory, onClose, onNextUser, onPrevUser }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const activeStory = userStory.stories[currentStoryIndex];
  const storyDuration = (activeStory.duration || 5) * 1000;

  const goToNextStory = () => {
    if (currentStoryIndex < userStory.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      onNextUser();
    }
  };

  const goToPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else {
      onPrevUser();
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(goToNextStory, storyDuration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStoryIndex, userStory.userId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  
  const handlePointerUp = (e: React.PointerEvent) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(goToNextStory, storyDuration);
    
    const target = e.target as HTMLElement;
    const { width, left } = target.getBoundingClientRect();
    const clickPosition = e.clientX - left;

    if (clickPosition < width / 2) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  if (!activeStory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center select-none">
      <div className="relative w-full h-full max-w-md max-h-screen">
        {/* Preload next image */}
        {currentStoryIndex < userStory.stories.length - 1 && (
            <link rel="preload" as="image" href={userStory.stories[currentStoryIndex + 1].imageUrl} />
        )}

        {/* Image */}
        <img
          src={activeStory.imageUrl}
          alt={`Story by ${userStory.username}`}
          className="w-full h-full object-contain"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 flex flex-col">
            <div className="absolute top-4 left-2 right-2 flex space-x-1">
            {userStory.stories.map((story, index) => (
                <div key={story.id} className="h-1 flex-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                {index < currentStoryIndex && <div className="h-full bg-white rounded-full w-full" />}
                {index === currentStoryIndex && (
                    <div
                    className="h-full bg-white rounded-full"
                    style={{ animation: `progress ${storyDuration}ms linear` }}
                    onAnimationEnd={goToNextStory}
                    />
                )}
                </div>
            ))}
            </div>
            
            <div className="absolute top-8 left-4 flex items-center">
                <img src={userStory.avatarUrl} alt={userStory.username} className="h-8 w-8 rounded-full" />
                <span className="text-white text-sm font-bold ml-3">{userStory.username}</span>
            </div>

            <button onClick={onClose} className="absolute top-6 right-4 text-white text-3xl z-10 transition-transform duration-200 ease-in-out hover:scale-125 active:scale-110">&times;</button>
            
            <div className="flex-grow flex">
                <div className="w-1/3 h-full" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}></div>
                <div className="w-2/3 h-full" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;