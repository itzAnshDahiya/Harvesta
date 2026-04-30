import React from 'react';
import { motion as Motion } from 'framer-motion';
import { User, Mail, Lock, Save, Shield, Clock, LogOut, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../store/authStore';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });

export default function Profile() {
  const { user, isLoading, updateProfile, changePassword, logout } = useAuthStore();
  const [profileForm, setProfileForm] = React.useState({ name: '', email: '' });
  const [pwForm, setPwForm] = React.useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [msg, setMsg] = React.useState({ type: '', text: '' });

  React.useEffect(() => {
    if (user) setProfileForm({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const handleProfile = async (e) => {
    e.preventDefault();
    setMsg({});
    const res = await updateProfile(profileForm);
    setMsg({ type: res.ok ? 'success' : 'error', text: res.ok ? 'Profile updated!' : res.message });
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setMsg({});
    if (pwForm.newPassword !== pwForm.confirm) return setMsg({ type: 'error', text: 'Passwords do not match' });
    if (pwForm.newPassword.length < 8) return setMsg({ type: 'error', text: 'Password must be 8+ characters' });
    const res = await changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
    setMsg({ type: res.ok ? 'success' : 'error', text: res.ok ? 'Password changed!' : res.message });
    if (res.ok) setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
  };

  return (
    <div className="p-6 space-y-6 min-h-screen max-w-3xl mx-auto">
      <Motion.div {...anim(0)}>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>Profile Settings</h1>
        <p className="text-sm text-emerald-400/50 mt-1">Manage your account</p>
      </Motion.div>

      {msg.text && (
        <Motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl flex items-center gap-3 text-sm"
          style={{
            background: msg.type === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(74,222,128,0.15)' : 'rgba(239,68,68,0.15)'}`,
            color: msg.type === 'success' ? '#4ade80' : '#f87171',
          }}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {msg.text}
        </Motion.div>
      )}

      {/* Profile Card */}
      <Motion.div {...anim(0.05)} className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-green-900/30 shrink-0">
          {user?.name?.charAt(0)?.toUpperCase() || 'H'}
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">{user?.name || 'Farmer'}</h2>
          <p className="text-sm text-emerald-400/50">{user?.email || ''}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="badge-green text-[10px]"><Shield className="w-2.5 h-2.5 mr-0.5" /> Verified</span>
            <span className="text-[10px] text-emerald-400/30 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Member since 2026</span>
          </div>
        </div>
      </Motion.div>

      {/* Edit Profile */}
      <Motion.div {...anim(0.1)} className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" /> Personal Information
        </h3>
        <form onSubmit={handleProfile} className="space-y-4">
          <div>
            <label className="block text-xs text-emerald-400/50 mb-1.5 font-medium">Full Name</label>
            <input value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="input-dark" required />
          </div>
          <div>
            <label className="block text-xs text-emerald-400/50 mb-1.5 font-medium">Email</label>
            <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="input-dark" required />
          </div>
          <button type="submit" disabled={isLoading} className="btn-glow px-6 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
            <Save className="w-4 h-4" /> {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </Motion.div>

      {/* Change Password */}
      <Motion.div {...anim(0.15)} className="glass-card p-6">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" /> Security
        </h3>
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-xs text-emerald-400/50 mb-1.5 font-medium">Current Password</label>
            <input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({...pwForm, currentPassword: e.target.value})} className="input-dark" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-emerald-400/50 mb-1.5 font-medium">New Password</label>
              <input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({...pwForm, newPassword: e.target.value})} className="input-dark" required />
            </div>
            <div>
              <label className="block text-xs text-emerald-400/50 mb-1.5 font-medium">Confirm Password</label>
              <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm({...pwForm, confirm: e.target.value})} className="input-dark" required />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="btn-glow px-6 py-2.5 rounded-xl text-white text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" /> {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </Motion.div>

      {/* Danger Zone */}
      <Motion.div {...anim(0.2)} className="rounded-xl p-6" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
        <h3 className="text-base font-semibold text-red-400/80 mb-2">Danger Zone</h3>
        <p className="text-xs text-red-400/40 mb-4">Logging out will clear your session from this device.</p>
        <button onClick={logout} className="px-5 py-2.5 rounded-xl text-sm font-medium text-red-400 flex items-center gap-2 transition-all hover:bg-red-500/10"
          style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </Motion.div>
    </div>
  );
}
