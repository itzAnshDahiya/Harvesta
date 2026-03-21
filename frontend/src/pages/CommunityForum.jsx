import React from 'react';
import { motion as Motion } from 'framer-motion';
import { MessageSquare, User } from 'lucide-react';

const CommunityForum = () => {
  const posts = [
    { id: 1, author: 'Agronomist Sam', title: 'Winter Wheat Preparation Tips', replies: 12 },
    { id: 2, author: 'Farmer Joe (You)', title: 'How to handle aphids on corn?', replies: 5 },
    { id: 3, author: 'Sarah Fields', title: 'Best new tractors of 2026', replies: 28 }
  ];

  return (
    <div className="relative z-10 w-full h-full p-4 overflow-y-auto custom-scrollbar">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-emerald-50 tracking-tight">Community Forum</h1>
          <p className="text-emerald-200/80 mt-2">Connect, ask questions, and share experiences</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-6 rounded-xl transition shadow-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5"/> New Post
        </button>
      </header>

      <div className="space-y-4">
        {posts.map(post => (
          <Motion.div 
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 bg-gradient-to-r from-emerald-900/40 to-black/30 flex items-center justify-between hover:bg-emerald-800/30 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-600/30 p-3 rounded-full text-emerald-200">
                <User className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-50">{post.title}</h3>
                <p className="text-sm text-emerald-200/60">Posted by {post.author}</p>
              </div>
            </div>
            <div className="text-emerald-300 flex items-center gap-2 font-semibold">
              <MessageSquare className="w-4 h-4" /> {post.replies} Replies
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
