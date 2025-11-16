'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

// Fallback emoji if admin hasn't set one
const DEFAULT_EMOJI = '💎';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mx-auto mb-4" style={{borderColor: 'var(--color-primary)'}}></div>
          <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full animate-pulse" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full animate-pulse delay-1000" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full shadow-lg border mb-6 backdrop-blur-sm animate-fade-in" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)', borderColor: 'var(--color-accent)'}}>
            <Sparkles size={16} style={{color: 'var(--color-accent)'}} />
            <span className="text-sm font-semibold" style={{color: 'var(--color-accent)'}}>Explore Our Collections</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in-up" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Shop by Category
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Discover our curated collection of premium intimate wear designed for comfort and elegance
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 animate-fade-in-up delay-300">
            <div>
              <p className="text-3xl md:text-4xl font-bold" style={{color: 'var(--color-accent)'}}>
                {categories.length}+
              </p>
              <p className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Categories</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div>
              <p className="text-3xl md:text-4xl font-bold" style={{color: 'var(--color-accent)'}}>500+</p>
              <p className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="pb-16 md:pb-24">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category._id}
                href={`/categories/${category.slug}`}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative h-full rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)'}}></div>
                  
                  {/* Content */}
                  <div className="relative p-8 flex flex-col items-center text-center h-full">
                    {/* Icon/Emoji */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)'}}>
                      <span className="text-5xl md:text-6xl">
                        {category.icon || DEFAULT_EMOJI}
                      </span>
                    </div>
                    
                    {/* Category Name */}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 transition-colors group-hover:text-pink-400" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                      {category.name}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base mb-6 line-clamp-2 flex-grow" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      {category.description || 'Explore our collection'}
                    </p>
                    
                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-base font-bold group-hover:gap-4 transition-all" style={{color: 'var(--color-primary)'}}>
                      <span>Shop Now</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity" style={{background: 'radial-gradient(circle at top right, var(--color-primary) 0%, transparent 70%)'}}></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold mb-2" style={{color: 'white'}}>No Categories Yet</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>Check back soon for our amazing collections!</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="py-16 md:py-20 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg mb-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Browse our complete collection or contact us for assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop" 
              className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:scale-105"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              View All Products
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full font-bold text-lg border-2 transition-all hover:shadow-lg hover:scale-105"
              style={{borderColor: 'var(--color-accent)', color: 'var(--color-accent)'}}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
