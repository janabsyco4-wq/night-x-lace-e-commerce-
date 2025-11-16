'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch('/api/products?featured=true');
      const data = await res.json();
      if (data.success) {
        setFeaturedProducts(data.products.slice(0, 4));
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 overflow-hidden">
      <div className="container-custom overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Handpicked favorites from our latest collection
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-2xl mb-4" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                <div className="h-4 rounded mb-2" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                <div className="h-6 rounded w-1/2" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
              </div>
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>No featured products yet</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
