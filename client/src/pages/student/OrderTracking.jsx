import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useSocket from '../../hooks/useSocket';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ChefHat, 
  UserCheck, 
  ArrowLeft,
  Navigation,
  Hash,
  Info,
  PackageCheck
} from 'lucide-react';
import axios from 'axios';

const OrderTracking = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const socket = useSocket();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders/${id}`, config);
        setOrder(data);
      } catch (err) {
        setError('Order not found or unauthorized access.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user.token, API_URL]);

  useEffect(() => {
    if (socket && order) {
      socket.emit('join_order_room', id);

      socket.on('order_status_update', (updatedOrder) => {
        if (updatedOrder._id === id) {
          setOrder(updatedOrder);
        }
      });

      return () => {
        socket.off('order_status_update');
      };
    }
  }, [socket, order, id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32">
       <motion.div
         animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
         transition={{ duration: 2, repeat: Infinity }}
       >
         <Activity className="h-16 w-16 text-indigo-500 mb-8" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] animate-pulse">Establishing Secure Uplink...</p>
    </div>
  );
  
  if (error) return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto py-32 text-center px-4"
    >
       <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <Activity className="h-10 w-10 text-red-500" />
       </div>
       <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter text-red-500">Node Error</h2>
       <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs mb-10 leading-relaxed">{error}</p>
       <Link to="/menu" className="cyber-button px-10">
          <ArrowLeft className="h-4 w-4 mr-2" /> Return to Menu
       </Link>
    </motion.div>
  );

  const steps = [
    { name: 'Pending', icon: Clock, description: 'Waiting for confirmation' },
    { name: 'Preparing', icon: ChefHat, description: 'Preparing your food' },
    { name: 'Ready', icon: CheckCircle2, description: 'Ready for pickup' },
    { name: 'Picked Up', icon: UserCheck, description: 'Order completed' }
  ];
  const currentStepIndex = steps.findIndex(s => s.name === order.status);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-12"
    >
      <motion.div 
        layout
        className="cyber-card p-12 bg-[var(--card-bg)] border-2 border-indigo-600/20 shadow-2xl shadow-indigo-600/10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[var(--border-color)] pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Real-time Update</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">TRACK <span className="text-indigo-600 glow-text">ORDER</span></h2>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]">
               <Hash className="h-4 w-4 text-indigo-500" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Order ID: {order._id}</span>
            </div>
          </div>
          <div className="group bg-indigo-600 p-8 rounded-3xl text-center min-w-[220px] shadow-xl shadow-indigo-600/20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
             <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-2 relative z-10">Pickup Time</p>
             <p className="text-3xl font-black text-white relative z-10">{order.pickup_time}</p>
          </div>
        </div>

        {/* High-Tech Progress Visualization */}
        <div className="relative mb-24 px-8">
          <div className="flex justify-between items-start">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.name} className="flex flex-col items-center relative z-10 w-32">
                  <motion.div 
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)'
                    }}
                    className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500
                      ${isActive ? 'text-white shadow-2xl shadow-indigo-500/40' : 'text-[var(--text-secondary)]'}
                      ${isCurrent ? 'ring-4 ring-indigo-500/20' : ''}
                    `}
                  >
                    <StepIcon className={`h-8 w-8 ${isCurrent ? 'animate-pulse' : ''}`} />
                  </motion.div>
                  <div className="mt-6 text-center">
                    <p className={`
                      text-[10px] font-black uppercase tracking-[0.2em] mb-1
                      ${isActive ? 'text-indigo-500' : 'text-[var(--text-secondary)]'}
                    `}>
                      {step.name}
                    </p>
                    <p className="text-[8px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress Line Background */}
          <div className="absolute top-8 left-20 right-20 h-[3px] bg-[var(--border-color)] -z-0 rounded-full"></div>
          {/* Active Progress Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `calc(${(currentStepIndex / (steps.length - 1)) * 100}% - 8px)` }}
            className="absolute top-8 left-20 h-[3px] bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all duration-1000 ease-out -z-0 rounded-full"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
               <div className="p-2 rounded-xl bg-indigo-500/10">
                  <PackageCheck className="h-6 w-6 text-indigo-500" />
               </div>
               Order Manifest
            </h3>
            <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <ul className="space-y-6">
                <AnimatePresence>
                  {order.order_items.map((item) => (
                    <motion.li 
                      layout
                      key={item.item_id} 
                      className="flex justify-between items-center group"
                    >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center font-black text-indigo-500 italic">
                           {item.quantity}x
                         </div>
                         <span className="font-black uppercase text-sm tracking-wider group-hover:text-indigo-500 transition-colors">{item.name}</span>
                      </div>
                      <span className="font-black text-sm text-[var(--text-secondary)]">₹{item.price * item.quantity}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="border-t border-[var(--border-color)] pt-8 mt-8 flex justify-between items-end">
                <span className="text-[var(--text-secondary)] font-black uppercase tracking-[0.2em] text-[10px]">Total Amount Paid</span>
                <span className="text-4xl font-black text-indigo-600 glow-text">₹{order.total}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4">
               <div className="p-2 rounded-xl bg-indigo-500/10">
                  <Info className="h-6 w-6 text-indigo-500" />
               </div>
               Operational Directives
            </h3>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-500/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-10 font-medium italic relative z-10">
                 "Critical: Please present your digital requisition identity at Terminal B upon arrival. Failure to collect within your 15-minute window may result in payload reassignment."
               </p>
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-600 border border-indigo-400/20 text-white shadow-xl shadow-indigo-600/20">
                  <Activity className="h-5 w-5 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Datastream Protocol Active</span>
               </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 flex flex-col sm:flex-row gap-6 pt-10 border-t border-[var(--border-color)]">
           <Link to="/menu" className="flex-1 cyber-button group py-5 text-base">
              <span className="flex items-center justify-center gap-3">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Back to Menu
              </span>
           </Link>
           <Link to="/order-history" className="flex-1 px-8 py-5 rounded-2xl border-2 border-[var(--border-color)] font-black uppercase tracking-widest text-xs hover:border-indigo-500 hover:bg-[var(--bg-secondary)] transition-all text-center flex items-center justify-center gap-3">
              View Order History
              <Navigation className="h-4 w-4 opacity-50" />
           </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderTracking;
