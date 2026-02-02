
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white border border-zinc-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2">
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-50 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {product.badge && (
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-zinc-900 text-[10px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-full shadow-sm border border-white/50">
            {product.badge}
          </div>
        )}

        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-zinc-900 shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white active:scale-90"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-4">
            <span className="inline-block px-2 py-0.5 bg-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-widest rounded-md mb-2">
              {product.category}
            </span>
            <h3 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="text-2xl font-black text-zinc-900 tracking-tighter">
            ${product.price}
          </div>
        </div>
        
        <p className="text-sm text-zinc-500 line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="pt-6 border-t border-zinc-50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-star text-red-500 text-[10px]"></i>
              <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-download text-zinc-300 text-[10px]"></i>
              <span className="text-xs font-bold text-zinc-400">{product.sales.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
            Verified Asset
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
