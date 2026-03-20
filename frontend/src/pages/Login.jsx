import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Mail, Lock } from 'lucide-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center p-8 h-full relative">
      {/* Background image for login */}
      <div 
        className="absolute inset-0 z-0 opacity-40 grayscale"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#051109] to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 glass-card p-12 w-full max-w-xl bg-white/95 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.4)] border-white/40"
      >
        <div className="flex flex-col items-center mb-12">
           <div className="bg-[#1a3a2a] p-5 rounded-3xl shadow-xl mb-6">
              <Sprout className="w-12 h-12 text-[#7be3a6]" />
           </div>
           <h2 className="text-4xl font-black text-[#1a3a2a] tracking-tight">Access Harvesta</h2>
           <p className="text-[#3e5a4a] text-sm mt-3 font-semibold uppercase tracking-widest opacity-60">Manage your field productivity</p>
        </div>

        <form className="space-y-8">
          <div className="space-y-3">
            <label className="block text-[#1a3a2a] text-sm font-black uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#3e5a4a] opacity-40" />
              </div>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-3xl py-5 pl-16 pr-6 text-[#1a3a2a] font-bold outline-none transition-all placeholder:text-[#1a3a2a]/20"
                placeholder="farmer@harvestsa.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[#1a3a2a] text-sm font-black uppercase tracking-wider" htmlFor="password">
              Security Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#3e5a4a] opacity-40" />
              </div>
              <input 
                type="password" 
                id="password" 
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-3xl py-5 pl-16 pr-6 text-[#1a3a2a] font-bold outline-none transition-all placeholder:text-[#1a3a2a]/20"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button 
            type="button" 
            className="w-full bg-[#1a3a2a] hover:bg-[#2e5e40] text-white font-black py-6 px-4 rounded-[2.5rem] transition-all shadow-2xl hover:scale-[1.01] active:scale-[0.99] text-lg mt-10"
          >
            Authenticate Control Center
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-center text-[10px] font-black text-[#3e5a4a] tracking-widest uppercase opacity-40">
           <span>v1.2.48 ACTIVE</span>
           <span>SECURE AES-256</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
