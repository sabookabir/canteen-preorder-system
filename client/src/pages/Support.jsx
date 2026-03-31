import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Bug, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  LifeBuoy
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Support = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: 'Feedback',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, error: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ success: false, error: '' });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`${API_URL}/support`, formData, config);
      setStatus({ success: true, error: '' });
      setFormData({ type: 'Feedback', subject: '', message: '' });
    } catch (err) {
      setStatus({ 
        success: false, 
        error: err.response?.data?.message || 'Failed to submit request' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <LifeBuoy className="h-3 w-3" />
          Support & Feedback
        </div>
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
          HELP <span className="text-indigo-600 glow-text">CENTER</span>
        </h2>
        <p className="text-[var(--text-secondary)] font-medium max-w-lg mx-auto">
          Found a bug? Have a suggestion? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Bug, title: 'Bug Report', desc: 'Technical issues or UI glitches.' },
          { icon: MessageSquare, title: 'Feedback', desc: 'Suggestions to improve the app.' },
          { icon: HelpCircle, title: 'Inquiry', desc: 'Questions about your account.' },
        ].map((item, i) => (
          <motion.div 
            key={item.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="cyber-card p-6 bg-[var(--card-bg)] border border-[var(--border-color)] text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <item.icon className="h-6 w-6" />
            </div>
            <h4 className="font-black uppercase tracking-tight mb-2">{item.title}</h4>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="cyber-card p-10 bg-[var(--card-bg)] border-2 border-[var(--border-color)] shadow-2xl shadow-indigo-500/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-600/30 to-transparent"></div>
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <AnimatePresence>
            {status.success && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black rounded-xl flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5" />
                Thank you! Your request has been submitted successfully.
              </motion.div>
            )}
            {status.error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5" />
                {status.error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Request Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="cyber-input w-full p-4 appearance-none"
              >
                <option value="Feedback">Feedback</option>
                <option value="Bug Report">Bug Report</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Subject</label>
              <input 
                type="text" 
                placeholder="Brief summary of your request..."
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="cyber-input w-full p-4"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Detailed Message</label>
            <textarea 
              rows="6" 
              placeholder="Tell us more about your feedback or the bug you encountered..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="cyber-input w-full p-6 resize-none"
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="cyber-button w-full py-5 text-lg group shadow-xl shadow-indigo-600/10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="flex items-center justify-center gap-3 relative z-10">
              {loading ? 'Submitting...' : (
                <>
                  Submit Request
                  <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </span>
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Support;
