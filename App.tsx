import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Stories from './components/Stories';
import CreatePostModal from './components/CreatePostModal';
import CreateStoryModal from './components/CreateStoryModal';
import StoryViewer from './components/StoryViewer';
import DirectorLoginModal from './components/DirectorLoginModal';
import SubscriptionModal from './components/SubscriptionModal';
import PostDetailModal from './components/PostDetailModal';
import TippingModal from './components/TippingModal';
import AddFundsModal from './components/AddFundsModal';
import BottomNavBar from './components/BottomNavBar';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import Toast from './components/Toast';
import { type Post, type UserStory, type StoryItem } from './types';
import { mockPosts, mockStories, generateNewMockPost } from './mockData';

type ActiveTab = 'home' | 'search' | 'reels' | 'profile';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<UserStory[]>([]);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isCreateStoryModalOpen, setCreateStoryModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<UserStory | null>(null);
  const [isDirectorLoginModalOpen, setDirectorLoginModalOpen] = useState(false);
  const [isDirectorMode, setDirectorMode] = useState(false);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [isTippingModalOpen, setTippingModalOpen] = useState(false);
  const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [postForSubscription, setPostForSubscription] = useState<Post | null>(null);
  const [postForTipping, setPostForTipping] = useState<Post | null>(null);
  const [subscribedTo, setSubscribedTo] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [viewingPostDetail, setViewingPostDetail] = useState<Post | null>(null);
  const [walletBalance, setWalletBalance] = useState(25.50);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // PWA Install state
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);


  useEffect(() => {
    setPosts(mockPosts);
    setStories(mockStories);

    const beforeInstallPromptHandler = (e: Event) => {
        e.preventDefault();
        setDeferredInstallPrompt(e);
        setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
        window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                showToast('App installed successfully!', 'success');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredInstallPrompt(null);
            setCanInstall(false);
        });
    }
  };


  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleAddPost = (post: Post) => {
    setPosts([post, ...posts]);
    showToast('Post created successfully!', 'success');
  };

  const handleAddStory = (story: StoryItem) => {
    setStories(prevStories => {
        const myStory = prevStories.find(s => s.userId === 'destan_tun');
        if (myStory) {
            return prevStories.map(s => s.userId === 'destan_tun' ? { ...s, stories: [...s.stories, story] } : s);
        }
        return [{ userId: 'destan_tun', username: 'destan_tun', avatarUrl: 'https://picsum.photos/seed/destan_tun/40/40', stories: [story], viewed: false }, ...prevStories];
    });
    showToast('Story added successfully!', 'success');
  };

  const handleViewStory = (story: UserStory) => {
    setViewingStory(story);
    setStories(stories.map(s => s.userId === story.userId ? { ...s, viewed: true } : s));
  };

  const handleStoryNavigation = (direction: 'next' | 'prev') => {
    if (!viewingStory) return;
    const currentIndex = stories.findIndex(s => s.userId === viewingStory.userId);
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < stories.length) {
      handleViewStory(stories[nextIndex]);
    } else {
      setViewingStory(null);
    }
  };

  const handleDirectorLogin = () => {
    setDirectorMode(true);
    setDirectorLoginModalOpen(false);
    showToast('Director Mode activated!', 'success');
  };

  const handleDirectorLogout = () => {
    setDirectorMode(false);
    showToast('Director Mode deactivated.', 'success');
  };
  
  const handleLockClick = (post: Post) => {
    setPostForSubscription(post);
    setSubscriptionModalOpen(true);
  };
  
  const handleConfirmSubscription = (username: string) => {
    setSubscribedTo([...subscribedTo, username]);
    setSubscriptionModalOpen(false);
    showToast(`Subscribed to ${username}!`, 'success');
  };
  
  const handleTipClick = (post: Post) => {
    setPostForTipping(post);
    setTippingModalOpen(true);
  };

  const handleConfirmTip = (amount: number, creator: string) => {
    if (walletBalance >= amount) {
      setWalletBalance(walletBalance - amount);
      setTippingModalOpen(false);
      showToast(`You tipped ${creator} $${amount.toFixed(2)}!`, 'success');
    } else {
      showToast('Insufficient funds to send tip.', 'error');
    }
  };
  
  const handleAddFunds = (amount: number) => {
    setWalletBalance(walletBalance + amount);
    setAddFundsModalOpen(false);
    showToast(`$${amount.toFixed(2)} added to your wallet!`, 'success');
  };

  const handleRefreshPosts = useCallback(async () => {
    if (isRefreshing) return;
  
    setIsRefreshing(true);
  
    // Simulate network delay for the refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    // Generate a couple of new, unique posts
    const newPosts = [
      generateNewMockPost(Date.now()),
      generateNewMockPost(Date.now() + 1),
    ];
  
    setPosts(prevPosts => [...newPosts, ...prevPosts]);
    setIsRefreshing(false);
    showToast('Feed updated!', 'success');
  }, [isRefreshing]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Feed posts={posts} subscribedTo={subscribedTo} onLockClick={handleLockClick} onTipClick={handleTipClick} isRefreshing={isRefreshing} onRefresh={handleRefreshPosts} />;
      case 'search':
        return <SearchPage posts={posts} onPostClick={setViewingPostDetail} />;
      case 'reels':
        return <div className="pt-16 pb-16 text-center text-gray-500">Reels are coming soon!</div>;
      case 'profile':
        return <ProfilePage user={{ username: 'destan_tun', avatarUrl: 'https://picsum.photos/seed/destan_tun/150/150' }} posts={posts.filter(p => p.username === 'destan_tun')} onPostClick={setViewingPostDetail} walletBalance={walletBalance} onAddFundsClick={() => setAddFundsModalOpen(true)} />;
      default:
        return <Feed posts={posts} subscribedTo={subscribedTo} onLockClick={handleLockClick} onTipClick={handleTipClick} isRefreshing={isRefreshing} onRefresh={handleRefreshPosts} />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header 
        onNewPostClick={() => setCreatePostModalOpen(true)}
        isDirectorMode={isDirectorMode}
        onDirectorLoginClick={() => setDirectorLoginModalOpen(true)}
        onDirectorLogoutClick={handleDirectorLogout}
        canInstall={canInstall}
        onInstallClick={handleInstallClick}
      />
      {activeTab === 'home' && <Stories stories={stories} onViewStory={handleViewStory} onAddStoryClick={() => setCreateStoryModalOpen(true)} />}

      {renderContent()}

      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Modals */}
      {isCreatePostModalOpen && <CreatePostModal onClose={() => setCreatePostModalOpen(false)} onAddPost={handleAddPost} />}
      {isCreateStoryModalOpen && <CreateStoryModal onClose={() => setCreateStoryModalOpen(false)} onAddStory={handleAddStory} />}
      {viewingStory && <StoryViewer userStory={viewingStory} onClose={() => setViewingStory(null)} onNextUser={() => handleStoryNavigation('next')} onPrevUser={() => handleStoryNavigation('prev')} />}
      {isDirectorLoginModalOpen && <DirectorLoginModal onClose={() => setDirectorLoginModalOpen(false)} onLoginSuccess={handleDirectorLogin} />}
      {isSubscriptionModalOpen && postForSubscription && <SubscriptionModal creatorPost={postForSubscription} onClose={() => setSubscriptionModalOpen(false)} onConfirmSubscription={handleConfirmSubscription} />}
      {viewingPostDetail && <PostDetailModal post={viewingPostDetail} isSubscribed={subscribedTo.includes(viewingPostDetail.username) || viewingPostDetail.isCreator === true} onClose={() => setViewingPostDetail(null)} onLockClick={handleLockClick} onTipClick={handleTipClick} />}
      {isTippingModalOpen && postForTipping && <TippingModal creatorUsername={postForTipping.username} walletBalance={walletBalance} onClose={() => setTippingModalOpen(false)} onConfirmTip={handleConfirmTip} />}
      {isAddFundsModalOpen && <AddFundsModal onClose={() => setAddFundsModalOpen(false)} onAddFunds={handleAddFunds} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;