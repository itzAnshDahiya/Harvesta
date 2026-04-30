import React from 'react';
import { motion as Motion } from 'framer-motion';
import { MessageCircle, Heart, Send, Plus, Trash2, X, Filter, Clock, User } from 'lucide-react';
import useForumStore from '../store/forumStore';
import useAuthStore from '../store/authStore';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });
const forumCategories = ['All', 'General', 'Crops', 'Pests', 'Equipment', 'Weather', 'Tips'];
const catColors = { General: '#94a3b8', Crops: '#4ade80', Pests: '#f87171', Equipment: '#22d3ee', Weather: '#facc15', Tips: '#a78bfa' };

export default function CommunityForum() {
  const { posts, loading, fetch, createPost, likePost, addComment, deletePost } = useForumStore();
  const user = useAuthStore((s) => s.user);
  const [cat, setCat] = React.useState('All');
  const [showNew, setShowNew] = React.useState(false);
  const [form, setForm] = React.useState({ title: '', content: '', category: 'General' });
  const [commentText, setCommentText] = React.useState({});
  const [expanded, setExpanded] = React.useState({});

  React.useEffect(() => { fetch(cat); }, [fetch, cat]);

  const handlePost = async (e) => {
    e.preventDefault();
    const res = await createPost(form);
    if (res.ok) { setForm({ title: '', content: '', category: 'General' }); setShowNew(false); }
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]?.trim()) return;
    await addComment(postId, commentText[postId]);
    setCommentText((p) => ({ ...p, [postId]: '' }));
  };

  const timeAgo = (d) => {
    const s = Math.floor((Date.now() - new Date(d)) / 1000);
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    if (s < 86400) return `${Math.floor(s/3600)}h ago`;
    return `${Math.floor(s/86400)}d ago`;
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Community Forum</h1>
          <p className="text-sm text-emerald-400/50 mt-1">Connect with fellow farmers</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-glow px-4 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </Motion.div>

      {/* Category Filters */}
      <Motion.div {...anim(0.05)} className="flex gap-2 flex-wrap">
        {forumCategories.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${cat === c ? 'text-white' : 'text-emerald-400/40'}`}
            style={cat === c ? { background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' } : { background: 'rgba(10,30,20,0.3)', border: '1px solid rgba(74,222,128,0.05)' }}
          >{c}</button>
        ))}
      </Motion.div>

      {/* Posts */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <MessageCircle className="w-12 h-12 text-emerald-400/20 mx-auto mb-4" />
          <h3 className="text-white font-semibold">No posts yet</h3>
          <p className="text-sm text-emerald-400/40 mt-1">Start a conversation!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => {
            const color = catColors[post.category] || '#94a3b8';
            const isExpanded = expanded[post._id];
            return (
              <Motion.div key={post._id} {...anim(0.03 * i)} className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {post.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">{post.user?.name || 'Anonymous'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}15`, color }}>{post.category}</span>
                      <span className="text-[10px] text-emerald-400/30 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{timeAgo(post.createdAt)}</span>
                    </div>
                    <h3 className="text-white font-semibold mt-2">{post.title}</h3>
                    <p className="text-sm text-emerald-400/50 mt-1 leading-relaxed">{post.content}</p>

                    <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(74,222,128,0.06)' }}>
                      <button onClick={() => likePost(post._id)} className="flex items-center gap-1.5 text-xs text-emerald-400/40 hover:text-red-400 transition">
                        <Heart className="w-3.5 h-3.5" /> {post.likes || 0}
                      </button>
                      <button onClick={() => setExpanded(e => ({...e, [post._id]: !e[post._id]}))} className="flex items-center gap-1.5 text-xs text-emerald-400/40 hover:text-emerald-400 transition">
                        <MessageCircle className="w-3.5 h-3.5" /> {post.comments?.length || 0}
                      </button>
                      {post.user?._id === user?.id && (
                        <button onClick={() => deletePost(post._id)} className="ml-auto text-xs text-red-400/30 hover:text-red-400 transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Comments */}
                    {isExpanded && (
                      <Motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 space-y-2 overflow-hidden">
                        {post.comments?.map((c) => (
                          <div key={c._id} className="flex items-start gap-2 p-2.5 rounded-lg" style={{ background: 'rgba(10,30,20,0.4)' }}>
                            <div className="w-6 h-6 rounded-md bg-emerald-800/40 flex items-center justify-center text-[10px] text-emerald-400 font-bold shrink-0">
                              {c.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <span className="text-[10px] font-semibold text-emerald-400/60">{c.user?.name || 'User'}</span>
                              <p className="text-xs text-emerald-400/40 mt-0.5">{c.content}</p>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <input value={commentText[post._id] || ''} onChange={(e) => setCommentText(p => ({...p, [post._id]: e.target.value}))}
                            placeholder="Write a comment..." className="input-dark flex-1 py-2 text-xs"
                            onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                          />
                          <button onClick={() => handleComment(post._id)} className="px-3 rounded-lg transition" style={{ background: 'rgba(74,222,128,0.1)' }}>
                            <Send className="w-3.5 h-3.5 text-emerald-400" />
                          </button>
                        </div>
                      </Motion.div>
                    )}
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>
      )}

      {/* New Post Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <Motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-6 w-full max-w-lg space-y-4" style={{ background: 'rgba(10,26,18,0.95)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Create Post</h2>
              <button onClick={() => setShowNew(false)} className="text-emerald-400/40 hover:text-emerald-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handlePost} className="space-y-3">
              <input placeholder="Post title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="input-dark" required />
              <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="input-dark">
                {forumCategories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea placeholder="What's on your mind?" value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} className="input-dark h-32 resize-none" required />
              <button type="submit" className="btn-glow w-full py-3 rounded-xl text-white text-sm">Publish Post</button>
            </form>
          </Motion.div>
        </div>
      )}
    </div>
  );
}
