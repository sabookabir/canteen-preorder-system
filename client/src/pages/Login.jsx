import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  Loader2, 
  PlayCircle,
  ShieldCheck,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'staff') navigate('/staff');
      else navigate('/menu');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -z-10 animate-pulse transition-all duration-1000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="cyber-card p-12 bg-[var(--card-bg)] border-2 border-indigo-600/20 shadow-2xl relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
          
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mx-auto h-20 w-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-600/30 mb-8 relative group"
            >
               <div className="absolute inset-0 bg-white/20 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
               <LogIn className="h-10 w-10 relative z-10" />
            </motion.div>
            <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">
              NODE <span className="text-indigo-600 glow-text">ACCESS</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">
               <ShieldCheck className="h-3 w-3 text-indigo-500" />
               SECURE_UPLINK_PROTOCOL v2.4
            </div>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center mb-8 flex items-center justify-center gap-3"
              >
                <Zap className="h-4 w-4 animate-bounce" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Network Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="email"
                    required
                    className="cyber-input w-full pl-12 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all"
                    placeholder="name@domain.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Access Token</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="password"
                    required
                    className="cyber-input w-full pl-12 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="cyber-button w-full py-5 text-lg group shadow-2xl shadow-indigo-600/20 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="flex items-center justify-center gap-3 relative z-10 font-black uppercase tracking-widest">
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Initialize Handshake
                      <PlayCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
            
            <div className="text-center pt-6 border-t border-[var(--border-color)]">
              <Link to="/register" className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-3 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                   <UserPlus className="h-4 w-4" />
                </div>
                Zero credentials? Register new node here
              </Link>
            </div>
          </form>
        </div>

        {/* System Info Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default"
        >
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
             <span className="text-[8px] font-black uppercase tracking-widest">L3_Encryption</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
             <span className="text-[8px] font-black uppercase tracking-widest">Edge_Node_Sync</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
             <span className="text-[8px] font-black uppercase tracking-widest">Core_Verified</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
