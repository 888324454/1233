import React from 'react';
import PostComponent from './Post';
import { type Post as PostType } from '../types';

interface PostDetailModalProps {
  post: PostType;
  isSubscribed: boolean;
  onClose: () => void;
  onLockClick: (post: PostType) => void;
  onTipClick: (post: PostType) => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, isSubscribed, onClose, onLockClick, onTipClick }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={(e) => e.stopPropagation()}>
         <div className="sticky top-0 p-2 border-b border-gray-700 bg-gray-900 flex justify-between items-center z-10">
            <h2 className="text-lg font-bold">Post</h2>
            <button onClick={onClose} className="text-2xl font-light text-gray-400 hover:text-white transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        <PostComponent 
            post={post} 
            isSubscribed={isSubscribed}
            onLockClick={onLockClick}
            onTipClick={onTipClick}
        />
        {/* You could add a full comment section here */}
      </div>
    </div>
  );
};

export default PostDetailModal;
