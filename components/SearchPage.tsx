import React, { useState, useMemo } from 'react';
import { type Post as PostType } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { PhotoIcon } from './icons/PhotoIcon';

interface SearchPageProps {
  posts: PostType[];
  onPostClick: (post: PostType) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ posts, onPostClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return posts; // Show all posts if search is empty
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return posts.filter(post =>
      post.username.toLowerCase().includes(lowercasedTerm) ||
      post.caption.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, posts]);

  return (
    <main className="pt-16 pb-16">
      <div className="p-4 sticky top-16 bg-black z-10">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </span>
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => onPostClick(post)}
            >
              {post.media[0].type === 'image' ? (
                 <img src={post.media[0].url} alt={post.caption} className="w-full h-full object-cover" />
              ) : (
                // For videos, show the first frame or a generic thumbnail.
                // Here we use the video url which might not show a frame in all browsers.
                // A better approach would be to have a thumbnail image for videos.
                <video src={post.media[0].url} className="w-full h-full object-cover bg-gray-900"></video>
              )}

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
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p>No results found for "{searchTerm}"</p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;