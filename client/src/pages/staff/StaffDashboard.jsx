import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useSocket from '../../hooks/useSocket';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Settings, 
  Bell, 
  Zap, 
  Clock, 
  User, 
  CheckCircle2, 
  Loader2, 
  PackageCheck,
  Filter,
  ArrowRight,
  ShieldAlert,
  Terminal,
  Activity
} from 'lucide-react';
import axios from 'axios';

const StaffDashboard = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Active'); // Active, Completed

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders/all`, config);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.token, API_URL]);

  useEffect(() => {
    if (socket) {
      socket.emit('join_staff_room');

      socket.on('new_order', (newOrder) => {
        setOrders((prev) => [newOrder, ...prev]);
        if (Notification.permission === 'granted') {
          new Notification('NEW REQUISITION DETECTED', { body: `Order payload: ₹${newOrder.total}` });
        }
      });

      socket.on('order_updated', (updatedOrder) => {
        setOrders((prev) => 
          prev.map((order) => order._id === updatedOrder._id ? updatedOrder : order)
        );
      });

      return () => {
        socket.off('new_order');
        socket.off('order_updated');
      };
    }
  }, [socket]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.put(`${API_URL}/orders/${orderId}/status`, { status: newStatus }, config);
    } catch (err) {
      console.error('Handshake failed: Status update rejected by core.');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'Active') return order.status !== 'Picked Up';
    return order.status === 'Picked Up';
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 text-indigo-500">
       <motion.div
         animate={{ rotate: 360 }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
       >
         <Monitor className="h-16 w-16 mb-8" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.3em] animate-pulse">Initializing Strategic Command Center...</p>
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
           <div className="flex items-center gap-3 mb-3">
             <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Live Datastream: Sub-Sector-7_Active</p>
           </div>
           <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.9]">
             MISSION <span className="text-indigo-600 glow-text">CONTROL</span>
           </h2>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-6"
        >
           <div className="flex bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] p-1.5 rounded-2xl shadow-inner">
              {['Active', 'Completed'].map(t => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === t 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                      : 'text-[var(--text-secondary)] hover:text-indigo-500'
                  }`}
                >
                  {t}
                </motion.button>
              ))}
           </div>
           <button className="w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-[var(--border-color)] hover:border-indigo-500 transition-all text-[var(--text-secondary)] hover:text-indigo-500">
              <Settings className="h-6 w-6" />
           </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length === 0 ? (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-40 text-center border-2 border-dashed border-[var(--border-color)] rounded-3xl"
            >
               <Bell className="h-20 w-20 mx-auto mb-8 opacity-10" />
               <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]">Standby Protocol: Queue Zero</p>
            </motion.div>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div 
                layout
                key={order._id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group cyber-card p-8 bg-[var(--card-bg)] border-2 border-[var(--border-color)] hover:border-indigo-600/40 transition-all relative overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:shadow-indigo-600/5"
              >
                {/* Status Indicator */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-600/5 to-transparent pointer-events-none group-hover:from-indigo-600/10 transition-all"></div>
                
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                       <Terminal className="h-3 w-3 text-indigo-500" />
                       <span className="font-black text-[9px] text-[var(--text-secondary)] uppercase tracking-widest">LOG_ID: {order._id.substring(order._id.length - 6).toUpperCase()}</span>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2 opacity-50">ETA Window</p>
                     <p className="text-xl font-black text-indigo-500 flex items-center justify-end gap-2 glow-text">
                        <Clock className="h-4 w-4" /> {order.pickup_time}
                     </p>
                  </div>
                </div>

                <div className="space-y-6 flex-grow">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                      <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20">
                         <User className="h-6 w-6 text-indigo-500" />
                      </div>
                      <div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Subject Identified</p>
                         <p className="text-sm font-black uppercase leading-tight">{order.student_id?.name || 'Unknown Subject'}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Manifest Payload</p>
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded italic">Real-Time Sync</span>
                      </div>
                      <div className="max-h-40 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                        {order.order_items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-3 border-b border-[var(--border-color)]/30 group-hover:border-indigo-500/20 last:border-0 border-dashed">
                             <span className="text-xs font-bold uppercase tracking-tight">{item.name}</span>
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-500 px-2.5 py-1 rounded-lg italic">x{item.quantity}</span>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-[var(--border-color)] group-hover:border-indigo-500/20 mt-8">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Value Extraction</span>
                      <span className="text-2xl font-black italic text-indigo-500 glow-text">₹{order.total}</span>
                   </div>
                   
                   <div className="flex gap-3">
                      {order.status === 'Pending' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(order._id, 'Preparing')}
                          className="cyber-button px-6 py-3 text-[10px]"
                        >
                          PROCEED
                        </motion.button>
                      )}
                      {order.status === 'Preparing' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(order._id, 'Ready')}
                          className="cyber-button px-6 py-3 text-[10px] bg-green-600 flex items-center gap-2"
                        >
                          FINALIZE <ArrowRight className="h-3 w-3" />
                        </motion.button>
                      )}
                      {order.status === 'Ready' && (
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateStatus(order._id, 'Picked Up')}
                          className="cyber-button px-6 py-3 text-[10px] bg-indigo-900 border-indigo-400/30 flex items-center gap-2"
                        >
                          ARCHIVE <PackageCheck className="h-4 w-4" />
                        </motion.button>
                      )}
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default StaffDashboard;
