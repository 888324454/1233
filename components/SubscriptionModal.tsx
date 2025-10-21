import React from 'react';
import { type Post } from '../types';
import { StarIcon } from './icons/StarIcon';

interface SubscriptionModalProps {
  creatorPost: Post;
  onClose: () => void;
  onConfirmSubscription: (username: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ creatorPost, onClose, onConfirmSubscription }) => {
  if (!creatorPost || !creatorPost.isCreator) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-sm border border-purple-500/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-purple-300">Subscribe to {creatorPost.username}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-light transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        
        <div className="p-6 text-center">
            <img src={creatorPost.avatarUrl} alt={creatorPost.username} className="h-20 w-20 rounded-full mx-auto border-2 border-purple-400" />
            <p className="text-gray-300 mt-4">
                Get access to exclusive content and support {creatorPost.username} directly.
            </p>
            <ul className="text-left text-gray-400 mt-6 space-y-2 list-inside">
                <li className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <span>Exclusive posts and stories</span>
                </li>
                 <li className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <span>Subscriber-only group chats</span>
                </li>
                 <li className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <span>Directly support the creator</span>
                </li>
            </ul>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => onConfirmSubscription(creatorPost.username)}
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100"
          >
            Subscribe for ${creatorPost.subscriptionPrice}/month
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;