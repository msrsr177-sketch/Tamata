
import React from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <i className="fa-solid fa-seedling text-xl"></i>
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-900">
              طماطة <span className="text-red-500 text-sm font-normal ml-1">Tamata</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-medium text-zinc-600">
            <a href="#" className="hover:text-red-500 transition-colors">Software</a>
            <a href="#" className="hover:text-red-500 transition-colors">Templates</a>
            <a href="#" className="hover:text-red-500 transition-colors">Design Assets</a>
            <a href="#" className="hover:text-red-500 transition-colors">Courses</a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenSearch}
              className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-zinc-500 hover:text-red-500 transition-colors"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:block bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
