import { useState } from 'react';
import { Bell, Calendar, Trophy, PartyPopper, MessageCircle, Smile, Plus, Heart, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';
import { Auth } from './Auth';

function App() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState([
    { id: 1, type: 'notice', title: 'Mid-Sem Exams Schedule Released', content: 'Check the portal for your exam dates. Exams start from March 15th.', author: 'Admin', time: '2 hours ago', likes: 45, comments: [] },
    { id: 2, type: 'event', title: 'Tech Fest 2024 - Register Now!', content: 'Annual tech fest with coding competitions, hackathons, and guest speakers. Prizes worth $5000!', author: 'Tech Club', time: '5 hours ago', likes: 128, comments: [] },
    { id: 3, type: 'sports', title: 'Basketball Tryouts Tomorrow', content: 'College team tryouts at 4 PM in the main court. Bring your A-game!', author: 'Sports Committee', time: '1 day ago', likes: 67, comments: [] },
    { id: 4, type: 'meme', title: 'When the professor says "this will be easy"', content: '😂 We all know what happens next...', author: 'MemeLord99', time: '3 hours ago', likes: 234, comments: [] },
    { id: 5, type: 'gig', title: 'Band Night This Friday!', content: 'Local bands performing at the amphitheater. Free entry with student ID!', author: 'Cultural Committee', time: '6 hours ago', likes: 89, comments: [] },
    { id: 6, type: 'announcement', title: 'Library Hours Extended', content: 'Library will now be open 24/7 during exam season. Coffee machine installed!', author: 'Admin', time: '1 day ago', likes: 156, comments: [] },
  ]);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'notice', title: '', content: '' });

  const tabs = [
    { id: 'all', label: 'All Posts', icon: MessageCircle },
    { id: 'notice', label: 'Notices', icon: Bell },
    { id: 'event', label: 'Events', icon: Calendar },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'gig', label: 'Gigs', icon: PartyPopper },
    { id: 'meme', label: 'Memes', icon: Smile },
  ];

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(post => post.type === activeTab);

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) return;
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { text: comment, author: 'You', time: 'Just now' }] }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      author: 'You',
      time: 'Just now',
      likes: 0,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost({ type: 'notice', title: '', content: '' });
    setNewPostOpen(false);
  };

  const getTypeColor = (type) => {
    const colors = {
      notice: 'bg-blue-100 text-blue-800',
      event: 'bg-green-100 text-green-800',
      sports: 'bg-orange-100 text-orange-800',
      meme: 'bg-pink-100 text-pink-800',
      gig: 'bg-purple-100 text-purple-800',
      announcement: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CollegeBuzz</h1>
                <p className="text-sm text-gray-600">Stay connected, stay informed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.fullName || 'Student'}</p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setNewPostOpen(!newPostOpen)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </button>
                <button
                  onClick={signOut}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {newPostOpen && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
            <select
              value={newPost.type}
              onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="notice">Notice</option>
              <option value="event">Event</option>
              <option value="sports">Sports</option>
              <option value="meme">Meme</option>
              <option value="gig">Gig</option>
              <option value="announcement">Announcement</option>
            </select>
            <input
              type="text"
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="What's happening on campus?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleNewPost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Post
              </button>
              <button
                onClick={() => setNewPostOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              getTypeColor={getTypeColor}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-500">Be the first to share something!</p>
          </div>
        )}
      </main>
    </div>
  );
}

function PostCard({ post, onLike, onComment, getTypeColor }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    onComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(post.type)}`}>
                {post.type.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{post.title}</h3>
            <p className="text-gray-700 mb-3">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <span>{post.time}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium">{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">{post.comments.length}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="space-y-3 mb-4">
            {post.comments.map((comment, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-gray-700 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmitComment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
