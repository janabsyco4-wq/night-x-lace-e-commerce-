'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Tag, Calendar, Percent, DollarSign, Users } from 'lucide-react';

interface Coupon {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    minOrderValue: '',
    maxDiscount: '',
    usageLimit: '',
    validFrom: '',
    validUntil: '',
    active: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/admin/coupons');
      const data = await response.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCoupon
        ? `/api/admin/coupons/${editingCoupon._id}`
        : '/api/admin/coupons';
      
      const method = editingCoupon ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          value: parseFloat(formData.value),
          minOrderValue: formData.minOrderValue ? parseFloat(formData.minOrderValue) : undefined,
          maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
          usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : undefined,
        }),
      });

      if (response.ok) {
        fetchCoupons();
        handleCloseModal();
        alert(editingCoupon ? 'Coupon updated!' : 'Coupon created!');
      }
    } catch (error) {
      console.error('Error saving coupon:', error);
      alert('Failed to save coupon');
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrderValue: coupon.minOrderValue?.toString() || '',
      maxDiscount: coupon.maxDiscount?.toString() || '',
      usageLimit: coupon.usageLimit?.toString() || '',
      validFrom: coupon.validFrom.split('T')[0],
      validUntil: coupon.validUntil.split('T')[0],
      active: coupon.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCoupons();
        alert('Coupon deleted!');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const toggleActive = async (couponId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      });

      if (response.ok) {
        fetchCoupons();
      }
    } catch (error) {
      console.error('Error toggling coupon:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCoupon(null);
    setFormData({
      code: '',
      type: 'percentage',
      value: '',
      minOrderValue: '',
      maxDiscount: '',
      usageLimit: '',
      validFrom: '',
      validUntil: '',
      active: true,
    });
  };

  const isExpired = (date: string) => new Date(date) < new Date();

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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Coupons & Discounts</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">Create and manage promotional codes</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            <Plus size={18} className="md:w-5 md:h-5" />
            <span className="hidden sm:inline">Create Coupon</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Coupons</p>
            <p className="text-xl md:text-2xl font-bold text-white">{coupons.length}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Active</p>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {coupons.filter(c => c.active && !isExpired(c.validUntil)).length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Expired</p>
            <p className="text-xl md:text-2xl font-bold text-red-400">
              {coupons.filter(c => isExpired(c.validUntil)).length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Uses</p>
            <p className="text-xl md:text-2xl font-bold text-blue-400">
              {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
            </p>
          </div>
        </div>

        {/* Coupons Grid */}
        {coupons.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Tag size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">No coupons yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
            >
              Create Your First Coupon
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {coupons.map((coupon) => {
              const expired = isExpired(coupon.validUntil);
              const usagePercent = coupon.usageLimit 
                ? (coupon.usedCount / coupon.usageLimit) * 100 
                : 0;

              return (
                <div key={coupon._id} className="bg-gray-800 rounded-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3 md:mb-4">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Tag className="text-pink-400 flex-shrink-0" size={20} />
                      <span className="text-lg md:text-2xl font-bold text-white font-mono truncate">{coupon.code}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-2">
                      {coupon.active && !expired ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded whitespace-nowrap">Active</span>
                      ) : expired ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded whitespace-nowrap">Expired</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded whitespace-nowrap">Inactive</span>
                      )}
                    </div>
                  </div>

                  {/* Discount Value */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-pink-400">
                      {coupon.type === 'percentage' ? (
                        <>
                          <Percent size={24} className="md:w-7 md:h-7" />
                          {coupon.value}% OFF
                        </>
                      ) : (
                        <>
                          <DollarSign size={24} className="md:w-7 md:h-7" />
                          Rs. {coupon.value} OFF
                        </>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs md:text-sm text-gray-400 mb-3 md:mb-4">
                    {coupon.minOrderValue && (
                      <p>Min Order: Rs. {coupon.minOrderValue}</p>
                    )}
                    {coupon.maxDiscount && coupon.type === 'percentage' && (
                      <p>Max Discount: Rs. {coupon.maxDiscount}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span className="truncate">{new Date(coupon.validFrom).toLocaleDateString()} - {new Date(coupon.validUntil).toLocaleDateString()}</span>
                    </div>
                    {coupon.usageLimit && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Users size={14} />
                          <span>{coupon.usedCount} / {coupon.usageLimit} uses</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleActive(coupon._id, coupon.active)}
                      className="flex-1 px-2 md:px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs md:text-sm transition-colors truncate"
                    >
                      {coupon.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="px-2 md:px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs md:text-sm transition-colors"
                    >
                      <Edit size={14} className="md:w-4 md:h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="px-2 md:px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs md:text-sm transition-colors"
                    >
                      <Trash2 size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base font-mono focus:outline-none focus:border-pink-500"
                    placeholder="SUMMER2024"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Discount Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (Rs.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
                    placeholder={formData.type === 'percentage' ? '10' : '500'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min Order Value (Rs.)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                    placeholder="1000"
                  />
                </div>

                {formData.type === 'percentage' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Discount (Rs.)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maxDiscount}
                      onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                      placeholder="500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
                <span className="text-gray-300 text-sm md:text-base">Active (customers can use this coupon)</span>
              </label>

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
                  {editingCoupon ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
