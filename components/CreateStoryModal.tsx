import React, { useState, useRef } from 'react';
import { type StoryItem } from '../types';

interface CreateStoryModalProps {
  onClose: () => void;
  onAddStory: (story: StoryItem) => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ onClose, onAddStory }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!imagePreview) {
        setError("Please select an image.");
        return;
    }
    const newStory: StoryItem = {
        id: new Date().toISOString(),
        imageUrl: imagePreview,
    };
    onAddStory(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Create new story</h2>
            <button onClick={onClose} className="text-2xl font-light text-gray-400 hover:text-white transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6">
                {!imagePreview ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-md">
                        <p className="mb-4 text-gray-400">Upload a photo</p>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100">
                            Select from computer
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <img src={imagePreview} alt="Preview" className="w-full rounded-md max-h-80 object-contain" />
                    </div>
                )}
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </div>
             {imagePreview && (
                <div className="p-4 border-t border-gray-700">
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100">
                        Add to your story
                    </button>
                </div>
             )}
        </form>
      </div>
    </div>
  );
};

export default CreateStoryModal;