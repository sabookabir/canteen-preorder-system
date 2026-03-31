import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Loader2,
  ChevronRight,
  ArrowLeft,
  Zap,
  Fingerprint
} from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, user } = useAuth();
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
      await register({ name, email, password, role });
    } catch (err) {
      setError(err.response?.data?.message || 'Identity initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -z-10 animate-pulse transition-all duration-1000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="cyber-card p-12 bg-[var(--card-bg)] border-2 border-indigo-600/20 shadow-2xl relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
          
          <Link to="/login" className="absolute top-8 left-8 text-[var(--text-secondary)] hover:text-indigo-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>

          <div className="text-center mb-10 mt-4">
            <motion.div 
              initial={{ scale: 0.8, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="mx-auto h-20 w-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-600/30 mb-8 relative group"
            >
               <div className="absolute inset-0 bg-white/20 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
               <UserPlus className="h-10 w-10 relative z-10" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mb-4">
              NEW <span className="text-indigo-600 glow-text">IDENTITY</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">
               <Fingerprint className="h-3 w-3 text-indigo-500" />
               SECURE_REGISTRATION_UPLINK
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Legal Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text" required
                    className="cyber-input w-full pl-12 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Network Identity (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="email" required
                    className="cyber-input w-full pl-12 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all"
                    placeholder="name@domain.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Access Token</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="password" required
                    className="cyber-input w-full pl-12 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] px-1">Network Role</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
                  <select
                    className="cyber-input w-full pl-12 pr-10 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all appearance-none cursor-pointer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="student">Student Module</option>
                    <option value="staff">Canteen Staff Node</option>
                    <option value="admin">Strategic Admin</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] rotate-90" />
                </div>
              </div>
            </div>

            <div className="pt-6">
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
                      Initialize Identity
                      <UserPlus className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-10">
           <Link to="/login" className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest transition-colors">
             Already have an authorized ID? Log in here
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
