'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden pt-4 md:pt-8">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center py-8 md:py-12 lg:py-10">
          {/* Left Content */}
          <div className={`relative z-20 space-y-4 sm:space-y-6 md:space-y-8 md:mt-[17px] lg:-mt-[143px] transition-all duration-1000 ${imageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border text-xs md:text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
              <Sparkles size={14} className="md:w-4 md:h-4" style={{color: 'var(--color-accent)'}} />
              <span className="font-medium" style={{color: 'var(--color-accent)'}}>New Collection 2025</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6" style={{fontFamily: 'var(--font-family-serif)'}}>
                <span style={{color: 'white'}}>Unlock Your</span>
                <br />
                <span className="relative inline-block" style={{color: 'var(--color-primary)'}}>
                  Midnight Desire
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-0.5" style={{backgroundColor: 'var(--color-accent)'}}></span>
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-xl" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Discover our exclusive collection of elegant undergarments designed for the modern woman. 
                Where comfort meets sophistication in every piece.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/shop" className="group inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}>
                Shop Now
                <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/categories" className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold border-2 transform hover:-translate-y-1 transition-all duration-300" style={{backgroundColor: 'transparent', color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}>
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-start gap-4 md:gap-8 pt-6 md:pt-8 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <div className="flex-1 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-family-serif)'}}>500+</div>
                <div className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Products</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-family-serif)'}}>10k+</div>
                <div className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Happy Customers</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-family-serif)'}}>4.9★</div>
                <div className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image - Hidden on Mobile */}
          <div className={`hidden md:block relative z-10 mt-8 lg:mt-0 transition-all duration-1000 delay-300 overflow-hidden ${imageLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Image Container */}
            <div className="relative mx-auto overflow-visible" style={{width: '70%'}}>
              {/* Decorative Elements - Contained */}
              <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 rounded-full opacity-30 blur-2xl pointer-events-none" style={{backgroundColor: 'var(--color-primary)'}}></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 rounded-full opacity-30 blur-2xl pointer-events-none" style={{backgroundColor: 'var(--color-accent)'}}></div>
              
              {/* Hero Image */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group" style={{height: '78vh'}}>
                {/* Your Katja Zwara image */}
                <img 
                  src="/Katja Zwara.jpeg" 
                  alt="Night x Lace Collection" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-lg md:rounded-xl shadow-lg p-2 md:p-3 backdrop-blur-sm border" style={{backgroundColor: 'rgba(26, 26, 29, 0.9)', borderColor: 'var(--color-accent)'}}>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold" style={{color: 'var(--color-primary)'}}>50%</div>
                    <div className="text-xs" style={{color: 'var(--color-accent)'}}>OFF</div>
                  </div>
                </div>
              </div>

              {/* Small Floating Card - Removed negative positioning */}
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 rounded-lg md:rounded-xl shadow-xl p-2 md:p-3 backdrop-blur-sm border hidden sm:block" style={{backgroundColor: 'rgba(26, 26, 29, 0.9)', borderColor: 'var(--color-accent)'}}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <span className="text-base md:text-xl">✨</span>
                  </div>
                  <div>
                    <div className="font-semibold text-xs" style={{color: 'white'}}>Premium Quality</div>
                    <div className="text-xs" style={{color: 'var(--color-accent)'}}>Certified Materials</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
