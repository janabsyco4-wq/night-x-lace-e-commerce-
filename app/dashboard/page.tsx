'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, User, Heart, LogOut, ShoppingBag, Clock, CheckCircle, Truck, XCircle, Menu, X } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('user_token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    await fetchUserOrders(parsedUser);
  };

  const fetchUserOrders = async (userData: any) => {
    try {
      console.log('🔍 Fetching orders for user:', userData);
      // Pass email to API to fetch orders linked to this user
      const response = await fetch(`/api/orders?email=${encodeURIComponent(userData.email)}`);
      const data = await response.json();

      console.log('📦 API Response:', {
        success: data.success,
        totalOrders: data.orders?.length || 0
      });

      if (data.success) {
        // Filter orders by userId or email
        const userOrders = data.orders.filter((order: any) => {
          const orderUserId = order.userId ? String(order.userId) : null;
          const currentUserId = userData.id ? String(userData.id) : null;
          
          const matchesUserId = orderUserId && currentUserId && orderUserId === currentUserId;
          const matchesEmail = order.customer.email.toLowerCase() === userData.email.toLowerCase();
          
          console.log('🔎 Order check:', {
            orderNumber: order.orderNumber,
            orderUserId,
            currentUserId,
            orderEmail: order.customer.email,
            userEmail: userData.email,
            matchesUserId,
            matchesEmail,
            included: matchesUserId || matchesEmail
          });
          
          return matchesUserId || matchesEmail;
        });
        
        console.log('✅ Filtered orders:', userOrders.length);
        setOrders(userOrders);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userLoggedOut'));
    window.location.href = '/login';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={18} className="text-yellow-400" />;
      case 'processing': return <Package size={18} className="text-blue-400" />;
      case 'shipped': return <Truck size={18} className="text-purple-400" />;
      case 'delivered': return <CheckCircle size={18} className="text-green-400" />;
      case 'cancelled': return <XCircle size={18} className="text-red-400" />;
      default: return <Package size={18} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: 'var(--color-primary)'}}></div>
          <p style={{color: 'white'}}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
              My Account
            </h1>
            <p className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
              Welcome back, {user.name}!
            </p>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 md:p-3 rounded-lg border"
            style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}
          >
            <Menu size={20} className="md:w-6 md:h-6" style={{color: 'var(--color-accent)'}} />
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-auto
              p-6 rounded-none lg:rounded-xl border backdrop-blur-sm lg:sticky lg:top-24
              transform transition-transform duration-300 ease-in-out z-50 lg:z-auto
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `} style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              {/* Close Button - Mobile Only */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5"
              >
                <X size={24} style={{color: 'var(--color-accent)'}} />
              </button>

              {/* User Info */}
              <div className="mb-6 pb-6 border-b" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{backgroundColor: 'var(--color-primary)'}}>
                  <User size={32} style={{color: 'white'}} />
                </div>
                <h3 className="font-semibold mb-1" style={{color: 'white'}}>{user.name}</h3>
                <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'orders' ? 'bg-pink-500/10 text-pink-400' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <Package size={20} />
                  <span className="font-medium">My Orders</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === 'profile' ? 'bg-pink-500/10 text-pink-400' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <User size={20} />
                  <span className="font-medium">Profile</span>
                </button>
                
                <Link
                  href="/wishlist"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-400 hover:bg-white/5"
                >
                  <Heart size={20} />
                  <span className="font-medium">Wishlist</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-red-400 hover:bg-red-500/10 mt-4"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Total Orders</p>
                    <p className="text-2xl md:text-3xl font-bold" style={{color: 'white'}}>{orders.length}</p>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Pending</p>
                    <p className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {orders.filter(o => o.status === 'pending').length}
                    </p>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Shipped</p>
                    <p className="text-2xl md:text-3xl font-bold text-purple-400">
                      {orders.filter(o => o.status === 'shipped').length}
                    </p>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    <p className="text-xs md:text-sm mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Delivered</p>
                    <p className="text-2xl md:text-3xl font-bold text-green-400">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>

                {/* Orders List */}
                <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <h2 className="text-xl md:text-2xl font-bold" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
                      Order History
                    </h2>
                    <button
                      onClick={() => user && fetchUserOrders(user)}
                      className="px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all border"
                      style={{borderColor: 'var(--color-accent)', color: 'var(--color-accent)'}}
                    >
                      Refresh
                    </button>
                  </div>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <ShoppingBag size={48} className="md:w-16 md:h-16 mx-auto mb-3 md:mb-4" style={{color: 'rgba(255, 255, 255, 0.2)'}} />
                      <p className="text-base md:text-lg mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                        No orders yet
                      </p>
                      <p className="text-xs md:text-sm mb-4 md:mb-6" style={{color: 'rgba(255, 255, 255, 0.4)'}}>
                        Start shopping to see your orders here
                      </p>
                      <Link
                        href="/shop"
                        className="inline-block px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all"
                        style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                      >
                        Browse Products
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="p-4 md:p-5 rounded-lg border hover:border-pink-500/50 transition-all"
                          style={{backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(212, 175, 55, 0.2)'}}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                                <p className="font-mono text-xs md:text-sm font-semibold" style={{color: 'var(--color-accent)'}}>
                                  {order.orderNumber}
                                </p>
                                <span className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                  {getStatusIcon(order.status)}
                                  <span className="hidden sm:inline">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                                </span>
                              </div>
                              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </p>
                              <p className="text-xl md:text-2xl font-bold" style={{color: 'white'}}>
                                Rs. {order.total.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Order Items Preview */}
                          <div className="flex gap-2 md:gap-3 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            {order.items.slice(0, 3).map((item: any, idx: number) => (
                              <div key={idx} className="flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg border"
                                  style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}
                                />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg border flex items-center justify-center" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                                <span className="text-xs md:text-sm font-semibold" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                            <Link
                              href={`/dashboard/orders/${order._id}`}
                              className="flex-1 text-center px-4 py-2.5 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all"
                              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
                            >
                              View Details
                            </Link>
                            {order.status === 'delivered' && (
                              <button
                                className="sm:w-auto px-4 py-2.5 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all border"
                                style={{borderColor: 'var(--color-accent)', color: 'var(--color-accent)'}}
                              >
                                Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
                  Profile Information
                </h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border text-sm md:text-base"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)', color: 'white'}}
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border text-sm md:text-base"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)', color: 'white'}}
                    />
                  </div>

                  {user.phone && (
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={user.phone}
                        readOnly
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border text-sm md:text-base"
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(212, 175, 55, 0.2)', color: 'white'}}
                      />
                    </div>
                  )}

                  <div className="pt-2 md:pt-4">
                    <p className="text-xs md:text-sm mb-3 md:mb-4" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                      Profile editing coming soon. Contact support to update your information.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all border"
                      style={{borderColor: 'var(--color-accent)', color: 'var(--color-accent)'}}
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
