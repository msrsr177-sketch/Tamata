
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-zinc-50 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="sm:text-center lg:text-left lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-8 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">New: AI Scout V2 Now Live</span>
            </div>
            
            <h1 className="text-5xl tracking-tight font-black text-zinc-900 sm:text-6xl md:text-7xl leading-[1.1]">
              <span className="block">Pure digital</span>
              <span className="block bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">excellence.</span>
            </h1>
            
            <p className="mt-6 text-lg text-zinc-500 sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed">
              Tamata is a curated ecosystem for the world's most talented digital artisans. 
              Find premium source code, UI kits, and creative assets that set you apart.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-zinc-900 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 hover:bg-zinc-800 active:scale-95 shadow-2xl shadow-zinc-200">
                Explore Marketplace
                <i className="fa-solid fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 font-bold text-zinc-700 transition-all duration-200 bg-white border-2 border-zinc-100 rounded-2xl hover:bg-zinc-50 hover:border-zinc-200 active:scale-95">
                Become a Seller
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400">+2k</div>
              </div>
              <p className="text-sm text-zinc-400 font-medium italic">
                Trusted by <span className="text-zinc-900 font-bold">12,000+</span> creators
              </p>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-zinc-900 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-100">
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=600" 
                    alt="Premium Assets" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-8 bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-zinc-900 font-black text-xl">SaaS Dashboard Kit</h4>
                        <p className="text-zinc-400 text-sm">React + Tailwind + Framer</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-500 font-black text-2xl">$59</p>
                        <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Single License</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
