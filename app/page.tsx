import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import PromoBanner from "@/components/home/PromoBanner";
import SmallBanners from "@/components/home/SmallBanners";
import { Shield, Truck, RotateCcw, Headphones, Sparkles, Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <PromoBanner />
      <SmallBanners />
      
      {/* Trust Badges */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'var(--color-primary)'}}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl" style={{backgroundColor: 'var(--color-accent)'}}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-4 text-xs md:text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
              <Sparkles size={14} className="md:w-4 md:h-4" style={{color: 'var(--color-accent)'}} />
              <span className="font-medium" style={{color: 'var(--color-accent)'}}>Premium Service</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Why Choose Us
            </h2>
            <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Experience premium quality with unmatched service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            <div className="group text-center p-4 md:p-6 lg:p-8 rounded-xl lg:rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 md:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'rgba(255, 0, 127, 0.15)'}}>
                <Truck size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" style={{color: 'var(--color-primary)'}} />
              </div>
              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2" style={{color: 'white'}}>Free Shipping</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>On orders over PKR 3000</p>
            </div>
            
            <div className="group text-center p-4 md:p-6 lg:p-8 rounded-xl lg:rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 md:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)'}}>
                <Shield size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" style={{color: 'var(--color-accent)'}} />
              </div>
              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2" style={{color: 'white'}}>Secure Payment</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>100% secure transactions</p>
            </div>
            
            <div className="group text-center p-4 md:p-6 lg:p-8 rounded-xl lg:rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 md:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'rgba(255, 0, 127, 0.15)'}}>
                <RotateCcw size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" style={{color: 'var(--color-primary)'}} />
              </div>
              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2" style={{color: 'white'}}>Easy Returns</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>3-day return policy</p>
            </div>
            
            <div className="group text-center p-4 md:p-6 lg:p-8 rounded-xl lg:rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3 md:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)'}}>
                <Headphones size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" style={{color: 'var(--color-accent)'}} />
              </div>
              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2" style={{color: 'white'}}>24/7 Support</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Shop by Category
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Explore our curated collections designed for every occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'Bras', emoji: '👙', color: 'rgba(255, 0, 127, 0.2)' },
              { name: 'Panties', emoji: '🩱', color: 'rgba(212, 175, 55, 0.2)' },
              { name: 'Lingerie Sets', emoji: '💝', color: 'rgba(255, 0, 127, 0.2)' },
              { name: 'Nightwear', emoji: '🌙', color: 'rgba(212, 175, 55, 0.2)' },
              { name: 'Shapewear', emoji: '✨', color: 'rgba(255, 0, 127, 0.2)' },
              { name: 'Accessories', emoji: '💎', color: 'rgba(212, 175, 55, 0.2)' },
            ].map((category, index) => (
              <Link 
                key={index}
                href="/categories"
                className="group relative overflow-hidden p-6 md:p-8 rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.2)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(135deg, ${category.color} 0%, transparent 100%)`}}></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.emoji}
                  </div>
                  <h3 className="font-bold text-base md:text-lg" style={{color: 'white'}}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link 
              href="/categories" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base md:text-lg transition-all hover:shadow-xl hover:scale-105"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              View All Categories
              <TrendingUp size={20} />
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, rgba(255, 0, 127, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)'}}></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
              <Heart size={16} style={{color: 'var(--color-accent)'}} />
              <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>Join Our Community</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Get Exclusive Offers
            </h2>
            <p className="text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Subscribe to our newsletter and be the first to know about new arrivals, special promotions, and styling tips
            </p>

            <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-2 focus:outline-none transition-all text-base"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-xl hover:scale-105 whitespace-nowrap"
                style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
              >
                Subscribe Now
              </button>
            </form>

            <p className="text-xs md:text-sm mt-4" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
