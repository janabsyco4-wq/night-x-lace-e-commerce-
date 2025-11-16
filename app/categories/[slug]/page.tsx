'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<any>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [params.slug]);

  const fetchCategoryAndProducts = async () => {
    try {
      // Fetch all categories to find the current one
      const catRes = await fetch('/api/categories');
      const catData = await catRes.json();
      if (catData.success) {
        const foundCategory = catData.categories.find((c: any) => c.slug === params.slug);
        setCategory(foundCategory);

        if (foundCategory) {
          // Fetch products for this category
          const prodRes = await fetch(`/api/products?category=${foundCategory._id}`);
          const prodData = await prodRes.json();
          if (prodData.success) {
            setCategoryProducts(prodData.products);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch category:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: 'var(--color-primary)'}}></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{color: 'white'}}>Category Not Found</h1>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative">
          {/* Back Button */}
          <Link href="/categories" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            <ArrowLeft size={20} />
            <span>Back to Categories</span>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
              <span className="text-2xl">{category?.icon || '📦'}</span>
              <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>Category</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              {category.name}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              {category.description}
            </p>
            <p className="text-sm" style={{color: 'var(--color-accent)'}}>
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'} Available
            </p>
          </div>
        </div>
      </section>

      <div className="min-h-screen pb-12">
        <div className="container-custom">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl mb-4" style={{color: 'white'}}>No products found in this category</p>
              <Link href="/shop" className="btn-primary">Browse All Products</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
