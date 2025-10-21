import { type Post, type UserStory, type MediaItem } from './types';

export const mockPosts: Post[] = [];
export const mockStories: UserStory[] = [];

// My personal post
const myPost: Post = {
    id: 'my_post_1',
    username: 'destan_tun',
    avatarUrl: `https://picsum.photos/seed/destan_tun/40/40`,
    media: [{ type: 'image', url: 'https://picsum.photos/seed/mypost1/600/600' }],
    caption: 'Welcome to my InstaGem profile!',
    likes: 1337,
    comments: [],
    timestamp: '2 days ago',
    isCreator: true,
    isExclusive: false,
};
mockPosts.unshift(myPost);

const generateMockData = () => {
  const users = ['tech_bro', 'foodie_queen', 'travel_bug', 'art_haus', 'fitness_guru', 'fashionista', 'gaming_champ', 'pet_lover'];
  
  mockPosts.push(...users.map((user, i) => {
      const isCreator = i % 3 === 0;
      const mediaCount = Math.floor(Math.random() * 3) + 1;
      return {
        id: `post_${user}_${i}`,
        username: user,
        avatarUrl: `https://picsum.photos/seed/${user}/40/40`,
        // FIX: Explicitly type the returned object as MediaItem to fix type inference issue.
        media: Array.from({ length: mediaCount }, (_, j): MediaItem => ({
            type: Math.random() > 0.8 ? 'video' : 'image',
            url: `https://picsum.photos/seed/${user}${i}${j}/600/600`,
        })),
        caption: `This is a great post by ${user}! Check it out. #${user} #mockdata`,
        likes: Math.floor(Math.random() * 1000),
        comments: [],
        timestamp: `${Math.floor(Math.random() * 24)} hours ago`,
        isCreator: isCreator,
        isExclusive: isCreator && Math.random() > 0.5,
        subscriptionPrice: 4.99,
      }
  }));

  mockStories.push(...users.map((user, i) => ({
      userId: user,
      username: user,
      avatarUrl: `https://picsum.photos/seed/${user}/80/80`,
      stories: Array.from({length: Math.ceil(Math.random() * 5)}, (_, j) => ({
          id: `story_${user}_${j}`,
          imageUrl: `https://picsum.photos/seed/story${user}${j}/540/960`,
          duration: 5,
      })),
      viewed: i > 3,
  })));
};

generateMockData();

export const generateNewMockPost = (id: number): Post => {
    const users = ['alpha_dev', 'beta_user', 'gamma_tester', 'delta_designer', 'lambda_hacker'];
    const user = users[Math.floor(Math.random() * users.length)];
    const isCreator = Math.random() > 0.5;
  
    return {
      id: `post_new_${id}`,
      username: user,
      avatarUrl: `https://picsum.photos/seed/${user}${id}/40/40`,
      media: [{
        type: 'image',
        url: `https://picsum.photos/seed/newpost${id}/600/600`,
      }],
      caption: `Freshly loaded content! Pulled to refresh at ${new Date().toLocaleTimeString()}. #new #instagem`,
      likes: Math.floor(Math.random() * 200),
      comments: [],
      timestamp: 'Just now',
      isCreator: isCreator,
      isExclusive: isCreator && Math.random() > 0.5,
      subscriptionPrice: 4.99,
    };
  };