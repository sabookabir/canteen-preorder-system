import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartSidebar = ({ isOpen, setIsOpen }) => {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col bg-[var(--bg-secondary)] border-l border-[var(--border-color)] shadow-2xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between border-b border-[var(--border-color)] pb-4">
                <h2 className="text-xl font-black uppercase tracking-tighter glow-text">Your <span className="text-[var(--accent-primary)]">Buffer</span></h2>
                <button
                  type="button"
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center py-20 text-center">
                    <div className="p-6 rounded-full bg-[var(--bg-primary)] mb-6 border border-[var(--border-color)]">
                       <ShoppingBag className="h-12 w-12 text-[var(--text-secondary)] opacity-20" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-sm mb-4">No payload detected</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-[var(--accent-primary)] font-black uppercase tracking-tighter hover:scale-110 transition-transform"
                    >
                      Initialize Catalog Access
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((product) => (
                      <div key={product._id} className="flex gap-4 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] group hover:border-[var(--accent-primary)] transition-all">
                        <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[var(--border-color)]">
                          <img
                            src={product.image_url || 'https://via.placeholder.com/150'}
                            alt={product.name}
                            className="w-full h-full object-center object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-black text-sm uppercase truncate">{product.name}</h3>
                            <p className="font-bold text-[var(--accent-primary)] text-sm">₹{product.price * product.quantity}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                             <div className="flex items-center border border-[var(--border-color)] rounded-lg overflow-hidden h-8">
                                <button
                                  onClick={() => removeFromCart(product)}
                                  className="px-2 hover:bg-[var(--accent-secondary)] group/btn"
                                >
                                  <Minus className="h-3 w-3 group-hover/btn:text-white" />
                                </button>
                                <span className="px-3 text-xs font-black">{product.quantity}</span>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="px-2 hover:bg-[var(--accent-primary)] group/btn"
                                >
                                  <Plus className="h-3 w-3 group-hover/btn:text-white" />
                                </button>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-[var(--border-color)] py-8 px-6 bg-[var(--bg-primary)]/50 backdrop-blur-md">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs">Total Payload</span>
                  <span className="text-3xl font-black text-[var(--accent-primary)] glow-text">₹{cartTotal}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="cyber-button w-full shadow-2xl shadow-[var(--accent-primary)]/20 flex items-center justify-center gap-2 group"
                >
                  Proceed to Terminal
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="mt-4 text-center text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest opacity-50">
                   Secure Transaction Layer Active
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
