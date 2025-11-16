'use client';

export const dynamic = 'force-dynamic';

import { useState, useMemo, useEffect, Suspense } from 'react';
import ProductFilters from '@/components/shop/ProductFilters';
import Pagination from '@/components/ui/Pagination';
import { Filter, X, AlertCircle, RefreshCw, Star, Eye } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'featured',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Read URL parameters on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('priceRange');
    const sortParam = searchParams.get('sortBy');
    
    if (categoryParam || priceParam || sortParam) {
      setFilters({
        category: categoryParam || 'all',
        priceRange: priceParam || 'all',
        sortBy: sortParam || 'featured',
      });
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        throw new Error(`Failed to load products (${res.status})`);
      }
      
      const data = await res.json();
      
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        setError(null);
      } else {
        setProducts([]);
        setError('No products available');
      }
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category?.slug === filters.category || p.category?._id === filters.category);
    }

    // Filter by price
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      } else {
        filtered = filtered.filter(p => p.price >= min);
      }
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="flex">
      {/* Fixed Sidebar Filters - Desktop - Attached to Header */}
      <aside className="hidden lg:block w-64 flex-shrink-0 fixed left-0 top-0 bottom-0 border-r overflow-y-auto z-40 pt-[150px]" style={{backgroundColor: 'rgba(26, 26, 29, 1)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6" style={{color: 'white'}}>Filters</h2>
          <ProductFilters onFilterChange={setFilters} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Hero Section */}
        <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
          </div>
          
          <div className="container-custom relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border mb-3 sm:mb-4 md:mb-6 text-xs md:text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
              <span className="font-medium" style={{color: 'var(--color-accent)'}}>✨ Premium Collection</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Shop All Products
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto px-4" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Discover our complete collection of premium lingerie and intimate wear
            </p>
          </div>
        </section>

        <div className="pb-8 md:pb-12">
          <div className="container-custom">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4 md:mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm md:text-base"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
              >
                <Filter size={18} className="md:w-5 md:h-5" />
                Filters
              </button>
            </div>

            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <div className="absolute right-0 top-0 bottom-0 w-80 p-6 overflow-y-auto" style={{backgroundColor: 'var(--color-secondary)'}}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold" style={{color: 'white'}}>Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X size={24} style={{color: 'white'}} />
                    </button>
                  </div>
                  <ProductFilters onFilterChange={setFilters} />
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Showing {paginatedProducts.length} of {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {/* Products Display Section */}
            {loading ? (
              <div className="flex flex-wrap -mx-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1/2 md:w-1/2 lg:w-1/4 px-3 mb-6">
                    <div className="flex flex-col gap-4 bg-[#1f1f23] border border-[#333] rounded-2xl p-4 animate-pulse">
                      <div className="w-full h-40 rounded-xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                      <div className="flex flex-col justify-between flex-1">
                        <div className="h-5 rounded mb-2" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                        <div className="h-4 rounded w-3/4 mb-3" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                        <div className="flex justify-between items-center">
                          <div className="h-6 rounded w-20" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                          <div className="h-8 rounded w-24" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)'}}>
                  <AlertCircle size={32} style={{color: 'var(--color-primary)'}} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: 'white'}}>
                  Unable to Load Products
                </h3>
                <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  {error}
                </p>
                <button
                  onClick={fetchProducts}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                  style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                >
                  <RefreshCw size={20} />
                  Try Again
                </button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center -mx-1 sm:-mx-2 md:-mx-3">
                  {paginatedProducts.map(product => (
                    <div key={product._id} className="w-[45%] sm:w-1/2 md:w-1/2 lg:w-1/4 px-1 sm:px-2 md:px-3 mb-3 sm:mb-4 md:mb-6">
                      <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-4 bg-[#1f1f23] border border-[#333] rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-2 md:p-4 hover:bg-[#29292d] transition">
                        {/* Image */}
                        <div className="w-full h-36 sm:h-48 md:h-56 lg:h-64 rounded-md md:rounded-xl overflow-hidden bg-gray-700">
                          <img
                            src={product.images?.[0] || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1">
                          <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-white line-clamp-1">
                            {product.name}
                          </h3>
                          
                          {/* Rating Stars */}
                          <div className="flex items-center gap-0.5 mt-0.5 sm:mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={10} 
                                className={`sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                              />
                            ))}
                            <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 ml-0.5 sm:ml-1">
                              ({product.reviewCount || 0})
                            </span>
                          </div>

                          <p className="text-gray-400 text-xs md:text-sm mt-1 line-clamp-2 hidden sm:block">
                            {product.description || 'Soft, breathable fabric with premium comfort.'}
                          </p>

                          {/* Price */}
                          <div className="mt-1 sm:mt-2 md:mt-3">
                            <span className="text-pink-500 font-bold text-sm sm:text-base md:text-xl block">
                              Rs {product.price?.toLocaleString()}
                            </span>
                          </div>

                          {/* Button */}
                          <button
                            onClick={() => {
                              router.push(`/products/${product.slug || product._id}`);
                            }}
                            className="w-full mt-1 sm:mt-2 md:mt-3 px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition text-[9px] sm:text-[10px] md:text-xs min-h-[32px] sm:min-h-[36px] md:min-h-[44px] flex items-center justify-center gap-1 md:gap-2"
                          >
                            <Eye size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Quick View</span>
                            <span className="sm:hidden">View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl mb-4" style={{color: 'white'}}>
                  {products.length === 0 ? 'No products available yet' : 'No products found'}
                </p>
                <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  {products.length === 0 ? 'Products will appear here once added to the store' : 'Try adjusting your filters'}
                </p>
                {products.length === 0 && (
                  <button
                    onClick={fetchProducts}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                    style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-secondary)'}}
                  >
                    <RefreshCw size={20} />
                    Refresh
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>}>
      <ShopPageContent />
    </Suspense>
  );
}