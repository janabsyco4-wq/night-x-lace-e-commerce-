'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from '@/components/ui/Pagination';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [categories, setCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, filterCategory, filterStock, products]);

  useEffect(() => {
    paginateProducts();
  }, [filteredProducts, currentPage]);

  const fetchProducts = async () => {
    try {
      // Fetch all products without pagination for stats and filtering
      const response = await fetch('/api/admin/products?limit=1000');
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => {
        const categoryId = typeof product.category === 'object' ? product.category._id : product.category;
        return categoryId === filterCategory;
      });
    }

    // Stock filter
    if (filterStock === 'instock') {
      filtered = filtered.filter(product => product.inStock);
    } else if (filterStock === 'outofstock') {
      filtered = filtered.filter(product => !product.inStock);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleFeatured = async (productId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const toggleStock = async (productId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: !currentStatus }),
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Products Management</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">Manage your product catalog</p>
        </div>

        {/* Stats & Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {/* Total Products */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-2xl font-bold text-white">{products.length}</p>
          </div>
          
          {/* In Stock */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">In Stock</p>
            <p className="text-2xl font-bold text-green-400">
              {products.filter(p => p.inStock).length}
            </p>
          </div>
          
          {/* Out of Stock */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Out of Stock</p>
            <p className="text-2xl font-bold text-red-400">
              {products.filter(p => !p.inStock).length}
            </p>
          </div>
          
          {/* Featured */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Featured</p>
            <p className="text-2xl font-bold text-yellow-400">
              {products.filter(p => p.featured).length}
            </p>
          </div>
          
          {/* Add New Product Card */}
          <button
            onClick={() => router.push('/admin/products/new')}
            className="bg-gradient-to-br from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 p-4 rounded-lg transition-all hover:shadow-lg hover:scale-105 flex flex-col items-center justify-center gap-2 group"
          >
            <Plus size={24} className="text-white group-hover:scale-110 transition-transform" />
            <p className="text-white font-semibold text-sm">Add Product</p>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
            >
              <option value="all">All Stock Status</option>
              <option value="instock">In Stock</option>
              <option value="outofstock">Out of Stock</option>
            </select>
          </div>
          
          {/* Results count */}
          <div className="text-sm text-gray-400">
            Showing {((currentPage - 1) * productsPerPage) + 1}-{Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            {filteredProducts.length !== products.length && (
              <span className="ml-2 text-gray-500">(filtered from {products.length} total)</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">No products found</p>
            <button
              onClick={() => router.push('/admin/products/new')}
              className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {paginatedProducts.map((product) => (
                <div key={product._id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-900">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        No Image
                      </div>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {product.featured && (
                        <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                          FEATURED
                        </span>
                      )}
                      {product.salePrice && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                          SALE
                        </span>
                      )}
                    </div>

                    {/* Stock Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        product.inStock 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {typeof product.category === 'object' ? product.category.name : 'Uncategorized'}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {product.salePrice ? (
                        <>
                          <span className="text-xl font-bold text-pink-400">
                            Rs. {product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-white">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Sizes & Colors */}
                    <div className="flex gap-4 mb-3 text-xs text-gray-400">
                      <span>Sizes: {product.sizes.length}</span>
                      <span>Colors: {product.colors.length}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(`/product/${product._id}`, '_blank')}
                        className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={16} />
                        View
                      </button>
                      <button
                        onClick={() => router.push(`/admin/products/edit/${product._id}`)}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => toggleStock(product._id, product.inStock)}
                        className="flex-1 px-3 py-1 bg-gray-900 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                      >
                        {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </button>
                      <button
                        onClick={() => toggleFeatured(product._id, product.featured)}
                        className="flex-1 px-3 py-1 bg-gray-900 hover:bg-gray-700 text-white rounded text-xs transition-colors"
                      >
                        {product.featured ? 'Unfeature' : 'Feature'}
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
        )}
      </div>
    </AdminLayout>
  );
}
