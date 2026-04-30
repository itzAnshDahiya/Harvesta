import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const pwChecks = (p) => ({
  len: p.length >= 8, upper: /[A-Z]/.test(p), lower: /[a-z]/.test(p), num: /\d/.test(p), sym: /[^A-Za-z0-9]/.test(p),
});
const pwStrength = (c) => {
  const n = Object.values(c).filter(Boolean).length;
  if (n <= 2) return { label: 'Weak', pct: 33, color: '#ef4444' };
  if (n <= 4) return { label: 'Medium', pct: 66, color: '#facc15' };
  return { label: 'Strong', pct: 100, color: '#4ade80' };
};

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [mode, setMode] = React.useState('login');
  const [showPw, setShowPw] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [error, setError] = React.useState('');
  const checks = React.useMemo(() => pwChecks(form.password), [form.password]);
  const strength = React.useMemo(() => pwStrength(checks), [checks]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password || (mode === 'register' && !form.name)) {
      return setError('Please fill all fields');
    }
    if (mode === 'register' && Object.values(checks).some((v) => !v)) {
      return setError('Password must meet all requirements');
    }
    const action = mode === 'login' ? login : register;
    const payload = mode === 'login' ? { email: form.email, password: form.password } : form;
    const res = await action(payload);
    if (res.ok) navigate('/dashboard');
    else setError(res.message);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-6">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050d0a] via-[#0a1a12] to-[#071510]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-600/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card p-8 space-y-6" style={{ background: 'rgba(10,26,18,0.7)' }}>
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-green-900/40">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-emerald-400/50">Smart agriculture management platform</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-400/40" />
                <input name="name" value={form.name} onChange={onChange} placeholder="Full Name" className="input-dark pl-11" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-400/40" />
              <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email address" className="input-dark pl-11" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-400/40" />
              <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={onChange} placeholder="Password" className="input-dark pl-11 pr-11" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-3.5 text-emerald-400/40 hover:text-emerald-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {mode === 'register' && form.password && (
              <Motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                className="rounded-xl p-3 space-y-2 overflow-hidden" style={{ background: 'rgba(10,30,20,0.5)', border: '1px solid rgba(74,222,128,0.08)' }}
              >
                <div className="flex justify-between text-[10px] font-medium">
                  <span className="text-emerald-400/50">Strength</span>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(74,222,128,0.1)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${strength.pct}%`, background: strength.color }} />
                </div>
                <div className="grid grid-cols-1 gap-0.5 text-[10px]">
                  {[['len','8+ characters'],['upper','Uppercase'],['lower','Lowercase'],['num','Number'],['sym','Symbol']].map(([k,l]) => (
                    <span key={k} className={checks[k] ? 'text-emerald-400' : 'text-emerald-400/25'}>{checks[k] ? '✓' : '○'} {l}</span>
                  ))}
                </div>
              </Motion.div>
            )}

            {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

            <button type="submit" disabled={isLoading}
              className="btn-glow w-full py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <button type="button" onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
            className="w-full text-center text-xs text-emerald-400/50 hover:text-emerald-400 transition-colors py-2"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>

          <div className="flex justify-between text-[9px] text-emerald-400/20 pt-2 border-t" style={{ borderColor: 'rgba(74,222,128,0.06)' }}>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> AES-256 Encrypted</span>
            <span>v2.0 Stable</span>
          </div>
        </div>
      </Motion.div>
    </div>
  );
}
