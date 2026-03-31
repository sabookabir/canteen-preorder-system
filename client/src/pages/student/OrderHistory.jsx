import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import OrderStatusBadge from '../../components/OrderStatusBadge';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, 
  Search, 
  ExternalLink, 
  Calendar, 
  ChevronRight,
  ClipboardList,
  Clock,
  Package,
  Receipt,
  ArrowUpRight
} from 'lucide-react';
import axios from 'axios';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/orders/mine`, config);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.token, API_URL]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 text-indigo-500">
       <motion.div
         animate={{ rotate: -360 }}
         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
       >
         <History className="h-16 w-16 mb-8 opacity-40" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.3em] animate-pulse">Retrieving Requisition Archives...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[var(--border-color)] pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Subject: {user.name}</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
            ORDER <span className="text-indigo-600 glow-text">HISTORY</span>
          </h2>
        </div>
        <div className="bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] px-8 py-4 rounded-3xl shadow-xl">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Total Orders</p>
           <p className="text-2xl font-black text-indigo-500">{orders.length}</p>
        </div>
      </div>

      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-24 text-center border-2 border-dashed border-[var(--border-color)] rounded-[3rem]"
          >
            <div className="w-24 h-24 bg-indigo-500/5 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-indigo-500/10">
               <ClipboardList className="h-12 w-12 text-indigo-500 opacity-20" />
            </div>
            <p className="text-lg font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-12">No orders found yet</p>
            <Link to="/menu" className="cyber-button px-12 py-5 text-base shadow-2xl shadow-indigo-600/20">
              Place Your First Order <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {orders.map((order, index) => (
              <motion.div 
                layout
                key={order._id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-8 rounded-[2.5rem] bg-[var(--card-bg)] border-2 border-[var(--border-color)] hover:border-indigo-600/40 transition-all relative overflow-hidden flex flex-col lg:flex-row items-center gap-10 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none group-hover:from-indigo-600/10 transition-all"></div>
                
                <div className="w-full lg:w-1/4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-600/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-[10px] font-black text-indigo-500 tracking-widest">
                      ORDER_{order._id.substring(order._id.length - 6).toUpperCase()}
                    </div>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                <div className="flex-grow w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-4 w-4 text-indigo-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Cargo Specification</p>
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-tight line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {order.order_items.map(i => i.name).join(' // ')}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8 border-t border-[var(--border-color)] pt-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Date</span>
                      <span className="text-xs font-black flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-indigo-500" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Pickup</span>
                      <span className="text-xs font-black flex items-center gap-2">
                        <Clock className="h-3 w-3 text-indigo-500" />
                        {order.pickup_time}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Items</span>
                      <span className="text-xs font-black">{order.order_items.length} Items</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-1">Total</span>
                      <span className="text-base font-black text-indigo-600 glow-text">₹{order.total}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto">
                  <Link 
                    to={`/order-tracking/${order._id}`}
                    className="cyber-button w-full lg:px-10 py-5 text-sm flex items-center justify-center gap-3 group/btn shadow-xl shadow-indigo-600/10"
                  >
                    Track Order <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderHistory;
