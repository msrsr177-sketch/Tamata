
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIScout from './components/AIScout';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle One-Time Android Permissions on Startup
  useEffect(() => {
    const initPermissions = async () => {
      if (Capacitor.getPlatform() !== 'web') {
        try {
          const permStatus = await PushNotifications.checkPermissions();
          
          if (permStatus.receive === 'prompt') {
            const result = await PushNotifications.requestPermissions();
            if (result.receive === 'granted') {
              await PushNotifications.register();
            }
          } else if (permStatus.receive === 'granted') {
            await PushNotifications.register();
          }
        } catch (error) {
          console.error('Error handling notification permissions:', error);
        }
      }
    };

    initPermissions();
  }, []);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-red-200 selection:text-red-900">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {}} 
      />

      <main>
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2 no-scrollbar">
              {['all', 'software', 'design', 'ebooks', 'templates'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
                    : 'bg-white border border-zinc-200 text-zinc-500 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-80">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-zinc-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
                <i className="fa-solid fa-magnifying-glass text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">No products found</h3>
              <p className="text-zinc-500">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-6 text-red-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 py-24 mt-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to bloom your <br/>
              <span className="text-red-500">digital potential?</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of creators worldwide buying and selling high-quality digital goods on Tamata. 
              The future of digital commerce is fresh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-red-500 text-white rounded-2xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl shadow-red-900/20">
                Get Started Now
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-zinc-800 text-zinc-300 rounded-2xl font-bold text-lg hover:bg-zinc-700 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-zinc-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <span className="text-xl font-black tracking-tight text-zinc-900">طماطة</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Fresh digital products for professional creators. Building the next generation of creative commerce.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">Store</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-red-500">Software</a></li>
                <li><a href="#" className="hover:text-red-500">Design Assets</a></li>
                <li><a href="#" className="hover:text-red-500">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-red-500">Help Center</a></li>
                <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-red-500">About Us</a></li>
                <li><a href="#" className="hover:text-red-500">Sell Products</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
      />
      
      <AIScout products={MOCK_PRODUCTS} />
    </div>
  );
};

export default App;
