'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, Shield, BarChart3, Settings } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
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
          background: 'linear-gradient(135deg, #1a1a1d 0%, #2d2d30 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-pink-500 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-yellow-500 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-2" style={{fontFamily: 'var(--font-family-serif)'}}>
              Night <span style={{color: 'var(--color-primary)'}}>×</span> Lace
            </h1>
            <p className="text-white/80 text-lg">Admin Control Panel</p>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Secure Access</h3>
                <p className="text-white/80">Protected admin dashboard with full control</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Analytics & Reports</h3>
                <p className="text-white/80">Real-time insights and sales analytics</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Complete Management</h3>
                <p className="text-white/80">Manage products, orders, and customers</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <div>
              <p className="text-3xl font-bold" style={{color: 'var(--color-primary)'}}>24/7</p>
              <p className="text-white/70">Access</p>
            </div>
            <div>
              <p className="text-3xl font-bold" style={{color: 'var(--color-accent)'}}>100%</p>
              <p className="text-white/70">Secure</p>
            </div>
            <div>
              <p className="text-3xl font-bold" style={{color: 'var(--color-primary)'}}>∞</p>
              <p className="text-white/70">Control</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{backgroundColor: '#0f0f11'}}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden block text-center mb-8">
            <h1 className="text-3xl font-bold mb-1" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Night <span style={{color: 'var(--color-primary)'}}>×</span> Lace
            </h1>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Admin Control Panel</p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-2" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
              Admin Login
            </h2>
            <p className="text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Access your admin dashboard
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(26, 26, 29, 0.8)', 
                    borderColor: 'rgba(212, 175, 55, 0.2)', 
                    color: 'white'
                  }}
                  placeholder="admin@nightxlace.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                'Access Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
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
              ← Back to Website
            </Link>
          </div>

          <p className="text-center mt-8 text-xs" style={{color: 'rgba(255, 255, 255, 0.4)'}}>
            © 2025 Night × Lace. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
