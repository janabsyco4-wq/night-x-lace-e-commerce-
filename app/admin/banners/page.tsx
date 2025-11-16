'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, FileText } from 'lucide-react';

export default function AdminBannersPage() {
  const [saving, setSaving] = useState(false);
  
  const [bannerSettings, setBannerSettings] = useState({
    topBannerText: '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
    mainHeading: 'Unlock Your Luxury',
    mainDiscount: '50% OFF',
    mainCouponCode: 'ALI12345',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      alert('Banner settings saved! (Note: These are display-only. Edit the component files to change actual text.)');
      setSaving(false);
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Banner Management</h1>
          <p className="text-gray-400 mt-1">Edit the text displayed on your homepage banners</p>
        </div>

        {/* Banner Settings */}
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          {/* Top Banner */}
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={20} />
              Top Banner (Above Navigation)
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Banner Text
              </label>
              <input
                type="text"
                value={bannerSettings.topBannerText}
                onChange={(e) => setBannerSettings({ ...bannerSettings, topBannerText: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                placeholder="🎉 Summer Sale: 50% OFF - Use Code: ALI12345"
              />
              <p className="text-xs text-gray-500 mt-2">This appears at the very top of your website</p>
            </div>
          </div>

          {/* Main Banner */}
          <div className="border-b border-gray-700 pb-6">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={20} />
              Main Banner (Homepage)
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={bannerSettings.mainHeading}
                  onChange={(e) => setBannerSettings({ ...bannerSettings, mainHeading: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Unlock Your Luxury"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discount Text
                </label>
                <input
                  type="text"
                  value={bannerSettings.mainDiscount}
                  onChange={(e) => setBannerSettings({ ...bannerSettings, mainDiscount: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="50% OFF"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={bannerSettings.mainCouponCode}
                  onChange={(e) => setBannerSettings({ ...bannerSettings, mainCouponCode: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="ALI12345"
                />
              </div>
            </div>
          </div>

          {/* Small Banners Info */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <FileText size={20} />
              Small Coupon Banners
            </h3>
            <p className="text-sm text-gray-400 mb-4">These are hardcoded in SmallBanners.tsx component:</p>
            <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm text-gray-400">
              <p>• Banner 1: SAVE20 - 20% OFF - Get 20% off on all items</p>
              <p>• Banner 2: FIRST15 - 15% OFF - First order special discount</p>
              <p>• Banner 3: LUXURY30 - 30% OFF - Premium collection discount</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              💡 <strong>Note:</strong> To make these changes functional, edit the text directly in the component files:
              <br />• TopBanner.tsx - Top banner
              <br />• PromoBanner.tsx - Main banner
              <br />• SmallBanners.tsx - Coupon banners
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Banner Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
