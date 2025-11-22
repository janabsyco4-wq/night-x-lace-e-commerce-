'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useRouter } from 'next/navigation';
import SearchBar from './SearchBar';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [topBannerText, setTopBannerText] = useState('Free Shipping on Orders Over PKR 3000');
  const [logoFirstPart, setLogoFirstPart] = useState('Night');
  const [logoSecondPart, setLogoSecondPart] = useState('Lace');

  useEffect(() => {
    // Check if user is logged in on mount
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkUser();

    // Fetch settings (banner text and logo)
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success && data.settings) {
          if (data.settings.topBannerText) {
            setTopBannerText(data.settings.topBannerText);
          }
          if (data.settings.logoFirstPart) {
            setLogoFirstPart(data.settings.logoFirstPart);
          }
          if (data.settings.logoSecondPart) {
            setLogoSecondPart(data.settings.logoSecondPart);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();

    // Listen for custom login event
    const handleUserLogin = () => {
      checkUser();
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{backgroundColor: 'rgba(26, 26, 29, 1)', paddingRight: '17px'}}>
      {/* Top Bar */}
      <div style={{backgroundColor: 'var(--color-primary)'}} className="text-white py-2.5 overflow-hidden">
        <div className="container-custom">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <p className="font-medium">{topBannerText}</p>
            </div>
            <div className="flex gap-3 md:gap-6 text-xs md:text-sm">
              <Link href="/contact" className="hover:underline font-medium">Contact</Link>
              <Link href="/faq" className="hover:underline font-medium">FAQ</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
              {logoFirstPart} <span className="mx-1" style={{color: 'var(--color-primary)'}}>×</span> {logoSecondPart}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Home', 'Shop', 'Categories', 'Blog', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="relative font-medium text-sm uppercase tracking-wide transition-colors group"
                style={{color: 'white'}}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundColor: 'var(--color-primary)'}}></span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-white/10 transition-all group">
              <Heart size={20} style={{color: 'white'}} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform" style={{backgroundColor: 'var(--color-accent)'}}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-white/10 transition-all group">
              <ShoppingCart size={20} style={{color: 'white'}} />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform group-hover:scale-110 transition-transform" style={{backgroundColor: 'var(--color-primary)'}}>
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden lg:block">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-all"
                  style={{color: 'white'}}
                >
                  <User size={20} />
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg font-medium transition-all hover:bg-white/10"
                  style={{color: 'white'}}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg font-medium transition-all"
                  style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                >
                  Register
                </Link>
              </div>
            )}

            <button 
              className="lg:hidden p-2 rounded-full transition-all"
              style={{color: 'white'}}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t animate-slideDown" style={{backgroundColor: 'rgba(26, 26, 29, 0.98)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
          <nav className="container-custom py-6 flex flex-col gap-4">
            {['Home', 'Shop', 'Categories', 'Blog', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="font-medium py-2 transition-colors border-b"
                style={{color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)'}}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="pt-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
              {user ? (
                <>
                  <div className="mb-4 p-3 rounded-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                    <p className="font-semibold mb-1" style={{color: 'white'}}>{user.name}</p>
                    <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block w-full text-center py-3 mb-2 rounded-lg transition-all"
                    style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-3 rounded-lg transition-all text-red-400"
                    style={{backgroundColor: 'rgba(239, 68, 68, 0.1)'}}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="flex-1 text-center py-3 border-2 rounded-lg transition-all"
                    style={{borderColor: 'var(--color-primary)', color: 'var(--color-primary)'}}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center py-3 rounded-lg transition-all"
                    style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
