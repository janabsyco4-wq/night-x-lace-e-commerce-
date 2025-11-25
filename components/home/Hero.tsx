'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-screen md:h-[690px] lg:h-[99vh] overflow-hidden">
      {/* Background Image - Mobile (Repeated Vertically) */}
      <div className="absolute inset-0 md:hidden flex flex-col">
        <div className="relative w-full h-1/2">
          <Image
            src="/images/3e569da6036fea5d74065ea8b169e0ce.jpg"
            alt="Premium lingerie collection"
            fill
            className="object-cover"
            priority
            style={{objectFit: 'cover', objectPosition: 'center'}}
          />
        </div>
        <div className="relative w-full h-1/2">
          <Image
            src="/images/9c223f838f081a376a1192b0734a75fe.jpg"
            alt="Premium lingerie collection"
            fill
            className="object-cover"
            priority
            style={{objectFit: 'cover', objectPosition: 'center'}}
          />
        </div>
      </div>

      {/* Background Image - Desktop */}
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGiqlnX7_W1o4dPuFzjsCIrgtDPfn8m-u_A&s"
        alt="Premium lingerie collection"
        fill
        className="object-cover hidden md:block"
        priority
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Unlock Your <span style={{color: 'var(--color-primary)'}}>Desires.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.9)'}}>
            Exclusive lingerie collection for the modern woman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs sm:max-w-none mx-auto">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-semibold rounded-md transform hover:scale-105 transition-all duration-300"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              Shop Now
            </Link>
            <Link 
              href="/categories" 
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-base font-semibold rounded-md border-2 transform hover:scale-105 transition-all duration-300"
              style={{borderColor: 'white', color: 'white', backgroundColor: 'transparent'}}
            >
              Browse Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
