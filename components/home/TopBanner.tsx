'use client';

import { X, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [bannerData, setBannerData] = useState({
    topText: '🎉 Summer Sale:',
    topDiscountText: '50% OFF',
    topCouponCode: 'ALI12345',
  });

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await fetch('/api/banners');
      if (response.ok) {
        const data = await response.json();
        const topBanner = data.banners?.find((b: any) => b.type === 'top' && b.isActive);
        if (topBanner) {
          setBannerData({
            topText: topBanner.topText || '🎉 Summer Sale:',
            topDiscountText: topBanner.topDiscountText || '50% OFF',
            topCouponCode: topBanner.topCouponCode || 'ALI12345',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching top banner:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full" style={{
      background: 'linear-gradient(90deg, rgba(255, 0, 127, 0.95) 0%, rgba(212, 175, 55, 0.95) 100%)',
    }}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-2 md:py-2.5 gap-4">
          <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 text-center px-2">
            <Tag size={16} className="text-white flex-shrink-0 hidden sm:block" />
            <p className="text-white text-xs md:text-sm font-bold">
              {bannerData.topText} <span className="underline">{bannerData.topDiscountText}</span> - Use Code: <span className="bg-white/20 px-2 py-0.5 rounded">{bannerData.topCouponCode}</span>
            </p>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-all flex-shrink-0"
            aria-label="Close banner"
          >
            <X size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
