'use client';

import { BarChart3, TrendingUp, Package, Users } from 'lucide-react';

interface AdminHeroProps {
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    activeCoupons: number;
  };
}

export default function AdminHero({ stats }: AdminHeroProps) {
  return (
    <section className="relative overflow-hidden mb-6 md:mb-8 mt-5">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl"></div>
      
      <div className="relative p-6 md:p-8 lg:p-10 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 md:mb-4 border" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
                <BarChart3 size={16} style={{color: 'var(--color-accent)'}} />
                <span className="text-xs md:text-sm font-medium" style={{color: 'var(--color-accent)'}}>Admin Dashboard</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                Welcome Back,
                <br />
                <span style={{color: 'var(--color-primary)'}}>Administrator</span>
              </h1>
              
              <p className="text-sm md:text-base lg:text-lg" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Manage your store, track performance, and grow your business with powerful insights.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 rounded-xl border" style={{backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="md:w-5 md:h-5" style={{color: '#10b981'}} />
                  <span className="text-xs md:text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Revenue</span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl font-bold" style={{color: 'white'}}>
                  Rs. {(stats.totalRevenue / 1000).toFixed(1)}k
                </p>
              </div>

              <div className="p-3 md:p-4 rounded-xl border" style={{backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="md:w-5 md:h-5" style={{color: 'var(--color-primary)'}} />
                  <span className="text-xs md:text-sm font-medium" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Orders</span>
                </div>
                <p className="text-lg md:text-xl lg:text-2xl font-bold" style={{color: 'white'}}>
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all" style={{backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4" style={{backgroundColor: 'rgba(59, 130, 246, 0.2)'}}>
                <Users size={20} className="md:w-6 md:h-6" style={{color: '#3b82f6'}} />
              </div>
              <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Customers</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{color: 'white'}}>{stats.totalCustomers}</p>
            </div>

            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all" style={{backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)'}}>
                <Package size={20} className="md:w-6 md:h-6" style={{color: 'var(--color-accent)'}} />
              </div>
              <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Products</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{color: 'white'}}>{stats.totalProducts}</p>
            </div>

            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all" style={{backgroundColor: 'rgba(255, 255, 255, 0.03)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4" style={{backgroundColor: 'rgba(245, 158, 11, 0.2)'}}>
                <BarChart3 size={20} className="md:w-6 md:h-6" style={{color: '#f59e0b'}} />
              </div>
              <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Active Coupons</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{color: 'white'}}>{stats.activeCoupons}</p>
            </div>

            {/* Performance Indicator */}
            <div className="p-4 md:p-5 rounded-xl border" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Performance</p>
                  <p className="text-base md:text-lg font-bold text-green-400">Excellent</p>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp size={20} className="md:w-6 md:h-6" />
                  <span className="text-lg md:text-xl font-bold">+0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 rounded-full opacity-20 blur-3xl pointer-events-none" style={{backgroundColor: 'var(--color-primary)'}}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 rounded-full opacity-20 blur-3xl pointer-events-none" style={{backgroundColor: 'var(--color-accent)'}}></div>
      </div>
    </section>
  );
}
