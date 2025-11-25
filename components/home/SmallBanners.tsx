'use client';

import Link from 'next/link';
import { Tag, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SmallBanners() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [coupons, setCoupons] = useState([
    {
      code: 'SAVE20',
      discount: '20%',
      description: 'Get 20% off on all items',
      color: 'rgba(255, 0, 127, 0.3)',
      bgColor: 'rgba(255, 0, 127, 0.2)',
      textColor: 'var(--color-primary)',
    },
    {
      code: 'FIRST15',
      discount: '15%',
      description: 'First order special discount',
      color: 'rgba(212, 175, 55, 0.3)',
      bgColor: 'rgba(212, 175, 55, 0.2)',
      textColor: 'var(--color-accent)',
    },
    {
      code: 'LUXURY30',
      discount: '30%',
      description: 'Premium collection discount',
      color: 'rgba(255, 0, 127, 0.3)',
      bgColor: 'rgba(255, 0, 127, 0.2)',
      textColor: 'var(--color-primary)',
    },
  ]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          const settings = data.settings;
          
          // Build coupons array from settings
          const formattedCoupons = [
            {
              code: settings.smallBanner1Code || 'SAVE20',
              discount: settings.smallBanner1Discount || '20%',
              description: settings.smallBanner1Description || 'Get 20% off on all items',
              color: 'rgba(255, 0, 127, 0.3)',
              bgColor: 'rgba(255, 0, 127, 0.2)',
              textColor: 'var(--color-primary)',
            },
            {
              code: settings.smallBanner2Code || 'FIRST15',
              discount: settings.smallBanner2Discount || '15%',
              description: settings.smallBanner2Description || 'First order special discount',
              color: 'rgba(212, 175, 55, 0.3)',
              bgColor: 'rgba(212, 175, 55, 0.2)',
              textColor: 'var(--color-accent)',
            },
            {
              code: settings.smallBanner3Code || 'LUXURY30',
              discount: settings.smallBanner3Discount || '30%',
              description: settings.smallBanner3Description || 'Premium collection discount',
              color: 'rgba(255, 0, 127, 0.3)',
              bgColor: 'rgba(255, 0, 127, 0.2)',
              textColor: 'var(--color-primary)',
            },
          ];
          
          setCoupons(formattedCoupons);
        }
      }
    } catch (error) {
      console.error('Error fetching coupon banners:', error);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-4 md:py-12">
      <div className="container-custom">
        {/* Mobile View - Single Line */}
        <div className="md:hidden flex flex-col gap-2">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 rounded-lg border backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(26, 26, 29, 0.8)',
                borderColor: coupon.color,
              }}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs font-semibold whitespace-nowrap" style={{ color: 'white' }}>
                  {coupon.description}
                </span>
                <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>-</span>
                <span className="text-xs font-mono font-bold whitespace-nowrap" style={{ color: coupon.textColor }}>
                  {coupon.code}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(coupon.code)}
                className="p-1.5 rounded transition-all flex-shrink-0"
                style={{
                  backgroundColor: coupon.bgColor,
                  color: coupon.textColor,
                }}
              >
                {copiedCode === coupon.code ? (
                  <Check size={14} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Desktop View - Original Cards */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{
                backgroundColor: 'rgba(26, 26, 29, 0.8)',
                borderColor: coupon.color,
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 opacity-50" style={{
                background: `linear-gradient(135deg, ${coupon.bgColor} 0%, transparent 100%)`,
              }}></div>

              <div className="relative z-10 p-6 md:p-8">
                {/* Discount badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 border" style={{
                  backgroundColor: coupon.bgColor,
                  borderColor: coupon.color,
                }}>
                  <Tag size={16} style={{ color: coupon.textColor }} />
                  <span className="text-sm font-bold" style={{ color: coupon.textColor }}>
                    {coupon.discount} OFF
                  </span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg font-semibold mb-4" style={{
                  color: 'white',
                }}>
                  {coupon.description}
                </p>

                {/* Coupon code box */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 px-4 py-3 rounded-lg border-2 border-dashed font-mono text-center" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: coupon.color,
                  }}>
                    <span className="text-lg md:text-xl font-bold" style={{ color: coupon.textColor }}>
                      {coupon.code}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="p-3 rounded-lg transition-all hover:scale-110"
                    style={{
                      backgroundColor: coupon.bgColor,
                      color: coupon.textColor,
                    }}
                    title="Copy code"
                  >
                    {copiedCode === coupon.code ? (
                      <Check size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>

                {/* Shop link */}
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all"
                  style={{ color: coupon.textColor }}
                >
                  Shop Now
                  <span className="transition-transform">→</span>
                </Link>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10" style={{
                backgroundColor: coupon.textColor,
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
