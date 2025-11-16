import Link from 'next/link';
import { Home, Search, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Animation */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold mb-4" style={{
              fontFamily: 'var(--font-family-serif)',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              404
            </h1>
            <div className="text-6xl mb-4">💔</div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Page Not Found
          </h2>
          <p className="text-lg mb-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{backgroundColor: 'var(--color-primary)'}}
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link 
              href="/shop" 
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border-2 hover:bg-white/10 transition-all"
              style={{color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}
            >
              <ShoppingBag size={20} />
              Shop Now
            </Link>
          </div>

          {/* Quick Links */}
          <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <h3 className="font-semibold mb-4" style={{color: 'white'}}>Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link href="/shop" className="hover:underline" style={{color: 'var(--color-accent)'}}>Shop</Link>
              <Link href="/categories" className="hover:underline" style={{color: 'var(--color-accent)'}}>Categories</Link>
              <Link href="/about" className="hover:underline" style={{color: 'var(--color-accent)'}}>About Us</Link>
              <Link href="/contact" className="hover:underline" style={{color: 'var(--color-accent)'}}>Contact</Link>
              <Link href="/faq" className="hover:underline" style={{color: 'var(--color-accent)'}}>FAQ</Link>
              <Link href="/size-guide" className="hover:underline" style={{color: 'var(--color-accent)'}}>Size Guide</Link>
              <Link href="/shipping" className="hover:underline" style={{color: 'var(--color-accent)'}}>Shipping</Link>
              <Link href="/privacy" className="hover:underline" style={{color: 'var(--color-accent)'}}>Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
