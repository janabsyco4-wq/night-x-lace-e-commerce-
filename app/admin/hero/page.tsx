'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Save, Image as ImageIcon, Type, Sparkles } from 'lucide-react';

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [heroData, setHeroData] = useState({
    badge: 'New Collection 2025',
    mainHeading: 'Unlock Your',
    highlightedText: 'Midnight Desire',
    description: 'Discover our exclusive collection of elegant undergarments designed for the modern woman. Where comfort meets sophistication in every piece.',
    heroImage: '/Katja Zwara.jpeg',
    stats: {
      products: '500+',
      customers: '10k+',
      rating: '4.9★'
    }
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Hero section updated successfully!');
    } catch (error) {
      console.error('Error saving hero data:', error);
      alert('Failed to save changes');
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Homepage Hero Section</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">Customize your homepage hero content</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            <Save size={18} className="md:w-5 md:h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg border border-gray-700">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              {/* Left Content Preview */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
                  <Sparkles size={14} style={{color: 'var(--color-accent)'}} />
                  <span className="text-xs font-medium" style={{color: 'var(--color-accent)'}}>{heroData.badge}</span>
                </div>
                
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3" style={{fontFamily: 'var(--font-family-serif)'}}>
                    <span style={{color: 'white'}}>{heroData.mainHeading}</span>
                    <br />
                    <span style={{color: 'var(--color-primary)'}}>{heroData.highlightedText}</span>
                  </h1>
                  <p className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                    {heroData.description}
                  </p>
                </div>

                {/* Stats Preview */}
                <div className="flex gap-4 pt-4 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold" style={{color: 'var(--color-accent)'}}>{heroData.stats.products}</div>
                    <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold" style={{color: 'var(--color-accent)'}}>{heroData.stats.customers}</div>
                    <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold" style={{color: 'var(--color-accent)'}}>{heroData.stats.rating}</div>
                    <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Rating</div>
                  </div>
                </div>
              </div>

              {/* Right Image Preview */}
              <div className="hidden lg:block">
                <div className="relative max-w-[280px] mx-auto">
                  <img 
                    src={heroData.heroImage} 
                    alt="Hero" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Badge */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-yellow-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Badge Text</h3>
            </div>
            <input
              type="text"
              value={heroData.badge}
              onChange={(e) => setHeroData({...heroData, badge: e.target.value})}
              className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
              placeholder="New Collection 2025"
            />
          </div>

          {/* Main Heading */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Type size={20} className="text-blue-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Main Heading</h3>
            </div>
            <input
              type="text"
              value={heroData.mainHeading}
              onChange={(e) => setHeroData({...heroData, mainHeading: e.target.value})}
              className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
              placeholder="Unlock Your"
            />
          </div>

          {/* Highlighted Text */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Type size={20} className="text-pink-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Highlighted Text</h3>
            </div>
            <input
              type="text"
              value={heroData.highlightedText}
              onChange={(e) => setHeroData({...heroData, highlightedText: e.target.value})}
              className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
              placeholder="Midnight Desire"
            />
          </div>

          {/* Hero Image */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon size={20} className="text-green-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Hero Image Path</h3>
            </div>
            <input
              type="text"
              value={heroData.heroImage}
              onChange={(e) => setHeroData({...heroData, heroImage: e.target.value})}
              className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
              placeholder="/Katja Zwara.jpeg"
            />
          </div>

          {/* Description */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Type size={20} className="text-purple-400" />
              <h3 className="text-base md:text-lg font-semibold text-white">Description</h3>
            </div>
            <textarea
              rows={3}
              value={heroData.description}
              onChange={(e) => setHeroData({...heroData, description: e.target.value})}
              className="w-full px-3 md:px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm md:text-base focus:outline-none focus:border-pink-500"
              placeholder="Discover our exclusive collection..."
            />
          </div>

          {/* Stats */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg md:col-span-2">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-2">Products</label>
                <input
                  type="text"
                  value={heroData.stats.products}
                  onChange={(e) => setHeroData({...heroData, stats: {...heroData.stats, products: e.target.value}})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-2">Customers</label>
                <input
                  type="text"
                  value={heroData.stats.customers}
                  onChange={(e) => setHeroData({...heroData, stats: {...heroData.stats, customers: e.target.value}})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-2">Rating</label>
                <input
                  type="text"
                  value={heroData.stats.rating}
                  onChange={(e) => setHeroData({...heroData, stats: {...heroData.stats, rating: e.target.value}})}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 md:p-4">
          <div className="flex gap-3">
            <Sparkles className="text-blue-400 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-white font-semibold mb-1 text-sm md:text-base">Hero Section Tips</h3>
              <ul className="text-xs md:text-sm text-gray-300 space-y-1">
                <li>• Keep headings short and impactful</li>
                <li>• Use high-quality images (recommended: 800x1200px)</li>
                <li>• Update stats regularly to maintain credibility</li>
                <li>• Test on mobile devices after making changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
