import { useState, useEffect } from 'react';
import menuService from '../../services/menuService';
import FoodCard from '../../components/FoodCard';
import { useCart } from '../../context/CartContext';
import { Utensils, Filter, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Drinks'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await menuService.getMenuItems();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
       >
         <Utensils className="h-12 w-12 text-indigo-500 mb-6" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] animate-pulse">Synchronizing Menu Nodes...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 px-4 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-10">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Fresh Food Menu</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">
            SELECT YOUR <span className="text-indigo-600 glow-text">MEAL</span>
          </h2>
          <p className="text-[var(--text-secondary)] font-medium max-w-md">Delicious meals prepared fresh for you.</p>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto"
        >
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-4 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Food..."
              className="cyber-input w-full pl-12 py-4 text-sm font-bold tracking-wide"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar px-1">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                  category === cat
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/20'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-indigo-500/50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-40 cyber-card glass-card"
          >
            <Filter className="h-16 w-16 text-[var(--border-color)] mx-auto mb-6" />
            <p className="text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] text-sm">No items found</p>
            <button 
              onClick={() => {setCategory('All'); setSearchTerm('');}}
              className="mt-6 text-indigo-500 font-black text-xs uppercase tracking-widest hover:underline"
            >
              Reset All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Menu;
