import React, { useState } from 'react';
import { type Post as PostType } from '../types';
import { PhotoIcon } from './icons/PhotoIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { WalletIcon } from './icons/WalletIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ProfilePageProps {
  user: {
    username: string;
    avatarUrl: string;
  };
  posts: PostType[];
  onPostClick: (post: PostType) => void;
  walletBalance: number;
  onAddFundsClick: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, posts, onPostClick, walletBalance, onAddFundsClick }) => {
  const [followers, setFollowers] = useState(1200000);
  const [following, setFollowing] = useState(345);
  const [isFollowing, setIsFollowing] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };
  
  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
    setFollowers(currentFollowers => isFollowing ? currentFollowers - 1 : currentFollowers + 1);
  };

  const handleSimulateFollowNewUser = () => {
      setFollowing(prev => prev + 1);
  };


  return (
    <main className="pt-16 pb-16">
      <div className="p-4">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img src={user.avatarUrl} alt={user.username} className="h-20 w-20 rounded-full" />
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="flex items-center space-x-2 text-gray-400 mt-1">
                <WalletIcon className="h-5 w-5" />
                <span>${walletBalance.toFixed(2)}</span>
                <button onClick={onAddFundsClick} className="ml-2 bg-purple-600/50 text-white rounded-full h-6 w-6 flex items-center justify-center hover:bg-purple-600 transition-colors">
                    <PlusIcon className="h-4 w-4" />
                </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around text-center my-6">
          <div>
            <p className="font-bold text-lg">{posts.length}</p>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <p className="font-bold text-lg">{formatNumber(followers)}</p>
            <p className="text-gray-400">Followers</p>
          </div>
          <div>
            <p className="font-bold text-lg">{following}</p>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
            <button 
                onClick={handleFollowToggle}
                className={`flex-1 font-bold py-2 px-4 rounded-lg transition-colors text-sm ${isFollowing ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                Edit Profile
            </button>
             <button onClick={handleSimulateFollowNewUser} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                Find Friends
            </button>
        </div>
      </div>

      {/* Post Grid */}
      <div className="border-t border-gray-800 mt-4">
        <div className="grid grid-cols-3 gap-1">
          {posts.map(post => (
            <div
              key={post.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => onPostClick(post)}
            >
              <img src={post.media[0].url} alt={post.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              
              {post.media[0].type === 'video' && (
                <VideoCameraIcon className="absolute top-2 right-2 h-5 w-5 text-white drop-shadow-lg" />
              )}
               {post.media.length > 1 && (
                 <PhotoIcon className="absolute top-2 right-2 h-5 w-5 text-white drop-shadow-lg" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;