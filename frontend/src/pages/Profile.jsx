import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Mail, Lock, ShieldCheck } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const changePassword = useAuthStore((state) => state.changePassword);

  const [profileData, setProfileData] = React.useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [status, setStatus] = React.useState({ type: '', message: '' });

  React.useEffect(() => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
    });
  }, [user]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileData((previous) => ({ ...previous, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((previous) => ({ ...previous, [name]: value }));
  };

  const onProfileSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!profileData.name || !profileData.email) {
      setStatus({ type: 'error', message: 'Name and email are required.' });
      return;
    }

    const result = await updateProfile(profileData);
    setStatus({ type: result.ok ? 'success' : 'error', message: result.message });
  };

  const onPasswordSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setStatus({ type: 'error', message: 'Fill all password fields.' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setStatus({ type: 'error', message: 'New password must be at least 8 characters.' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirm password must match.' });
      return;
    }

    const result = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    setStatus({ type: result.ok ? 'success' : 'error', message: result.message });

    if (result.ok) {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#051109] text-[#1a3a2a] p-10 font-sans overflow-y-auto no-scrollbar">
      <div className="fixed inset-0 z-0 topo-pattern opacity-10 pointer-events-none" />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-12"
      >
        <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">Profile Center</h1>
        <p className="text-[#a3b8ad] text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-3">Account Identity and Security Controls</p>
      </motion.header>

      {status.message ? (
        <div className={`relative z-10 mb-8 p-4 rounded-2xl border text-xs font-black uppercase tracking-wider ${status.type === 'success' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
          {status.message}
        </div>
      ) : null}

      <div className="relative z-10 grid grid-cols-12 gap-8 pb-20">
        <motion.form
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onSubmit={onProfileSubmit}
          className="col-span-12 xl:col-span-6 glass-card !bg-white/95 p-10 space-y-8"
        >
          <div className="flex items-center gap-3">
            <UserRound className="w-6 h-6 text-[#1a3a2a]" />
            <h2 className="text-2xl font-black uppercase italic tracking-tight">Personal Profile</h2>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a]">Full Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-4 px-5 text-[#1a3a2a] font-bold outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5a4a] opacity-50" />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-4 pl-12 pr-5 text-[#1a3a2a] font-bold outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1a3a2a] hover:bg-[#2e5e40] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-xl"
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </motion.form>

        <motion.form
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onSubmit={onPasswordSubmit}
          className="col-span-12 xl:col-span-6 glass-card !bg-white/95 p-10 space-y-8"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1a3a2a]" />
            <h2 className="text-2xl font-black uppercase italic tracking-tight">Security</h2>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a]">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5a4a] opacity-50" />
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-4 pl-12 pr-5 text-[#1a3a2a] font-bold outline-none"
                placeholder="Current password"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a]">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5a4a] opacity-50" />
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-4 pl-12 pr-5 text-[#1a3a2a] font-bold outline-none"
                placeholder="Minimum 8 characters"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3e5a4a]">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5a4a] opacity-50" />
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-4 pl-12 pr-5 text-[#1a3a2a] font-bold outline-none"
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1a3a2a] hover:bg-[#2e5e40] text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-xl"
          >
            {isLoading ? 'Updating...' : 'Change Password'}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Profile;
