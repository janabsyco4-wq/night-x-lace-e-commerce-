'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [settings, setSettings] = useState({
    email: 'info@nightxlace.com',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan',
  });

  useEffect(() => {
    // Fetch settings on mount
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings({
            email: data.settings.email,
            phone: data.settings.phone,
            address: data.settings.address,
          });
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setSubscribed(true);
        setTimeout(() => {
          setSubscribed(false);
          setEmail('');
        }, 3000);
      } else {
        alert(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };
  return (
    <footer className="text-gray-300" style={{backgroundColor: 'var(--color-secondary)'}}>
      {/* Newsletter */}
      <div className="border-b" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <div className="container-custom py-8 md:py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Stay Updated
            </h3>
            <p className="text-sm md:text-base mb-4 md:mb-6 px-4" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Subscribe to get special offers, new arrivals, and exclusive deals
            </p>
            {subscribed ? (
              <div className="p-3 md:p-4 rounded-lg text-sm md:text-base" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent)'}}>
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-md mx-auto px-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                />
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all whitespace-nowrap"
                  style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                >
                  <Send size={16} className="md:w-[18px] md:h-[18px]" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4" style={{fontFamily: 'var(--font-family-serif)'}}>
              Night <span style={{color: 'var(--color-primary)'}}>×</span> Lace
            </h3>
            <p className="text-xs md:text-sm mb-3 md:mb-4" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Premium women's undergarments and lingerie</p>
            <div className="flex gap-3 md:gap-4 justify-center sm:justify-start">
              <a href="#" className="transition-colors hover:opacity-80" style={{color: 'var(--color-accent)'}}>
                <Facebook size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="#" className="transition-colors hover:opacity-80" style={{color: 'var(--color-accent)'}}>
                <Instagram size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="#" className="transition-colors hover:opacity-80" style={{color: 'var(--color-accent)'}}>
                <Twitter size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{color: 'var(--color-accent)'}}>Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li><Link href="/shop" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Shop</Link></li>
              <li><Link href="/categories" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Categories</Link></li>
              <li><Link href="/about" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>About Us</Link></li>
              <li><Link href="/blog" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Blog</Link></li>
              <li><Link href="/contact" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{color: 'var(--color-accent)'}}>Customer Service</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li><Link href="/size-guide" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Size Guide</Link></li>
              <li><Link href="/shipping" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Shipping & Returns</Link></li>
              <li><Link href="/faq" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>FAQ</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:opacity-80 inline-block" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base" style={{color: 'var(--color-accent)'}}>Contact Us</h4>
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              <li className="flex items-start gap-2 justify-center sm:justify-start">
                <MapPin size={16} className="mt-0.5 md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-primary)'}} />
                <span className="text-left">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-primary)'}} />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-primary)'}} />
                <span className="break-all">{settings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm px-4" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
          <p style={{color: 'rgba(255, 255, 255, 0.5)'}}>&copy; {new Date().getFullYear()} Night × Lace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
