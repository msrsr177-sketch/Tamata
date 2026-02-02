
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-zinc-900">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <i className="fa-solid fa-basket-shopping text-6xl mb-4 text-zinc-200"></i>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Time to add some fresh digital goods!</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-zinc-900 leading-tight">{item.name}</h4>
                    <p className="text-sm text-zinc-500 mb-2">${item.price}</p>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs font-bold text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-sm font-bold text-zinc-900">
                    x{item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-500 font-medium">Total</span>
                <span className="text-3xl font-black text-zinc-900">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-red-500 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-red-100 hover:bg-red-600 transition-all active:scale-95">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
