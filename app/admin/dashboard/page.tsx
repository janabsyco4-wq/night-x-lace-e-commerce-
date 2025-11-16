'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHero from '@/components/admin/AdminHero';
import { 
  ArrowUpRight,
  ShoppingCart,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    activeCoupons: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch orders
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      
      // Fetch products (with high limit to get all products for count)
      const productsRes = await fetch('/api/admin/products?limit=1000');
      const productsData = await productsRes.json();

      // Fetch coupons
      const couponsRes = await fetch('/api/admin/coupons');
      const couponsData = await couponsRes.json();

      if (ordersData.success && productsData.success) {
        const orders = ordersData.orders || [];
        const products = productsData.products || [];
        const coupons = couponsData.coupons || [];

        // Calculate stats
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0);
        const uniqueCustomers = new Set(orders.map((order: any) => order.customer.email)).size;
        const activeCoupons = coupons.filter((c: any) => c.active).length;

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalCustomers: uniqueCustomers,
          totalProducts: products.length,
          activeCoupons,
        });

        // Get recent orders (last 5)
        setRecentOrders(orders.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#0f0f11'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: 'var(--color-primary)'}}></div>
          <p style={{color: 'white'}}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Admin Hero Section */}
        <AdminHero stats={stats} />

        {/* Recent Orders */}
        <div className="p-4 md:p-6 rounded-xl border" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold" style={{color: 'white'}}>Recent Orders</h3>
            <button 
              onClick={() => router.push('/admin/orders')}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium hover:underline" 
              style={{color: 'var(--color-accent)'}}
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ArrowUpRight size={14} className="md:w-4 md:h-4" />
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <div className="py-8 md:py-12 text-center" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              <ShoppingCart size={40} className="md:w-12 md:h-12 mx-auto mb-3" style={{color: 'rgba(255, 255, 255, 0.2)'}} />
              <p className="text-sm md:text-base">No orders yet</p>
              <p className="text-xs md:text-sm mt-2">Orders will appear here once customers start purchasing</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Items</th>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Status</th>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Total</th>
                      <th className="text-left py-3 px-4 font-medium text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order: any) => (
                      <tr key={order._id} className="border-b hover:bg-white/5 transition-all cursor-pointer" style={{borderColor: 'rgba(212, 175, 55, 0.05)'}} onClick={() => router.push(`/admin/orders`)}>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm" style={{color: 'var(--color-accent)'}}>{order.orderNumber}</span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-sm" style={{color: 'white'}}>{order.customer.name}</p>
                          <p className="text-xs truncate max-w-[150px]" style={{color: 'rgba(255, 255, 255, 0.5)'}}>{order.customer.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="max-w-[200px]">
                            {order.items.slice(0, 2).map((item: any, idx: number) => (
                              <p key={idx} className="text-xs truncate" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                                {item.name} <span style={{color: 'var(--color-accent)'}}>×{item.quantity}</span>
                              </p>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                                +{order.items.length - 2} more
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-sm whitespace-nowrap" style={{color: 'white'}}>Rs. {order.total.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm whitespace-nowrap" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                            {new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {recentOrders.map((order: any) => (
                  <div
                    key={order._id}
                    className="p-3 rounded-lg border hover:border-pink-500/50 transition-all cursor-pointer"
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(212, 175, 55, 0.2)'}}
                    onClick={() => router.push(`/admin/orders`)}
                  >
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs font-semibold mb-1" style={{color: 'var(--color-accent)'}}>
                          {order.orderNumber}
                        </p>
                        <p className="text-xs font-medium truncate" style={{color: 'white'}}>{order.customer.name}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="mb-2 pb-2 border-b" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}>
                      {order.items.slice(0, 2).map((item: any, idx: number) => (
                        <p key={idx} className="text-xs truncate" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                          {item.name} <span style={{color: 'var(--color-accent)'}}>×{item.quantity}</span>
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                          +{order.items.length - 2} more items
                        </p>
                      )}
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs mb-0.5" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <p className="text-base font-bold" style={{color: 'white'}}>
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>


      </div>
    </AdminLayout>
  );
}
