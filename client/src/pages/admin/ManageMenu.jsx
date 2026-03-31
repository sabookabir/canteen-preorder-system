import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Pencil, 
  Check, 
  X,
  Package,
  Layers,
  IndianRupee,
  Image as ImageIcon,
  ChevronRight,
  Database,
  Search,
  Zap,
  ShieldCheck,
  AlertCircle,
  Save,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageMenu = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Breakfast',
    price: '',
    image_url: '',
    available: true,
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/menu`);
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Breakfast',
      price: '',
      image_url: '',
      available: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image_url: item.image_url || '',
      available: item.available,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`${API_URL}/menu/${id}`, config);
      fetchItems();
    } catch (err) {
      alert('Handshake failed: Deletion rejected.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      if (editingItem) {
        await axios.put(`${API_URL}/menu/${editingItem._id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/menu`, formData, config);
      }
      
      setShowModal(false);
      resetForm();
      fetchItems();
    } catch (err) {
      alert('Save operation failed: Core rejected payload.');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 text-indigo-500">
       <motion.div
         animate={{ 
           scale: [1, 1.1, 1],
           opacity: [0.3, 0.7, 0.3]
         }}
         transition={{ duration: 2, repeat: Infinity }}
       >
         <Database className="h-20 w-20 mb-10" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.4em] animate-pulse">Syncing Inventory Nodes...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10 border-b border-[var(--border-color)] pb-10">
        <motion.div
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
        >
           <div className="flex items-center gap-3 mb-4">
             <Link to="/admin" className="p-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-indigo-500/50 transition-all text-[var(--text-secondary)] hover:text-indigo-500 group">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
             </Link>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Strategic Requisition Unit</p>
           </div>
           <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">
             INVENTORY <span className="text-indigo-600 glow-text">CONTROL</span>
           </h2>
        </motion.div>
        
        <motion.button 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { resetForm(); setShowModal(true); }}
          className="cyber-button px-10 py-5 text-base flex items-center justify-center gap-4 shadow-2xl shadow-indigo-600/20 group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
             <Plus className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          </div>
          Initialize New Entry
        </motion.button>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="cyber-card bg-[var(--card-bg)] border-2 border-[var(--border-color)] shadow-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border-color)] text-left">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/50 backdrop-blur-md">
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Item Signature</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Classification</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Unit Cost</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Status</th>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]/30">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.tr 
                    layout
                    key={item._id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-indigo-600/5 transition-all group border-l-4 border-l-transparent hover:border-l-indigo-600"
                  >
                    <td className="px-10 py-6 whitespace-nowrap">
                       <div className="flex items-center gap-6">
                          <div className="h-16 w-16 rounded-2xl border-2 border-[var(--border-color)] overflow-hidden bg-[var(--bg-primary)] group-hover:border-indigo-600/40 transition-all shadow-lg">
                             <img src={item.image_url || 'https://via.placeholder.com/100'} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <span className="font-black text-sm uppercase tracking-wider group-hover:text-indigo-500 transition-colors">{item.name}</span>
                       </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap">
                       <span className="text-[9px] font-black border-2 border-indigo-500/10 px-4 py-1.5 rounded-full uppercase tracking-[0.2em] bg-indigo-500/5 text-indigo-500 shadow-sm">
                          {item.category}
                       </span>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-base font-black italic tracking-tight text-indigo-600">₹{item.price}</td>
                    <td className="px-10 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className={`w-2.5 h-2.5 rounded-full ${item.available ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-red-500 shadow-[0_0_12px_#ef4444]'}`}></div>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${item.available ? 'text-emerald-500' : 'text-red-500'}`}>
                           {item.available ? 'Active' : 'Offline'}
                         </span>
                      </div>
                    </td>
                    <td className="px-10 py-6 whitespace-nowrap text-right">
                       <div className="flex gap-4 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(item)} 
                            className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 hover:bg-indigo-600 hover:text-white transition-all shadow-md"
                          >
                            <Pencil className="h-4 w-4" />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(item._id)} 
                            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-600 hover:text-white transition-all shadow-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Futuristic Entry Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-xl bg-black/80" 
              onClick={() => setShowModal(false)}
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="cyber-card max-w-xl w-full p-12 bg-[var(--card-bg)] border-2 border-indigo-600/30 relative z-10 shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-[var(--text-secondary)] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-10">
                 <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-600">
                    <Zap className="h-6 w-6" />
                 </div>
                 <h3 className="text-4xl font-black uppercase tracking-tighter glow-text">
                   {editingItem ? 'PATCH' : 'INIT'} <span className="text-indigo-600">ITEM</span>
                 </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] px-1">Designation</label>
                    <div className="relative group">
                       <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                       <input 
                        name="name" value={formData.name} onChange={handleInputChange} required
                        placeholder="E.g. QUANTUM BURRITO"
                        className="cyber-input w-full pl-12 pr-4 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all" 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] px-1">Classification</label>
                      <div className="relative">
                         <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] pointer-events-none" />
                         <select 
                          name="category" value={formData.category} onChange={handleInputChange}
                          className="cyber-input w-full pl-12 pr-10 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all appearance-none cursor-pointer"
                         >
                           <option>Breakfast</option>
                           <option>Lunch</option>
                           <option>Snacks</option>
                           <option>Drinks</option>
                         </select>
                         <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] rotate-90" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] px-1">Unit Cost (₹)</label>
                      <div className="relative group">
                         <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                         <input 
                          name="price" type="number" value={formData.price} onChange={handleInputChange} required
                          className="cyber-input w-full pl-12 pr-4 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all" 
                         />
                      </div>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] px-1">Visual Stream URL</label>
                    <div className="relative group">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        name="image_url" value={formData.image_url} onChange={handleInputChange}
                        placeholder="HTTPS://MEDIA.STORAGE.NODE/IMG..."
                        className="cyber-input w-full pl-12 pr-4 py-4 text-sm font-bold bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] focus:border-indigo-600/50 rounded-2xl transition-all" 
                      />
                    </div>
                 </div>

                 <motion.div 
                   whileHover={{ backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
                   className="flex items-center justify-between p-6 rounded-2xl bg-[var(--bg-primary)] border-2 border-[var(--border-color)] cursor-pointer hover:border-indigo-600/40 transition-all"
                 >
                    <div className="flex items-center gap-4">
                       <ShieldCheck className={`h-6 w-6 ${formData.available ? 'text-emerald-500' : 'text-red-500'}`} />
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Operational Status</span>
                          <span className={`text-xs font-black uppercase tracking-widest ${formData.available ? 'text-emerald-500' : 'text-red-500'}`}>
                             {formData.available ? 'LINKED_ACTIVE' : 'OFFLINE_REJECTED'}
                          </span>
                       </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                       <input 
                        type="checkbox" name="available" checked={formData.available} onChange={handleInputChange}
                        className="sr-only peer" 
                       />
                       <div className="w-14 h-7 bg-[var(--bg-secondary)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-[var(--text-secondary)] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-white peer-checked:bg-indigo-600"></div>
                    </label>
                 </motion.div>

                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   type="submit"
                   className="cyber-button w-full py-5 text-lg group overflow-hidden relative shadow-2xl shadow-indigo-600/20"
                 >
                    <span className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-widest">
                       <Save className="h-6 w-6" />
                       {editingItem ? 'COMMIT_OVERRIDE' : 'INITIALIZE_CORE'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                 </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageMenu;
