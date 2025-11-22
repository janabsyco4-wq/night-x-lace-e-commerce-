'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg lg:mr-[17px]" style={{backgroundColor: 'rgba(26, 26, 29, 1)'}}>
      {/* Top Bar */}
      <div style={{backgroundColor: 'var(--color-primary)'}} className="text-white py-2.5 overflow-hidden">
        <div className="container-custom">
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <p className="font-medium">Free Shipping on Orders Over PKR 3000</p>
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
              Night <span className="mx-1" style={{color: 'var(--color-primary)'}}>×</span> Lace
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
            <button className="hidden md:block p-2 rounded-full hover:bg-white/10 transition-all">
              <Search size={20} style={{color: 'white'}} />
            </button>
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

            {!isLoading && (
              user ? (
                <Link href="/dashboard" className="hidden lg:block p-2 rounded-full hover:bg-white/10 transition-all" style={{color: 'white'}}>
                  <User size={20} />
                </Link>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login" className="flex items-center gap-1 px-4 py-2 rounded-full hover:bg-white/10 transition-all text-sm font-medium" style={{color: 'white'}}>
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link href="/register" className="flex items-center gap-1 px-4 py-2 rounded-full transition-all text-sm font-medium" style={{backgroundColor: 'var(--color-primary)', color: 'white'}}>
                    <UserPlus size={16} />
                    Register
                  </Link>
                </div>
              )
            )}

            <button 
              className="lg:hidden p-2 rounded-full transition-all"
              style={{color: 'white'}}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[140px] right-0 bottom-0 w-64 shadow-2xl animate-slideIn lg:mr-[17px]" style={{backgroundColor: 'rgba(26, 26, 29, 1)', zIndex: 9999}}>
          <nav className="py-6 px-4 flex flex-col gap-4">
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

            {/* Auth Links for Mobile */}
            {!isLoading && (
              <div className="pt-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
                {user ? (
                  <Link 
                    href="/dashboard"
                    className="flex items-center gap-2 font-medium py-2 transition-colors"
                    style={{color: 'white'}}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link 
                      href="/login"
                      className="flex items-center gap-2 font-medium py-2 mb-2 transition-colors"
                      style={{color: 'white'}}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn size={18} />
                      Login
                    </Link>
                    <Link 
                      href="/register"
                      className="flex items-center gap-2 font-medium py-2 px-4 rounded-lg transition-colors"
                      style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
