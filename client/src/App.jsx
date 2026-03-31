import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useTheme } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Menu as MenuIcon, 
  History, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Sun, 
  Moon, 
  Zap,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/student/Menu';
import Cart from './pages/student/Cart';
import OrderTracking from './pages/student/OrderTracking';
import OrderHistory from './pages/student/OrderHistory';
import StaffDashboard from './pages/staff/StaffDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMenu from './pages/admin/ManageMenu';
import Support from './pages/Support';
import Policies from './pages/Policies';
import ProtectedRoute from './components/ProtectedRoute';
import CartSidebar from './components/CartSidebar';
import BackgroundSystem from './components/BackgroundSystem';
import SystemStatus from './components/SystemStatus';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { theme, cycleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-5 w-5" />;
      case 'dark': return <Moon className="h-5 w-5" />;
      case 'cyberpunk': return <Zap className="h-5 w-5" />;
      default: return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-500 bg-[var(--bg-primary)] text-[var(--text-primary)] relative`}>
      <ScrollToTop />
      <BackgroundSystem />
      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      
      {/* Professional Navbar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b border-[var(--border-color)] bg-[var(--glass-bg)] shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
             <motion.div 
               whileHover={{ scale: 1.1, rotate: 5 }}
               className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20"
             >
                <MenuIcon className="h-6 w-6 text-white" />
             </motion.div>
             <span className="text-2xl font-black tracking-tighter flex items-center gap-1">
                CANTEEN<span className="text-indigo-500 glow-text">APP</span>
             </span>
          </Link>
          
          <div className="hidden xl:flex items-center gap-4 text-[10px] font-black font-mono text-[var(--text-secondary)] tracking-widest px-6 border-l border-r border-[var(--border-color)] mx-4 animate-pulse">
            <span className="text-emerald-500">STATUS: ONLINE</span>
            <span className="opacity-30">|</span>
            <span className="text-indigo-500">READY TO SERVE</span>
          </div>
          
          <nav className="flex items-center gap-2 sm:gap-6">
            {/* Main Nav Links */}
            <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-[var(--border-color)] pr-6">
              {['menu', 'order-history'].map((path) => {
                const isAccess = (path === 'order-history' && user?.role === 'student') ||
                                (path === 'menu');
                
                if (!isAccess) return null;
                
                return (
                  <Link 
                    key={path}
                    to={`/${path === 'menu' ? 'menu' : path}`} 
                    className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:text-indigo-500 flex items-center gap-2 ${location.pathname === '/' + (path === 'menu' ? 'menu' : path) ? 'text-indigo-500' : 'text-[var(--text-secondary)]'}`}
                  >
                    <div className={`w-1 h-1 rounded-full ${location.pathname === '/' + (path === 'menu' ? 'menu' : path) ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-transparent'}`}></div>
                    {path === 'order-history' ? 'My Orders' : path.replace('-', ' ')}
                  </Link>
                );
              })}
              {user && (user.role === 'staff' || user.role === 'admin') && (
                  <Link to="/staff" className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:text-indigo-500 flex items-center gap-2 ${location.pathname === '/staff' ? 'text-indigo-500' : 'text-[var(--text-secondary)]'}`}>
                    <div className={`w-1 h-1 rounded-full ${location.pathname === '/staff' ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-transparent'}`}></div>
                    Staff Dashboard
                  </Link>
              )}
              {user?.role === 'admin' && (
                  <Link to="/admin" className={`text-[10px] uppercase tracking-[0.2em] font-black transition-all hover:text-indigo-500 flex items-center gap-2 ${location.pathname === '/admin' ? 'text-indigo-500' : 'text-[var(--text-secondary)]'}`}>
                    <div className={`w-1 h-1 rounded-full ${location.pathname === '/admin' ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-transparent'}`}></div>
                    Admin
                  </Link>
              )}
            </div>

            {/* Personal Controls */}
            <div className="flex items-center gap-3">
              <button 
                  onClick={cycleTheme}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-indigo-500 shadow-inner transition-all text-[var(--text-secondary)] hover:text-indigo-500"
                >
                  {getThemeIcon()}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-indigo-500 shadow-inner transition-all text-[var(--text-secondary)] hover:text-indigo-500"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white ring-4 ring-[var(--bg-primary)] shadow-lg shadow-indigo-500/30">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
                
                {/* Neural Link Profile */}
                <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-[var(--border-color)]">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 mb-0.5">
                       <ShieldCheck className="h-2.5 w-2.5 text-indigo-500" />
                       <p className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500">{user.role}</p>
                    </div>
                    <p className="text-xs font-black text-[var(--text-primary)] uppercase tracking-tight italic">{user.name.split(' ')[0]}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border-2 border-indigo-600/20 flex items-center justify-center overflow-hidden relative group">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
                     <UserIcon className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                     <div className="absolute inset-0 border-2 border-indigo-500/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                <button onClick={logout} className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                  <LogOut className="h-5 w-5" />
                </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-indigo-500 transition">
                    Login
                  </Link>
                  <Link to="/register" className="cyber-button px-6 py-2.5 text-[10px]">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 py-24 sm:py-32"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-8"
                  >
                    <Sparkles className="h-3 w-3" />
                    Skip the queue, order now
                  </motion.div>
                  
                  <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                    FAST FOOD. <br/>
                    <span className="text-indigo-600">ZERO WAITING.</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                    Experience the next generation of canteen management. Order ahead, track live, and pick up your meal when it's fresh and ready.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/menu" className="cyber-button px-12 py-5 text-lg flex items-center gap-3 group shadow-2xl shadow-indigo-500/30">
                      View Menu
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/register" className="px-12 py-5 rounded-2xl border-2 border-[var(--border-color)] font-bold hover:border-indigo-500/50 hover:bg-[var(--bg-secondary)] transition-all">
                      Create Account
                    </Link>
                  </div>

                  <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[var(--border-color)] pt-16">
                    {[
                      { label: 'Active Users', value: '2.5K+' },
                      { label: 'Orders Served', value: '15K+' },
                      { label: 'Vendors', value: '12' },
                      { label: 'Canteens', value: '4' }
                    ].map((stat, i) => (
                      <div key={i}>
                        <p className="text-3xl font-black text-indigo-500 mb-1">{stat.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/support" element={<Support />} />
            <Route path="/policies" element={<Policies />} />
            
            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/order-tracking/:id" element={<OrderTracking />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Route>

            {/* Staff Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['staff', 'admin']} />}>
              <Route path="/staff" element={<StaffDashboard />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/manage-menu" element={<ManageMenu />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="py-12 pb-20 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-[var(--text-secondary)]">
          <div className="flex items-center gap-2 grayscale flex-shrink-0 opacity-50">
             <div className="bg-indigo-600 p-1.5 rounded-lg">
                <MenuIcon className="h-4 w-4 text-white" />
             </div>
             <span className="text-sm font-black tracking-tighter">CANTEENAPP</span>
          </div>
           <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-[#FFFFFF]">
            <Link to="/policies" className="hover:text-indigo-500 transition">Terms</Link>
            <Link to="/policies" className="hover:text-indigo-500 transition">Privacy</Link>
            <Link to="/support" className="hover:text-indigo-500 transition">Support</Link>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Nexus Integrated. All rights reserved.</p>
        </div>
      </footer>
      <SystemStatus />
    </div>
  );
}

export default App;
