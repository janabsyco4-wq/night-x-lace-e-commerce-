'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Default end date: 3 days from now
  const defaultEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  
  const [bannerSettings, setBannerSettings] = useState({
    topBannerText: '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
    mainHeading: 'Unlock Your Luxury',
    mainDiscount: '50% OFF',
    mainCouponCode: 'ALI12345',
    bannerEndDate: defaultEndDate.toISOString(),
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Mount check for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success && data.settings) {
          setBannerSettings({
            topBannerText: data.settings.topBannerText || '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
            mainHeading: data.settings.mainHeading || 'Unlock Your Luxury',
            mainDiscount: data.settings.mainDiscount || '50% OFF',
            mainCouponCode: data.settings.mainCouponCode || 'ALI12345',
            bannerEndDate: data.settings.bannerEndDate || defaultEndDate.toISOString(),
          });
        }
      } catch (error) {
        console.error('Error fetching banner settings:', error);
      }
    };
    fetchSettings();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const endDate = new Date(bannerSettings.bannerEndDate);
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
        setTimeLeft(newTimeLeft);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [mounted, bannerSettings.bannerEndDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(bannerSettings.mainCouponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="py-4 md:py-6 lg:py-8 relative overflow-hidden" style={{margin: 0}}>
      {/* Animated gradient background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.15) 0%, rgba(212, 175, 55, 0.15) 100%)',
      }}></div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)',
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main banner card */}
          <div className="relative rounded-3xl overflow-hidden border backdrop-blur-sm" style={{
            backgroundColor: 'rgba(26, 26, 29, 0.8)',
            borderColor: 'rgba(212, 175, 55, 0.3)',
          }}>
            {/* Gradient overlay */}
            <div className="absolute inset-0 opacity-20" style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.3) 0%, rgba(212, 175, 55, 0.3) 100%)',
            }}></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 lg:p-8">
              {/* Left side - Content */}
              <div className="flex flex-col justify-center space-y-3">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border w-fit" style={{
                  backgroundColor: 'rgba(255, 0, 127, 0.15)',
                  borderColor: 'var(--color-primary)',
                }}>
                  <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                    LIMITED TIME OFFER
                  </span>
                </div>

                {/* Heading */}
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{
                    fontFamily: 'var(--font-family-serif)',
                    color: 'white',
                  }}>
                    {bannerSettings.mainHeading}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold" style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {bannerSettings.mainDiscount}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base line-clamp-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Discover our exclusive collection of premium lingerie. Elevate your style with luxury pieces designed for comfort and confidence.
                </p>

                {/* Coupon Code Highlight */}
                <div className="relative">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed backdrop-blur-md" style={{
                    backgroundColor: 'rgba(255, 0, 127, 0.1)',
                    borderColor: 'var(--color-primary)',
                  }}>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        Use Code:
                      </span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-base tracking-wider" style={{
                        backgroundColor: 'rgba(26, 26, 29, 0.9)',
                        color: 'var(--color-accent)',
                        border: '2px solid var(--color-accent)',
                      }}>
                        {bannerSettings.mainCouponCode}
                        <button
                          onClick={handleCopy}
                          className="ml-2 px-2 py-1 text-xs rounded transition-all hover:scale-110"
                          style={{
                            backgroundColor: copied ? 'var(--color-accent)' : 'var(--color-primary)',
                            color: 'white',
                          }}
                        >
                          {copied ? '✓' : 'COPY'}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    animation: 'shine 3s infinite',
                  }}></div>
                </div>

                {/* Timer - Real Countdown */}
                <div className="flex items-center gap-2 text-sm md:text-base" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  <Clock size={18} style={{ color: 'var(--color-accent)' }} />
                  <span>Offer ends in: </span>
                  <div className="flex items-center gap-1 font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
                    {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
                    <span>{String(timeLeft.hours).padStart(2, '0')}:</span>
                    <span>{String(timeLeft.minutes).padStart(2, '0')}:</span>
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Link
                    href="/shop"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all hover:shadow-2xl hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                    }}
                  >
                    Shop Now
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    href="/categories"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base border-2 transition-all hover:shadow-xl hover:scale-105"
                    style={{
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Browse Collections
                  </Link>
                </div>
              </div>

              {/* Right side - Visual elements - Hidden on mobile */}
              <div className="hidden md:flex relative items-center justify-center">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 opacity-20 animate-pulse" style={{
                    borderColor: 'var(--color-primary)',
                  }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 opacity-30" style={{
                    borderColor: 'var(--color-accent)',
                    animation: 'pulse 3s ease-in-out infinite',
                  }}></div>
                </div>

                {/* Center content */}
                <div className="relative z-10 text-center p-6 md:p-8 rounded-full border-4" style={{
                  backgroundColor: 'rgba(26, 26, 29, 0.9)',
                  borderColor: 'var(--color-primary)',
                }}>
                  <div className="text-5xl md:text-6xl font-bold mb-1" style={{
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {bannerSettings.mainDiscount.replace(' OFF', '')}
                  </div>
                  <div className="text-base md:text-lg font-bold" style={{ color: 'white' }}>
                    OFF
                  </div>
                  <div className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Selected Items
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative bar */}
            <div className="h-2" style={{
              background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
