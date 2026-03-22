import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Sprout, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const getPasswordChecks = (password) => ({
  minLength: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  symbol: /[^A-Za-z0-9]/.test(password),
});

const getPasswordStrength = (checks) => {
  const passed = Object.values(checks).filter(Boolean).length;
  if (passed <= 2) return { label: 'Weak', width: '33%', color: 'bg-red-500' };
  if (passed <= 4) return { label: 'Medium', width: '66%', color: 'bg-yellow-500' };
  return { label: 'Strong', width: '100%', color: 'bg-emerald-500' };
};

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [mode, setMode] = React.useState('login');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = React.useState('');
  const passwordChecks = React.useMemo(() => getPasswordChecks(formData.password), [formData.password]);
  const passwordStrength = React.useMemo(() => getPasswordStrength(passwordChecks), [passwordChecks]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email || !formData.password || (mode === 'register' && !formData.name)) {
      setError('Please fill all required fields.');
      return;
    }

    if (mode === 'register' && Object.values(passwordChecks).some((value) => !value)) {
      setError('Password must satisfy all security requirements.');
      return;
    }

    const action = mode === 'login' ? login : register;
    const payload = mode === 'login'
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    const result = await action(payload);
    if (result.ok) {
      navigate('/');
      return;
    }

    setError(result.message || 'Authentication failed');
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
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

      <Motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 glass-card p-8 w-full max-w-md bg-white/95 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.4)] border-white/40"
      >
        <div className="flex flex-col items-center mb-8">
           <div className="bg-[#1a3a2a] p-3 rounded-2xl shadow-xl mb-4">
              <Sprout className="w-9 h-9 text-[#7be3a6]" />
           </div>
           <h2 className="text-2xl font-black text-[#1a3a2a] tracking-tight text-center">
             {mode === 'login' ? 'Access Harvesta' : 'Create Harvesta Account'}
           </h2>
           <p className="text-[#3e5a4a] text-xs mt-2 font-semibold uppercase tracking-widest opacity-60">Manage your field productivity</p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          {mode === 'register' ? (
            <div className="space-y-2">
              <label className="block text-[#1a3a2a] text-xs font-black uppercase tracking-wider" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Sprout className="h-4 w-4 text-[#3e5a4a] opacity-40" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-3 pl-14 pr-4 text-[#1a3a2a] font-bold outline-none transition-all placeholder:text-[#1a3a2a]/20 text-sm"
                  placeholder="Farmer Name"
                />
              </div>
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="block text-[#1a3a2a] text-xs font-black uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[#3e5a4a] opacity-40" />
              </div>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={onChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-3 pl-14 pr-4 text-[#1a3a2a] font-bold outline-none transition-all placeholder:text-[#1a3a2a]/20 text-sm"
                placeholder="farmer@harvesta.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[#1a3a2a] text-xs font-black uppercase tracking-wider" htmlFor="password">
              Security Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#3e5a4a] opacity-40" />
              </div>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={onChange}
                className="w-full bg-[#f2f6f3] border-2 border-transparent focus:border-[#4db67e] rounded-2xl py-3 pl-14 pr-4 text-[#1a3a2a] font-bold outline-none transition-all placeholder:text-[#1a3a2a]/20 text-sm"
                placeholder="••••••••••••"
              />
            </div>

            {mode === 'register' ? (
              <div className="bg-[#f2f6f3] rounded-xl p-3 border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#3e5a4a]">Password Strength</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#1a3a2a]">{passwordStrength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: passwordStrength.width }}></div>
                </div>
                <div className="grid grid-cols-1 gap-1 text-[9px] font-bold">
                  <p className={passwordChecks.minLength ? 'text-emerald-700' : 'text-[#3e5a4a]/70'}>At least 8 characters</p>
                  <p className={passwordChecks.uppercase ? 'text-emerald-700' : 'text-[#3e5a4a]/70'}>One uppercase letter</p>
                  <p className={passwordChecks.lowercase ? 'text-emerald-700' : 'text-[#3e5a4a]/70'}>One lowercase letter</p>
                  <p className={passwordChecks.number ? 'text-emerald-700' : 'text-[#3e5a4a]/70'}>One number</p>
                  <p className={passwordChecks.symbol ? 'text-emerald-700' : 'text-[#3e5a4a]/70'}>One special character</p>
                </div>
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="text-red-600 text-xs font-black uppercase tracking-wider">{error}</p>
          ) : null}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1a3a2a] hover:bg-[#2e5e40] text-white font-black py-3 px-4 rounded-2xl transition-all shadow-2xl hover:scale-[1.01] active:scale-[0.99] text-sm mt-6"
          >
            {isLoading
              ? 'Processing...'
              : mode === 'login'
                ? 'Authenticate Control Center'
                : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode((previous) => (previous === 'login' ? 'register' : 'login'));
              setError('');
            }}
            className="w-full text-[#1a3a2a] font-black py-2 px-4 rounded-2xl border border-[#1a3a2a]/20 hover:border-[#1a3a2a]/40 transition-all text-xs uppercase tracking-widest"
          >
            {mode === 'login' ? 'New user? Create account' : 'Already have an account? Log in'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-black/5 flex justify-between items-center text-[9px] font-black text-[#3e5a4a] tracking-widest uppercase opacity-50">
           <span>v1.2.48 ACTIVE</span>
           <span>SECURE AES-256</span>
        </div>
      </Motion.div>
    </div>
  );
};

export default Login;
