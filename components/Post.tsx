import React, { useState, useRef, useEffect } from 'react';
import { type Post as PostType, type MediaItem } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { HeartIcon as HeartIconSolid } from './icons/HeartIconSolid';
import { ChatBubbleOvalLeftIcon } from './icons/ChatBubbleOvalLeftIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { BookmarkIcon as BookmarkIconSolid } from './icons/BookmarkIconSolid';
import { EllipsisHorizontalIcon } from './icons/EllipsisHorizontalIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { VolumeOffIcon } from './icons/VolumeOffIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { StarIcon } from './icons/StarIcon';
import { GiftIcon } from './icons/GiftIcon';


interface PostProps {
  post: PostType;
  isSubscribed: boolean;
  onLockClick: (post: PostType) => void;
  onTipClick: (post: PostType) => void;
}

const PostComponent: React.FC<PostProps> = ({ post, isSubscribed, onLockClick, onTipClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaScrollRef = useRef<HTMLDivElement>(null);

  const isExclusiveAndLocked = post.isExclusive && !isSubscribed && !post.isCreator;
  
  const handleLike = () => setIsLiked(!isLiked);
  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  const handleScroll = () => {
    if (mediaScrollRef.current) {
      const newIndex = Math.round(mediaScrollRef.current.scrollLeft / mediaScrollRef.current.clientWidth);
      setCurrentMediaIndex(newIndex);
    }
  };

  const scrollMedia = (direction: 'prev' | 'next') => {
    if (mediaScrollRef.current) {
        const scrollAmount = mediaScrollRef.current.clientWidth * (direction === 'next' ? 1 : -1);
        mediaScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="bg-black text-white border-b border-gray-800">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <img src={post.avatarUrl} alt={post.username} className="h-8 w-8 rounded-full" />
        <span className="font-bold text-sm ml-3 flex-grow">{post.username}</span>
        {post.isCreator && <StarIcon className="h-4 w-4 text-yellow-400 mr-2" title="Creator Account" />}
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </div>

      {/* Post Media */}
       <div className="relative aspect-square bg-gray-900">
        {isExclusiveAndLocked ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black/50 backdrop-blur-md">
            <LockClosedIcon className="h-16 w-16 text-purple-400" />
            <p className="font-bold mt-4">Exclusive Content</p>
            <p className="text-sm text-gray-400">Subscribe to see this post</p>
            <button onClick={() => onLockClick(post)} className="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Subscribe
            </button>
          </div>
        ) : (
          <>
            <div ref={mediaScrollRef} onScroll={handleScroll} className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {post.media.map((item, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center bg-black">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={`Post by ${post.username} - slide ${index + 1}`} className="w-full h-full object-contain" />
                  ) : (
                    <div className="relative w-full h-full">
                        <video ref={index === currentMediaIndex ? videoRef : null} src={item.url} loop playsInline autoPlay muted={isMuted} className="w-full h-full object-contain" />
                        <button onClick={() => setIsMuted(!isMuted)} className="absolute bottom-4 right-4 bg-black/50 p-1.5 rounded-full text-white">
                            {isMuted ? <VolumeOffIcon className="h-4 w-4" /> : <VolumeUpIcon className="h-4 w-4" />}
                        </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {post.media.length > 1 && (
                <>
                    {currentMediaIndex > 0 && <button onClick={() => scrollMedia('prev')} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white"><ChevronLeftIcon className="h-5 w-5" /></button>}
                    {currentMediaIndex < post.media.length - 1 && <button onClick={() => scrollMedia('next')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white"><ChevronRightIcon className="h-5 w-5" /></button>}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 pointer-events-none">
                        {post.media.map((_, index) => (
                            <div key={index} className={`h-1.5 w-1.5 rounded-full transition-colors ${index === currentMediaIndex ? 'bg-white' : 'bg-white/40'}`} />
                        ))}
                    </div>
                </>
            )}
           </>
        )}
      </div>


      {/* Post Actions */}
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4 items-center">
          <button onClick={handleLike} className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100">
            {isLiked ? <HeartIconSolid className="h-7 w-7 text-red-500" /> : <HeartIcon className="h-7 w-7" />}
          </button>
          <button className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100"><ChatBubbleOvalLeftIcon className="h-7 w-7" /></button>
          <button className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100"><PaperAirplaneIcon className="h-7 w-7" /></button>
           {post.isCreator && post.username !== 'destan_tun' && (
            <button onClick={() => onTipClick(post)} className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100 text-yellow-400" title="Send a tip">
                <GiftIcon className="h-7 w-7" />
            </button>
          )}
        </div>
        <button onClick={handleBookmark} className="transition-transform duration-200 ease-in-out hover:scale-110 active:scale-100">
            {isBookmarked ? <BookmarkIconSolid className="h-7 w-7" /> : <BookmarkIcon className="h-7 w-7" />}
        </button>
      </div>

      {/* Post Info */}
      <div className="px-3 pb-4 text-sm">
        <p className="font-bold">{isLiked ? post.likes + 1 : post.likes} likes</p>
        <p>
          <span className="font-bold mr-2">{post.username}</span>
          <span>{post.caption}</span>
        </p>
        {post.comments.length > 0 && <p className="text-gray-500 mt-2">View all {post.comments.length} comments</p>}
        <p className="text-gray-500 text-xs mt-2 uppercase">{post.timestamp}</p>
      </div>
    </div>
  );
};

export default PostComponent;