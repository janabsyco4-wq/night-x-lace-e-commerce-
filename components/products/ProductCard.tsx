'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Star, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const productId = (product as any)._id || product.id;
  const inWishlist = isInWishlist(productId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({ ...product, id: productId } as any);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} className="block group rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {(product as any).images && (product as any).images[0] ? (
            <img 
              src={(product as any).images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 transition-transform duration-500 group-hover:scale-110">
              <span className="text-6xl">📷</span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1 md:gap-2">
            {product.featured && (
              <span className="text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-sm shadow-lg" style={{backgroundColor: 'var(--color-primary)'}}>
                Featured
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-900 text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-2 md:top-3 right-2 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg" 
            style={{backgroundColor: 'rgba(26, 26, 29, 0.9)'}}
          >
            <Heart 
              size={16} 
              className="md:w-[18px] md:h-[18px]"
              style={{color: 'var(--color-primary)'}} 
              fill={inWishlist ? 'var(--color-primary)' : 'none'}
            />
          </button>

        </div>

      <div className="p-2 sm:p-3 md:p-5">
          <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 md:mb-2 transition-colors line-clamp-2" style={{color: 'white'}}>
            {product.name}
          </h3>
        
        <div className="flex items-center gap-1 md:gap-2 mb-1 sm:mb-2 md:mb-3">
          <div className="flex items-center gap-0.5 md:gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                className={`sm:w-3 sm:h-3 md:w-[14px] md:h-[14px] ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] md:text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>({product.reviewCount})</span>
        </div>

        <div>
          <span className="text-base sm:text-lg md:text-2xl font-bold" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-family-serif)'}}>
            {product.price.toLocaleString()}
          </span>
          <span className="text-[9px] sm:text-[10px] md:text-sm ml-0.5 md:ml-1" style={{color: 'rgba(255, 255, 255, 0.5)'}}>PKR</span>
        </div>
      </div>
    </Link>
  );
}
