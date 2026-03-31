import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  IndianRupee, 
  Settings, 
  Activity, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  Database,
  Cpu,
  TrendingUp,
  Globe,
  Layers,
  ArrowUpRight,
  Terminal,
  Radio,
  Lock
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/admin/analytics`, config);
        setAnalytics(data);
        
        // Mock Terminal Logs
        const mockLogs = [
          `[${new Date().toISOString()}] System Boot: Success`,
          `[${new Date().toISOString()}] Database Connection: Active`,
          `[${new Date().toISOString()}] Firewall Status: Secure`,
          `[${new Date().toISOString()}] Incoming Packets: ${data.totalOrders} Orders received`,
          `[${new Date().toISOString()}] Revenue Stream: ₹${data.totalRevenue} Collected`,
        ];
        setLogs(mockLogs);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user.token, API_URL]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 text-indigo-500">
       <motion.div
         animate={{ 
           scale: [1, 1.2, 1],
           rotate: [0, 180, 360],
           opacity: [0.5, 1, 0.5]
         }}
         transition={{ duration: 3, repeat: Infinity }}
       >
         <Cpu className="h-20 w-20 mb-10" />
       </motion.div>
       <p className="text-sm font-black uppercase tracking-[0.4em] animate-pulse">Syncing Strategic Core Nodes...</p>
    </div>
  );

  const stats = [
    { name: 'Total Revenue', value: `₹${analytics?.totalRevenue || 0}`, icon: IndianRupee, trend: '+14.2%', color: 'indigo' },
    { name: 'Total Orders', value: analytics?.totalOrders || 0, icon: ShoppingBag, trend: '+8.5%', color: 'emerald' },
    { name: 'Active Users', value: analytics?.totalUsers || 0, icon: Users, trend: '+4.1%', color: 'blue' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10 border-b border-[var(--border-color)] pb-10 relative overflow-hidden px-4">
        <div className="absolute top-0 right-0 p-2 pointer-events-none opacity-20">
           <Terminal className="h-32 w-32 text-indigo-500/20 rotate-12" />
        </div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="relative z-10"
        >
           <div className="flex items-center gap-3 mb-4">
             <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Lock className="h-5 w-5 text-indigo-500" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">AUTHORIZATION_LEVEL: ROOT_ADMIN</p>
           </div>
           <h2 className="text-7xl font-black tracking-tighter uppercase leading-none">
             ADMIN <span className="text-indigo-600 glow-text italic">DASHBOARD</span>
           </h2>
           <p className="mt-4 text-[var(--text-secondary)] font-black text-[10px] uppercase tracking-[0.3em] opacity-60">Control Panel & Statistics</p>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex bg-[var(--bg-secondary)] border-2 border-indigo-500/20 px-10 py-5 rounded-[2.5rem] items-center gap-12 shadow-2xl relative cyber-corners"
        >
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981] animate-pulse"></div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500">Core_Status</span>
                 <span className="text-xs font-black uppercase tracking-tighter italic">Operational</span>
              </div>
           </div>
           <div className="h-10 w-px bg-indigo-500/10"></div>
           <div className="flex items-center gap-4">
              <Radio className="h-5 w-5 text-indigo-500 animate-pulse" />
              <div className="flex flex-col">
                 <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500">Network_Sync</span>
                 <span className="text-xs font-black uppercase tracking-tighter italic">Active_v4</span>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Analytics Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 px-2">
        <AnimatePresence>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.name} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group cyber-card p-10 bg-[var(--card-bg)] border-2 border-[var(--border-color)] hover:border-indigo-600 transition-all relative overflow-hidden cyber-corners"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                   <Icon className="h-32 w-32 text-indigo-500" />
                </div>
                
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
                
                <div className="relative z-10 font-mono">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-900/10 border border-indigo-500/20 flex items-center justify-center shadow-inner group-hover:shadow-indigo-500/10">
                       <Icon className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl italic flex items-center gap-2 border border-emerald-400/20">
                        <TrendingUp className="h-3 w-3" /> {stat.trend}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-4 opacity-70">{stat.name}</p>
                  <p className="text-6xl font-black glow-text tracking-tighter italic text-indigo-500">{stat.value}</p>
                  
                  <div className="mt-6 h-1 w-full bg-indigo-500/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${60 + index * 10}%` }}
                       className="h-full bg-indigo-500/40"
                     />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-2">
         {/* Live Terminal Log Feed */}
         <motion.div 
           className="lg:col-span-8 cyber-card p-1 items-stretch bg-black border-2 border-indigo-500/20 rounded-3xl relative overflow-hidden group shadow-2xl h-[450px]"
         >
            <div className="absolute top-0 left-0 w-full h-8 bg-indigo-500/5 border-b border-indigo-500/20 flex items-center px-4 justify-between">
               <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500 opacity-50">Recent Activities & Logs</span>
            </div>
            
            <div className="mt-8 p-6 font-mono text-[10px] text-emerald-500/70 space-y-2 overflow-y-auto h-[380px] custom-scrollbar selection:bg-emerald-500/20">
               {logs.map((log, i) => (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex gap-4"
                  >
                     <span className="text-indigo-500/50">[{i}]</span>
                     <span>{log}</span>
                  </motion.p>
               ))}
               <motion.div 
                 animate={{ opacity: [0, 1] }} 
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="w-2 h-4 bg-emerald-500/50 inline-block ml-10"
               ></motion.div>
            </div>
            
            {/* Background Grid for Terminal */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none"></div>
         </motion.div>

         {/* Strategic Action Panel */}
         <div className="lg:col-span-4 space-y-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="cyber-card p-10 bg-gradient-to-br from-indigo-900/10 to-transparent border-2 border-indigo-600/30 relative overflow-hidden group shadow-xl cyber-corners"
            >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                      <Zap className="h-6 w-6" />
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Manage<br /><span className="text-indigo-600 italic">Menu</span></h3>
                </div>
                
                <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest leading-relaxed mb-8 opacity-60">
                  Update food items, prices, and availability for the canteen menu.
                </p>
                
                <Link 
                  to="/admin/manage-menu"
                  className="cyber-button w-full py-4 text-xs group/btn shadow-xl shadow-indigo-600/10"
                >
                  <span className="flex items-center justify-center gap-4">
                    Open Menu Manager
                    <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </span>
                </Link>
            </motion.div>

            <motion.div 
              className="cyber-card p-10 bg-[var(--card-bg)] border-2 border-[var(--border-color)] relative cyber-corners"
            >
               <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
                  <Activity className="h-4 w-4 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Resource_Allocation</span>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: 'Neural_Lattice', val: 85, color: 'indigo' },
                    { label: 'Socket_Pulse', val: 94, color: 'emerald' },
                    { label: 'Buffer_Load', val: 42, color: 'yellow' }
                  ].map((sys) => (
                    <div key={sys.label} className="space-y-2">
                       <div className="flex justify-between items-center px-1 text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                          <span>{sys.label}</span>
                          <span className="text-indigo-500 italic">{sys.val}%</span>
                       </div>
                       <div className="h-1.5 bg-indigo-500/5 rounded-full overflow-hidden border border-indigo-500/10">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${sys.val}%` }}
                            className={`h-full bg-${sys.color}-500`}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
         </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
