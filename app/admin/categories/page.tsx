'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCounts, setProductCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
  });

  useEffect(() => {
    fetchCategories();
    fetchProductCounts();

    // Auto-refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProductCounts();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductCounts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      console.log('Products data:', data);
      if (data.success) {
        const counts: { [key: string]: number } = {};
        data.products.forEach((product: any) => {
          const categoryId = product.category._id || product.category;
          console.log('Product:', product.name, 'Category ID:', categoryId);
          counts[categoryId] = (counts[categoryId] || 0) + 1;
        });
        console.log('Product counts:', counts);
        setProductCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching product counts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory._id}`
        : '/api/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleCloseModal();
        fetchCategories();
        fetchProductCounts();
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
        fetchProductCounts();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: '' });
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Categories Management</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">Organize your products into categories</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => fetchProductCounts()}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base"
              title="Refresh product counts"
            >
              🔄 <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm md:text-base"
            >
              <Plus size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add Category</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
          <p className="text-gray-400 text-xs md:text-sm">Total Categories</p>
          <p className="text-xl md:text-2xl font-bold text-white">{categories.length}</p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">No categories found</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
            >
              Add Your First Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {categories.map((category) => (
              <div key={category._id} className="bg-gray-800 rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    {category.icon && (
                      <span className="text-2xl md:text-3xl flex-shrink-0">{category.icon}</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base md:text-xl font-semibold text-white truncate">{category.name}</h3>
                      <p className="text-xs md:text-sm text-gray-400 truncate">{category.slug}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xl md:text-2xl font-bold text-pink-400">{productCounts[category._id] || 0}</p>
                    <p className="text-xs text-gray-400">Products</p>
                  </div>
                </div>

                {category.description && (
                  <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{category.description}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 px-2 md:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs md:text-sm transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit size={14} className="md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-2 md:px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs md:text-sm transition-colors"
                  >
                    <Trash2 size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
                  placeholder="e.g., Bras, Panties, Lingerie Sets"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
                  placeholder="Brief description of this category"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
                  placeholder="e.g., 👙 🩱 💝"
                />
              </div>

              <div className="flex gap-3 md:gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-3 md:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 md:px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm md:text-base"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
