'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <Heart size={16} style={{color: 'var(--color-accent)'}} />
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            My Wishlist
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Your favorite items saved for later
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)'}}>
                <Heart size={48} style={{color: 'var(--color-primary)'}} />
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>Your Wishlist is Empty</h2>
              <p className="mb-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Start adding items you love to your wishlist
              </p>
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                <ShoppingBag size={20} />
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
