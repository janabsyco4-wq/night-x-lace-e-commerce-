'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-white/10 transition-all"
        aria-label="Search"
      >
        <Search size={20} style={{color: 'white'}} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-screen max-w-md z-50">
          <div className="p-4 rounded-2xl border shadow-2xl" style={{backgroundColor: 'var(--color-bg)', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            {/* Search Input */}
            <div className="relative mb-4">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color: 'rgba(255, 255, 255, 0.5)'}} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X size={20} style={{color: 'rgba(255, 255, 255, 0.5)'}} />
                </button>
              )}
            </div>

            {/* Results */}
            {query.trim() && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  results.map(product => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate" style={{color: 'white'}}>{product.name}</h4>
                        <p className="text-sm truncate" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{product.category}</p>
                        <p className="font-semibold" style={{color: 'var(--color-primary)'}}>PKR {product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                    No products found for "{query}"
                  </div>
                )}
              </div>
            )}

            {/* View All Link */}
            {query && results.length > 0 && (
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block text-center mt-4 py-2 rounded-lg font-semibold hover:bg-white/5 transition-all"
                style={{color: 'var(--color-accent)'}}
              >
                View All Results
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
