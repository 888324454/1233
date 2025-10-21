export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Post {
  id: string;
  username: string;
  avatarUrl: string;
  media: MediaItem[];
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isCreator?: boolean;
  isExclusive?: boolean;
  subscriptionPrice?: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  replies?: Comment[];
}

export interface StoryItem {
  id: string;
  imageUrl: string;
  duration?: number; // duration in seconds
}

export interface UserStory {
  userId: string;
  username:string;
  avatarUrl: string;
  stories: StoryItem[];
  viewed: boolean;
}