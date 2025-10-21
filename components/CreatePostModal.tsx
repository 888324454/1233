import React, { useState, useRef, useCallback } from 'react';
import { generateCaptionFromImage } from '../services/geminiService';
import { type Post, type MediaItem } from '../types';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CreatePostModalProps {
  onClose: () => void;
  onAddPost: (post: Post) => void;
}

const fileToGenerativePart = async (file: File) => {
    // FIX: Added reject to the Promise and error handling for the FileReader to prevent hangs on file read errors.
    const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error("Failed to read file as data URL."));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
    return {
        base64: await base64EncodedDataPromise,
        mimeType: file.type,
    };
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onAddPost }) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<MediaItem[]>([]);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const fileArray = Array.from(files);
        setMediaFiles(fileArray);

        // FIX: Explicitly type the 'file' parameter in the map function as 'File' to resolve type inference issues.
        const previews: MediaItem[] = fileArray.map((file: File) => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image',
        }));
        
        // Clean up old object URLs
        mediaPreviews.forEach(p => URL.revokeObjectURL(p.url));

        setMediaPreviews(previews);
        setError(null);
        setCaption('');
        setCurrentPreviewIndex(0);
        if(previewScrollRef.current) {
            previewScrollRef.current.scrollLeft = 0;
        }
    }
  };

  const handleGenerateCaption = useCallback(async () => {
    if (mediaFiles.length === 0) {
      setError("Please select media first.");
      return;
    }
    const firstFile = mediaFiles[0];
    if (!firstFile.type.startsWith('image/')) {
      setError("AI captions can only be generated from an image. Please select an image as your first file.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
        const { base64, mimeType } = await fileToGenerativePart(firstFile);
        const generatedCaption = await generateCaptionFromImage(base64, mimeType);
        setCaption(generatedCaption);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [mediaFiles]);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mediaPreviews.length === 0 || !caption) {
        setError("Media and a caption are required.");
        return;
    }
    const newPost: Post = {
        id: new Date().toISOString(),
        username: "destan_tun",
        avatarUrl: `https://picsum.photos/seed/destan_tun/40/40`,
        media: mediaPreviews,
        caption: caption,
        likes: 0,
        comments: [],
        timestamp: "Just now"
    };
    onAddPost(newPost);
    onClose();
  };
  
  const canGenerateCaption = mediaFiles.length > 0 && mediaFiles[0].type.startsWith('image/');

  const handlePreviewScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newIndex = Math.round(e.currentTarget.scrollLeft / e.currentTarget.offsetWidth);
    setCurrentPreviewIndex(newIndex);
  };

  const handlePrevPreview = () => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollBy({ left: -previewScrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleNextPreview = () => {
    if (previewScrollRef.current) {
      previewScrollRef.current.scrollBy({ left: previewScrollRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Create new post</h2>
            <button onClick={onClose} className="text-2xl font-light text-gray-400 hover:text-white transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6">
                {mediaPreviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-md">
                        <p className="mb-4 text-gray-400">Upload photos and videos</p>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100">
                            Select from computer
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" multiple />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative group bg-gray-800 rounded-md aspect-square">
                            {mediaPreviews.length > 1 && (
                                <>
                                    <button type="button" onClick={handlePrevPreview} disabled={currentPreviewIndex === 0} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0">
                                        <ChevronLeftIcon className="h-5 w-5" />
                                    </button>
                                    <button type="button" onClick={handleNextPreview} disabled={currentPreviewIndex === mediaPreviews.length - 1} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0">
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </button>
                                </>
                            )}
                            <div ref={previewScrollRef} onScroll={handlePreviewScroll} className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-md">
                                {mediaPreviews.map((media, index) => (
                                    <div key={index} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center bg-black">
                                        {media.type === 'image' ? (
                                            <img src={media.url} alt={`Preview slide ${index + 1}`} className="w-full h-full object-contain" />
                                        ) : (
                                            <video src={media.url} muted playsInline loop className="w-full h-full object-contain" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {mediaPreviews.length > 1 && (
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 pointer-events-none">
                                    {mediaPreviews.map((_, index) => (
                                        <div key={index} className={`h-1.5 w-1.5 rounded-full transition-colors ${index === currentPreviewIndex ? 'bg-white' : 'bg-white/40'}`} />
                                    ))}
                                </div>
                            )}
                        </div>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            rows={4}
                            required
                        />
                        <button type="button" onClick={handleGenerateCaption} disabled={isLoading || !canGenerateCaption} className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:hover:scale-100 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center">
                            {isLoading ? (
                                <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                                </>
                            ) : "Generate Caption with AI ✨"}
                        </button>
                    </div>
                )}
                {error && (
                    <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-md text-sm flex items-start space-x-2">
                        <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
             {mediaPreviews.length > 0 && (
                <div className="p-4 border-t border-gray-700">
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:hover:scale-100 disabled:bg-gray-500" disabled={mediaPreviews.length === 0 || !caption}>
                        Share
                    </button>
                </div>
             )}
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;