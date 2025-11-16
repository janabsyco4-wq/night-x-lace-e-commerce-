'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Collapse states
  const [showSort, setShowSort] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const handleFilterChange = (type: string, value: string) => {
    const filters = {
      category: type === 'category' ? value : selectedCategory,
      priceRange: type === 'price' ? value : priceRange,
      sortBy: type === 'sort' ? value : sortBy,
    };

    if (type === 'category') setSelectedCategory(value);
    if (type === 'price') setPriceRange(value);
    if (type === 'sort') setSortBy(value);

    onFilterChange(filters);
  };

  return (
    <div className="space-y-4">
      {/* Sort By */}
      <div className="border-b pb-4" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <button
          onClick={() => setShowSort(!showSort)}
          className="w-full flex items-center justify-between font-semibold mb-3"
          style={{color: 'white'}}
        >
          <span>Sort By</span>
          {showSort ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showSort && (
          <select 
            value={sortBy}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: 'rgba(26, 26, 29, 0.8)',
              borderColor: 'rgba(212, 175, 55, 0.3)',
              color: 'white'
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        )}
      </div>

      {/* Category Filter */}
      <div className="border-b pb-4" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <button
          onClick={() => setShowCategory(!showCategory)}
          className="w-full flex items-center justify-between font-semibold mb-3"
          style={{color: 'white'}}
        >
          <span>Category</span>
          {showCategory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showCategory && (
          <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>All Products</span>
          </label>
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="accent-pink-500"
              />
              <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>{cat.name}</span>
            </label>
          ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b pb-4" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <button
          onClick={() => setShowPrice(!showPrice)}
          className="w-full flex items-center justify-between font-semibold mb-3"
          style={{color: 'white'}}
        >
          <span>Price Range</span>
          {showPrice ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {showPrice && (
          <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              value="all"
              checked={priceRange === 'all'}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>All Prices</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              value="0-1000"
              checked={priceRange === '0-1000'}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>Under PKR 1,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              value="1000-2500"
              checked={priceRange === '1000-2500'}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>PKR 1,000 - 2,500</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              value="2500-5000"
              checked={priceRange === '2500-5000'}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>PKR 2,500 - 5,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              value="5000-plus"
              checked={priceRange === '5000-plus'}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="accent-pink-500"
            />
            <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>Over PKR 5,000</span>
          </label>
          </div>
        )}
      </div>
    </div>
  );
}
