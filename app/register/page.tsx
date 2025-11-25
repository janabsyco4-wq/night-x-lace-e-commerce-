'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ShoppingBag, Heart, Star, Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Live validation
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;
  const passwordTooShort = formData.password && formData.password.length < 6;

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('userLoggedIn'));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Registration failed');
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
          background: 'linear-gradient(135deg, #D4AF37 0%, #FF007F 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link href="/" className="mb-12">
            <h1 className="text-5xl font-bold mb-2" style={{fontFamily: 'var(--font-family-serif)'}}>
              Night <span className="text-pink-300">×</span> Lace
            </h1>
            <p className="text-white/80 text-lg">Premium Women's Lingerie</p>
          </Link>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-white/90">Exclusive member-only discounts</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-white/90">Early access to new collections</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-white/90">Free shipping on orders over PKR 3000</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-white/90">Personalized recommendations</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <p className="text-white/90">Track orders and manage wishlist</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-sm text-white/70 mb-2">Trusted by thousands</p>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <p className="text-2xl font-bold">4.9/5.0</p>
            <p className="text-sm text-white/70">Based on 10,000+ reviews</p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
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
              Create Account
            </h2>
            <p className="text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Join us and start shopping
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 rounded-xl border animate-shake" style={{backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.3)'}}>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-4 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="John Doe"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-4 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-4 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="+92 300 1234567"
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-4 pr-14 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: passwordTooShort ? 'rgba(255, 0, 0, 0.5)' : 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = passwordTooShort ? 'rgba(255, 0, 0, 0.5)' : 'rgba(212, 175, 55, 0.2)'}
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
              {passwordTooShort && (
                <p className="text-xs mt-1 text-red-400">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: 'white'}}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-4 pr-14 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: passwordsDontMatch ? 'rgba(255, 0, 0, 0.5)' : passwordsMatch ? 'rgba(0, 255, 0, 0.5)' : 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="••••••••"
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                  onBlur={(e) => e.target.style.borderColor = passwordsDontMatch ? 'rgba(255, 0, 0, 0.5)' : passwordsMatch ? 'rgba(0, 255, 0, 0.5)' : 'rgba(212, 175, 55, 0.2)'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
                  style={{color: 'rgba(255, 255, 255, 0.4)'}}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordsDontMatch && (
                <p className="text-xs mt-1 text-red-400">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="text-xs mt-1 text-green-400">Passwords match ✓</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-6"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-bold hover:underline transition-colors" 
                style={{color: 'var(--color-primary)'}}
              >
                Login
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

            <button
              onClick={() => {
                localStorage.setItem('guest_mode', 'true');
                router.push('/');
              }}
              className="block w-full text-sm font-medium hover:underline transition-colors" 
              style={{color: 'rgba(255, 255, 255, 0.6)'}}
            >
              Continue Shopping as Guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
