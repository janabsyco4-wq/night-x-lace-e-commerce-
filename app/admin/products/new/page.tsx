'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
} from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    images: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    stock: '',
    inStock: true,
    featured: false,
    variants: [] as { size: string; price: string; stock: string }[],
  });

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '32A', '32B', '34A', '34B', '34C', '36B', '36C', '38C', '40C'];
  const availableColors = ['Black', 'White', 'Red', 'Pink', 'Nude', 'Blue', 'Grey'];

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCategories();
  }, [router]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        stock: parseInt(formData.stock) || 0,
        variants: formData.variants.map(v => ({
          size: v.size,
          price: parseFloat(v.price),
          stock: parseInt(v.stock),
        })),
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (data.success) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        alert(data.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleImageAdd = () => {
    const url = prompt('Enter image URL:\n\nFormat: /images/products/your-image.jpg\nExample: /images/products/bra-1.jpg\n\nRecommended: 800x800px or 1:1 aspect ratio');
    if (url) {
      setFormData({ ...formData, images: [...formData.images, url] });
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const toggleSize = (size: string) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.includes(size)
        ? formData.sizes.filter(s => s !== size)
        : [...formData.sizes, size],
    });
  };

  const toggleColor = (color: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.includes(color)
        ? formData.colors.filter(c => c !== color)
        : [...formData.colors, color],
    });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { size: '', price: '', stock: '' }],
    });
  };

  const removeVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={24} style={{color: 'white'}} />
          </button>
          <div>
            <h1 className="text-3xl font-bold" style={{color: 'white'}}>Add New Product</h1>
            <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>Create a new product listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                  placeholder="e.g., Lace Bralette Set"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                  placeholder="Describe your product..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                      borderColor: 'rgba(212, 175, 55, 0.1)', 
                      color: 'white'
                    }}
                  >
                    <option value="" style={{backgroundColor: '#1a1a1d', color: 'white'}}>Select category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id} style={{backgroundColor: '#1a1a1d', color: 'white'}}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Pricing</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                  Regular Price (PKR) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                  Sale Price (PKR)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Product Images</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    style={{backgroundColor: 'rgba(239, 68, 68, 0.9)'}}
                  >
                    <X size={16} style={{color: 'white'}} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
                style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}
              >
                <Upload size={24} style={{color: 'rgba(255, 255, 255, 0.5)'}} />
                <span className="text-sm" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                  {uploading ? 'Uploading...' : '📤 Upload'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={handleImageAdd}
                className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all"
                style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}
              >
                <Upload size={24} style={{color: 'rgba(255, 255, 255, 0.5)'}} />
                <span className="text-sm" style={{color: 'rgba(255, 255, 255, 0.5)'}}>🔗 URL</span>
              </button>
            </div>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              Upload from computer or paste URL. First image will be the main product image.
              <br />
              <span className="text-xs">
                Format: <code className="bg-gray-900 px-2 py-1 rounded">/images/products/your-image.jpg</code> • 
                Recommended: <strong>800x800px</strong> or 1:1 aspect ratio
              </span>
            </p>
          </div>

          {/* Sizes */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Available Sizes</h2>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    formData.sizes.includes(size) ? 'border-2' : ''
                  }`}
                  style={{
                    backgroundColor: formData.sizes.includes(size) ? 'rgba(255, 0, 127, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: formData.sizes.includes(size) ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.1)',
                    color: 'white',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Available Colors</h2>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    formData.colors.includes(color) ? 'border-2' : ''
                  }`}
                  style={{
                    backgroundColor: formData.colors.includes(color) ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: formData.colors.includes(color) ? 'var(--color-accent)' : 'rgba(212, 175, 55, 0.1)',
                    color: 'white',
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Product Variants */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold" style={{color: 'white'}}>Product Variants (Optional)</h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-white/5"
                style={{color: 'var(--color-accent)'}}
              >
                <Plus size={18} />
                Add Variant
              </button>
            </div>
            <p className="text-sm mb-4" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              Set different prices for different sizes
            </p>
            
            {formData.variants.length === 0 ? (
              <p className="text-center py-8" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                No variants added. Click "Add Variant" to create size-specific pricing.
              </p>
            ) : (
              <div className="space-y-3">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                    <select
                      value={variant.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      className="px-3 py-2 rounded-lg border"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                    >
                      <option value="">Select size</option>
                      {availableSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, 'price', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                      className="w-24 px-3 py-2 rounded-lg border"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.1)', color: 'white'}}
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="p-2 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <X size={18} style={{color: '#ef4444'}} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <h2 className="text-xl font-semibold mb-4" style={{color: 'white'}}>Settings</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <p className="font-medium" style={{color: 'white'}}>In Stock</p>
                  <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Product is available for purchase</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <p className="font-medium" style={{color: 'white'}}>Featured Product</p>
                  <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Show on homepage</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:bg-white/5"
              style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
