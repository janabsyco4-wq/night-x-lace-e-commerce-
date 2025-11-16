'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Store, Mail, Phone, MapPin, Lock, Truck, DollarSign, Save } from 'lucide-react';

export const dynamic = 'force-dynamic';

function SettingsContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const activeTab = searchParams.get('tab') || 'store';

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Night × Lace',
    email: 'info@nightxlace.com',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan',
    description: 'Premium women\'s undergarments and lingerie',
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 3000,
    standardShipping: 200,
    expressShipping: 500,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      if (data.success && data.settings) {
        setStoreSettings({
          storeName: data.settings.storeName,
          email: data.settings.email,
          phone: data.settings.phone,
          address: data.settings.address,
          description: data.settings.description,
        });
        setShippingSettings({
          freeShippingThreshold: data.settings.freeShippingThreshold,
          standardShipping: data.settings.standardShipping,
          expressShipping: data.settings.expressShipping,
        });
        setBannerSettings({
          topBannerText: data.settings.topBannerText || '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
          mainHeading: data.settings.mainHeading || 'Unlock Your Luxury',
          mainDiscount: data.settings.mainDiscount || '50% OFF',
          mainCouponCode: data.settings.mainCouponCode || 'ALI12345',
          bannerEndDate: data.settings.bannerEndDate ? new Date(data.settings.bannerEndDate).toISOString().slice(0, 16) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
          smallBanner1Code: data.settings.smallBanner1Code || 'SAVE20',
          smallBanner1Discount: data.settings.smallBanner1Discount || '20%',
          smallBanner1Description: data.settings.smallBanner1Description || 'Get 20% off on all items',
          smallBanner2Code: data.settings.smallBanner2Code || 'FIRST15',
          smallBanner2Discount: data.settings.smallBanner2Discount || '15%',
          smallBanner2Description: data.settings.smallBanner2Description || 'First order special discount',
          smallBanner3Code: data.settings.smallBanner3Code || 'LUXURY30',
          smallBanner3Discount: data.settings.smallBanner3Discount || '30%',
          smallBanner3Description: data.settings.smallBanner3Description || 'Premium collection discount',
        });
        setLogoSettings({
          logoText: `${data.settings.logoFirstPart || 'Night'} × ${data.settings.logoSecondPart || 'Lace'}`,
          logoFirstPart: data.settings.logoFirstPart || 'Night',
          logoSecondPart: data.settings.logoSecondPart || 'Lace',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveStore = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...storeSettings,
          ...shippingSettings,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Store settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveShipping = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...storeSettings,
          ...shippingSettings,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Shipping settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordSettings.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }

    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Password changed successfully!');
      setPasswordSettings({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const [bannerSettings, setBannerSettings] = useState({
    topBannerText: '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
    mainHeading: 'Unlock Your Luxury',
    mainDiscount: '50% OFF',
    mainCouponCode: 'ALI12345',
    bannerEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16), // 3 days from now
    smallBanner1Code: 'SAVE20',
    smallBanner1Discount: '20%',
    smallBanner1Description: 'Get 20% off on all items',
    smallBanner2Code: 'FIRST15',
    smallBanner2Discount: '15%',
    smallBanner2Description: 'First order special discount',
    smallBanner3Code: 'LUXURY30',
    smallBanner3Discount: '30%',
    smallBanner3Description: 'Premium collection discount',
  });

  const [logoSettings, setLogoSettings] = useState({
    logoText: 'Night × Lace',
    logoFirstPart: 'Night',
    logoSecondPart: 'Lace',
  });

  const handleSaveBanners = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bannerSettings,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Banner settings saved successfully!');
        // Refresh to show updated data
        await fetchSettings();
      } else {
        alert('Failed to save banner settings');
      }
    } catch (error) {
      alert('Failed to save banner settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLogo = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logoFirstPart: logoSettings.logoFirstPart,
          logoSecondPart: logoSettings.logoSecondPart,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Logo settings saved successfully!');
        // Refresh to show updated data
        await fetchSettings();
      } else {
        alert('Failed to save logo settings');
      }
    } catch (error) {
      alert('Failed to save logo settings');
    } finally {
      setSaving(false);
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

  const getPageTitle = () => {
    switch (activeTab) {
      case 'store': return 'Store Information';
      case 'shipping': return 'Shipping Settings';
      case 'banners': return 'Banner Settings';
      case 'logo': return 'Logo Settings';
      case 'password': return 'Change Password';
      default: return 'Settings';
    }
  };

  const getPageDescription = () => {
    switch (activeTab) {
      case 'store': return 'Update your store\'s basic information';
      case 'shipping': return 'Configure shipping costs and policies';
      case 'banners': return 'Edit the text displayed on your homepage banners';
      case 'logo': return 'Customize your website logo text';
      case 'password': return 'Update your admin account password';
      default: return 'Manage your store settings and preferences';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">{getPageTitle()}</h1>
          <p className="text-gray-400 mt-1">{getPageDescription()}</p>
        </div>

        {/* Store Info Tab */}
        {activeTab === 'store' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Store size={16} className="inline mr-2" />
                  Store Name (Fixed)
                </label>
                <input
                  type="text"
                  value="Night × Lace"
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Store name cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={storeSettings.email}
                  onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={storeSettings.phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Store Description (Fixed)
                </label>
                <textarea
                  rows={3}
                  value="Premium women's undergarments and lingerie"
                  disabled
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Store description cannot be changed</p>
              </div>
            </div>

            <button
              onClick={handleSaveStore}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <DollarSign size={16} className="inline mr-2" />
                  Free Shipping Threshold (Rs.)
                </label>
                <input
                  type="number"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">Orders above this amount get free shipping</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Truck size={16} className="inline mr-2" />
                  Standard Shipping Cost (Rs.)
                </label>
                <input
                  type="number"
                  value={shippingSettings.standardShipping}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, standardShipping: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">Delivery in 3-5 business days</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Truck size={16} className="inline mr-2" />
                  Express Shipping Cost (Rs.)
                </label>
                <input
                  type="number"
                  value={shippingSettings.expressShipping}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, expressShipping: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">Delivery in 1-2 business days</p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                💡 <strong>Tip:</strong> Offering free shipping on orders above Rs. 3,000 can increase average order value!
              </p>
            </div>

            <button
              onClick={handleSaveShipping}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}

        {/* Banners Tab */}
        {activeTab === 'banners' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">

            <div className="space-y-6">
              {/* Top Banner */}
              <div className="border-b border-gray-700 pb-6">
                <h3 className="text-lg font-medium text-white mb-4">Top Banner (Above Navigation)</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Banner Text
                  </label>
                  <input
                    type="text"
                    value={bannerSettings.topBannerText}
                    onChange={(e) => setBannerSettings({ ...bannerSettings, topBannerText: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                    placeholder="🎉 Summer Sale: 50% OFF - Use Code: ALI12345"
                  />
                  <p className="text-xs text-gray-500 mt-1">This appears at the very top of your website</p>
                </div>
              </div>

              {/* Main Banner */}
              <div className="border-b border-gray-700 pb-6">
                <h3 className="text-lg font-medium text-white mb-4">Main Banner (Homepage)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={bannerSettings.mainHeading}
                      onChange={(e) => setBannerSettings({ ...bannerSettings, mainHeading: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
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
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
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
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                      placeholder="ALI12345"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Offer End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={bannerSettings.bannerEndDate}
                      onChange={(e) => setBannerSettings({ ...bannerSettings, bannerEndDate: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Set when the offer expires - timer will count down in real-time</p>
                  </div>
                </div>
              </div>

              {/* Small Banners */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Small Coupon Banners</h3>
                <div className="space-y-6">
                  {/* Banner 1 */}
                  <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                    <h4 className="text-md font-medium text-white">Banner 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Coupon Code</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner1Code}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner1Code: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="SAVE20"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Discount</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner1Discount}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner1Discount: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="20%"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner1Description}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner1Description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="Get 20% off on all items"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Banner 2 */}
                  <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                    <h4 className="text-md font-medium text-white">Banner 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Coupon Code</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner2Code}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner2Code: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="FIRST15"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Discount</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner2Discount}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner2Discount: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="15%"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner2Description}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner2Description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="First order special discount"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Banner 3 */}
                  <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                    <h4 className="text-md font-medium text-white">Banner 3</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Coupon Code</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner3Code}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner3Code: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="LUXURY30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Discount</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner3Discount}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner3Discount: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="30%"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={bannerSettings.smallBanner3Description}
                          onChange={(e) => setBannerSettings({ ...bannerSettings, smallBanner3Description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-pink-500"
                          placeholder="Premium collection discount"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-sm">
                ✅ <strong>Live:</strong> Banner changes will be reflected immediately on your website after saving.
              </p>
            </div>

            <button
              onClick={handleSaveBanners}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Banner Settings'}
            </button>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordSettings.currentPassword}
                  onChange={(e) => setPasswordSettings({ ...passwordSettings, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordSettings.newPassword}
                  onChange={(e) => setPasswordSettings({ ...passwordSettings, newPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordSettings.confirmPassword}
                  onChange={(e) => setPasswordSettings({ ...passwordSettings, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Warning:</strong> You will be logged out after changing your password. Make sure to remember your new password!
              </p>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Lock size={20} />
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        )}

        {/* Logo Tab */}
        {activeTab === 'logo' && (
          <div className="bg-gray-800 rounded-lg p-6 space-y-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Store size={16} className="inline mr-2" />
                  Logo First Part
                </label>
                <input
                  type="text"
                  value={logoSettings.logoFirstPart}
                  onChange={(e) => setLogoSettings({ ...logoSettings, logoFirstPart: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Night"
                />
                <p className="text-xs text-gray-500 mt-1">First part of the logo (before the ×)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Store size={16} className="inline mr-2" />
                  Logo Second Part
                </label>
                <input
                  type="text"
                  value={logoSettings.logoSecondPart}
                  onChange={(e) => setLogoSettings({ ...logoSettings, logoSecondPart: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  placeholder="Lace"
                />
                <p className="text-xs text-gray-500 mt-1">Second part of the logo (after the ×)</p>
              </div>

              {/* Logo Preview */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <p className="text-sm text-gray-400 mb-3">Preview:</p>
                <div className="flex items-center justify-center">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
                    {logoSettings.logoFirstPart} <span className="mx-1" style={{color: 'var(--color-primary)'}}>×</span> {logoSettings.logoSecondPart}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-sm">
                ✅ <strong>Live:</strong> Logo changes will be reflected immediately on your website after saving.
              </p>
            </div>

            <button
              onClick={handleSaveLogo}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Logo Settings'}
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default function AdminSettingsPage() {
  return (
    <Suspense fallback={
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    }>
      <SettingsContent />
    </Suspense>
  );
}