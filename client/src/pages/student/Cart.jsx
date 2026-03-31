import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  CreditCard, 
  Clock, 
  ChevronRight, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  ShieldAlert
} from 'lucide-react';

const Cart = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, addToCart } = useCart();
  const { user } = useAuth();
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Review, 1: Authorizing, 2: Complete
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  ];

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!pickupTime) {
      setError('Please select a pickup time.');
      return;
    }

    setLoading(true);
    setCheckoutStep(1);
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          item_id: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: cartTotal,
        pickup_time: pickupTime,
        payment_method: paymentMethod
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Mock delay for "Terminal Processing" effect
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { data } = await axios.post(`${API_URL}/orders`, orderData, config);
      
      setCheckoutStep(2);
      setTimeout(() => {
        clearCart();
        navigate(`/order-tracking/${data._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to server');
      setCheckoutStep(0);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && checkoutStep !== 2) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-32 px-4 text-center"
      >
        <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8 border border-indigo-500/20 shadow-xl shadow-indigo-500/5 cyber-corners">
            <ShoppingBag className="h-10 w-10 text-indigo-500" />
        </div>
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your Cart is Empty</h2>
        <p className="text-[var(--text-secondary)] mb-10 max-w-sm font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Add some delicious food to get started!</p>
        <Link to="/menu" className="cyber-button px-10 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 border-b border-[var(--border-color)] pb-8 relative">
        <div className="cyber-corners p-2">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-indigo-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Secure Checkout</span>
            </div>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">YOUR <span className="text-indigo-600 glow-text italic">CART</span></h2>
        </div>
        <button 
          onClick={clearCart} 
          className="flex items-center gap-2 p-3 text-red-500 hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest border border-red-500/20 rounded-xl"
        >
            <Trash2 className="h-4 w-4" /> Clear All Items
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-[1px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)]">Item Summary</span>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div 
                  layout
                  key={item._id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex flex-col sm:flex-row justify-between items-center p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-indigo-500 transition-all shadow-sm cyber-corners relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-1">
                     <span className="text-[6px] font-black text-indigo-500/20 uppercase tracking-widest">OBJ_SECURE_{index}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] flex-shrink-0 relative">
                       <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-black uppercase text-lg tracking-tighter group-hover:text-indigo-500 transition-colors">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[7px] font-black text-indigo-500 uppercase tracking-widest px-1.5 py-0.5 border border-indigo-500/20 bg-indigo-500/5">₹{item.price} RATE</span>
                         <span className="text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-widest">UID_{item._id.substring(20)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full sm:w-auto gap-12">
                    <div className="flex items-center bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden shadow-inner">
                       <button onClick={() => removeFromCart(item)} className="w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors border-r border-[var(--border-color)]">
                         <Minus className="h-3 w-3" />
                       </button>
                       <span className="w-12 text-center font-black italic text-lg">{item.quantity}</span>
                       <button onClick={() => addToCart(item)} className="w-10 h-10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors border-l border-[var(--border-color)]">
                         <Plus className="h-3 w-3" />
                       </button>
                    </div>
                    <p className="font-black text-2xl min-w-[100px] text-right text-indigo-500 glow-text italic">₹{item.price * item.quantity}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Summary Panel */}
        <div className="lg:col-span-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-card p-10 bg-[var(--card-bg)] border-2 border-indigo-600 shadow-2xl shadow-indigo-600/10 sticky top-28 cyber-corners"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-[var(--border-color)] pb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                   <Zap className="h-5 w-5 text-indigo-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest italic">Order Summary</h3>
            </div>

            <form onSubmit={handleCheckout} className="space-y-8">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black rounded-xl flex items-center gap-3 animate-pulse uppercase tracking-widest"
                  >
                    <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                    SYSTEM_ERROR: {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-3 block">
                    PICKUP TIME
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4.5 h-4 w-4 text-indigo-500 group-focus-within:rotate-90 transition-transform duration-500" />
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="cyber-input w-full pl-12 py-4 appearance-none font-black text-xs cursor-pointer tracking-widest uppercase italic"
                      required
                    >
                      <option value="">Select Pickup Time</option>
                      {timeSlots.map(slot => (
                         <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4 block">
                    PAYMENT METHOD
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['UPI', 'Card', 'Cash', 'Credit'].map(method => (
                      <label key={method} className={`
                        relative flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300
                        ${paymentMethod === method 
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                          : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:border-indigo-500/30'}
                      `}>
                        <input
                          type="radio"
                          className="sr-only"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border-color)] pt-8 mt-8 space-y-4 font-mono">
                 <div className="flex justify-between items-center text-[var(--text-secondary)] text-[10px]">
                    <span className="font-bold uppercase tracking-widest opacity-50">Subtotal</span>
                    <span className="font-black">₹{cartTotal}</span>
                 </div>
                 <div className="flex justify-between items-center text-emerald-500 text-[10px]">
                    <span className="font-bold uppercase tracking-widest">Discount</span>
                    <span className="font-black">-₹0.00</span>
                 </div>
                 <div className="flex justify-between items-end pt-4 border-t border-indigo-500/10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-2">Total Amount</span>
                    <span className="text-5xl font-black text-indigo-500 glow-text italic">₹{cartTotal}</span>
                 </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`cyber-button w-full py-6 text-xl group shadow-2xl overflow-hidden relative ${loading ? 'bg-indigo-800' : 'bg-indigo-600'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="flex items-center gap-3">
                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Activity className="h-6 w-6" />
                         </motion.div>
                         <span className="font-black uppercase tracking-[0.2em]">Processing Order...</span>
                      </div>
                      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 2 }}
                           className="h-full bg-white shimmer"
                         />
                      </div>
                    </motion.div>
                  ) : checkoutStep === 2 ? (
                    <motion.span 
                      key="success"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center justify-center gap-3 font-black uppercase tracking-[0.3em] text-emerald-400"
                    >
                      Order Confirmed!
                    </motion.span>
                  ) : (
                    <span className="flex items-center justify-center gap-3 relative z-10 font-black uppercase tracking-[0.3em] italic">
                      Place Order
                      <ChevronRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  )}
                </AnimatePresence>
              </motion.button>
              
              <div className="flex justify-center gap-4 text-[7px] font-black text-[var(--text-secondary)] uppercase tracking-[0.5em] opacity-30 mt-4">
                 <span>RSA_ENCRYPTION_ACTIVE</span>
                 <span>|</span>
                 <span>LOGS_SECURED</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
