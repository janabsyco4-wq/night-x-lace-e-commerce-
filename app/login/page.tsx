'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShoppingBag, Heart, Star } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('userLoggedIn'));
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FF007F 0%, #D4AF37 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link href="/" className="mb-12">
            <h1 className="text-5xl font-bold mb-2" style={{fontFamily: 'var(--font-family-serif)'}}>
              Night <span className="text-yellow-300">×</span> Lace
            </h1>
            <p className="text-white/80 text-lg">Premium Women's Lingerie</p>
          </Link>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Exclusive Collections</h3>
                <p className="text-white/80">Access premium lingerie and intimate wear</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Wishlist & Favorites</h3>
                <p className="text-white/80">Save your favorite items for later</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Star size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Member Benefits</h3>
                <p className="text-white/80">Get exclusive deals and early access</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-white/70">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-white/70">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9</p>
              <p className="text-white/70">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{backgroundColor: '#0f0f11'}}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block text-center mb-8">
            <h1 className="text-3xl font-bold mb-1" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Night <span style={{color: 'var(--color-primary)'}}>×</span> Lace
            </h1>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Premium Women's Lingerie</p>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
              Welcome Back
            </h2>
            <p className="text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Login to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl border animate-shake" style={{backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.3)'}}>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Email Address
              </label>
              <div className="relative group">
                <Mail 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors" 
                  size={20} 
                  style={{color: 'rgba(255, 255, 255, 0.4)'}} 
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="your@email.com"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Password
              </label>
              <div className="relative group">
                <Lock 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors" 
                  size={20} 
                  style={{color: 'rgba(255, 255, 255, 0.4)'}} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-14 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{color: 'rgba(255, 255, 255, 0.4)'}}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : (
                'Login to Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="font-bold hover:underline transition-colors" 
                style={{color: 'var(--color-primary)'}}
              >
                Create Account
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4" style={{backgroundColor: '#0f0f11', color: 'rgba(255, 255, 255, 0.4)'}}>or</span>
              </div>
            </div>

            <Link 
              href="/" 
              className="block text-sm font-medium hover:underline transition-colors" 
              style={{color: 'rgba(255, 255, 255, 0.6)'}}
            >
              Continue Shopping as Guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
