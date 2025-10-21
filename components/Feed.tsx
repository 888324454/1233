import React, { useState } from 'react';
import PostComponent from './Post';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { type Post } from '../types';

interface FeedProps {
  posts: Post[];
  subscribedTo: string[];
  onLockClick: (post: Post) => void;
  onTipClick: (post: Post) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const REFRESH_THRESHOLD = 80; // pixels to pull before refresh triggers

const Feed: React.FC<FeedProps> = ({ posts, subscribedTo, onLockClick, onTipClick, isRefreshing, onRefresh }) => {
  const [pullStart, setPullStart] = useState<number | null>(null);
  const [pullDistance, setPullDistance] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPullStart(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (pullStart === null) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - pullStart;

    if (distance > 0) {
      // Prevents the browser's native overscroll behavior (like page refresh)
      // which can interfere with our custom implementation.
      e.preventDefault();
      // Use a resistance function to make the pull feel more natural
      const resistedDistance = Math.pow(distance, 0.85);
      setPullDistance(resistedDistance);
    }
  };

  const handleTouchEnd = () => {
    if (pullStart === null) return;

    if (pullDistance > REFRESH_THRESHOLD) {
      onRefresh();
    }

    setPullStart(null);
    setPullDistance(0);
  };
  
  // When refresh is done, smoothly hide the indicator if it's still visible
  const isHiding = !isRefreshing && pullDistance > 0 && pullStart === null;

  return (
    <main 
      className="relative pt-36 pb-16"
      onTouchStart={!isRefreshing ? handleTouchStart : undefined}
      onTouchMove={!isRefreshing ? handleTouchMove : undefined}
      onTouchEnd={!isRefreshing ? handleTouchEnd : undefined}
    >
      <div 
        className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none z-0"
        style={{
          transform: `translateY(${isRefreshing ? 0 : pullDistance}px)`,
          opacity: isRefreshing ? 1 : Math.min(pullDistance / REFRESH_THRESHOLD, 1),
          transition: isHiding ? 'transform 0.3s ease-out, opacity 0.3s ease-out' : 'none',
        }}
      >
        <div className={`bg-gray-800 rounded-full p-2 shadow-lg ${isRefreshing ? 'animate-spin' : ''}`}>
          <ArrowPathIcon className="h-6 w-6 text-white" 
            style={{ transform: `rotate(${!isRefreshing ? pullDistance * 2.5 : 0}deg)` }}
          />
        </div>
      </div>
      
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          post={post}
          isSubscribed={subscribedTo.includes(post.username) || post.isCreator === true}
          onLockClick={onLockClick}
          onTipClick={onTipClick}
        />
      ))}
    </main>
  );
};

export default Feed;