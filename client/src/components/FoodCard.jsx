import { useCart } from '../context/CartContext';
import { Plus, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="cyber-card group bg-[var(--card-bg)] cyber-corners overflow-hidden"
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
            {item.category}
          </span>
        </div>

        <div className="absolute top-4 right-4 animate-float">
          <div className="w-8 h-8 rounded-full bg-yellow-500/90 backdrop-blur-sm flex items-center justify-center text-white shadow-lg">
            <Star className="h-4 w-4 fill-current" />
          </div>
        </div>

        {!item.available && (
          <div className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm flex items-center justify-center z-20">
             <span className="text-[var(--text-primary)] font-black uppercase tracking-[0.2em] text-sm border-2 border-[var(--text-primary)] px-6 py-2 rounded-xl -rotate-12 shadow-2xl bg-[var(--bg-secondary)]">
               Out of Stock
             </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[7px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-500/5 px-1.5 py-0.5 rounded-sm border border-indigo-500/10">ID: NET_{item._id.substring(item._id.length - 4).toUpperCase()}</span>
              <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">BATCH: {Math.floor(Math.random() * 900) + 100}</span>
            </div>
            <h3 className="text-xl font-black tracking-tighter uppercase truncate text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 overflow-hidden font-mono text-[var(--text-secondary)]">
               <div className="flex flex-col">
                  <span className="text-[7px] font-black uppercase tracking-widest mb-0.5 opacity-50">Energy</span>
                  <p className="text-[9px] font-black text-indigo-500 tracking-tighter">{Math.floor(Math.random() * 500) + 100}kCal</p>
               </div>
               <div className="w-px h-6 bg-[var(--border-color)] opacity-20"></div>
               <div className="flex flex-col">
                  <span className="text-[7px] font-black uppercase tracking-widest mb-0.5 opacity-50">Protein</span>
                  <p className="text-[9px] font-black text-indigo-500 tracking-tighter">{Math.floor(Math.random() * 30) + 5}g</p>
               </div>
            </div>
          </div>
          <p className="text-2xl font-black text-indigo-500 ml-4 glow-text italic">₹{item.price}</p>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          disabled={!item.available}
          className={`cyber-button w-full relative h-14 overflow-hidden ${
            item.available ? '' : 'opacity-50 cursor-not-allowed grayscale'
          } ${isAdded ? 'bg-green-600' : ''}`}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.span 
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check className="h-5 w-5" /> Added to Cart
              </motion.span>
            ) : (
              <motion.span 
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center gap-2"
              >
                {item.available ? (
                  <>
                    <Plus className="h-5 w-5" /> Add to Cart
                  </>
                ) : (
                  'Out of Stock'
                )}
              </motion.span>
            )}
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
