'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package, Download } from 'lucide-react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');
  const [analytics, setAnalytics] = useState<any>({
    revenue: { current: 0, previous: 0, change: 0 },
    orders: { current: 0, previous: 0, change: 0 },
    customers: { current: 0, previous: 0, change: 0 },
    avgOrderValue: { current: 0, previous: 0, change: 0 },
    dailySales: [],
    topProducts: [],
    topCategories: [],
    recentOrders: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();

      if (ordersData.success) {
        const orders = ordersData.orders || [];

        // Calculate date ranges
        const now = new Date();
        const daysAgo = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
        const currentPeriodStart = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        const previousPeriodStart = new Date(currentPeriodStart.getTime() - daysAgo * 24 * 60 * 60 * 1000);

        // Filter orders by period
        const currentOrders = orders.filter((o: any) => new Date(o.createdAt) >= currentPeriodStart);
        const previousOrders = orders.filter((o: any) => 
          new Date(o.createdAt) >= previousPeriodStart && new Date(o.createdAt) < currentPeriodStart
        );

        // Calculate metrics
        const currentRevenue = currentOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0);
        const previousRevenue = previousOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0);
        const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100) : 0;

        const currentCustomers = new Set(currentOrders.map((o: any) => o.customer.email)).size;
        const previousCustomers = new Set(previousOrders.map((o: any) => o.customer.email)).size;
        const customersChange = previousCustomers > 0 ? ((currentCustomers - previousCustomers) / previousCustomers * 100) : 0;

        const avgOrderValue = currentOrders.length > 0 ? currentRevenue / currentOrders.length : 0;
        const prevAvgOrderValue = previousOrders.length > 0 ? previousRevenue / previousOrders.length : 0;
        const avgOrderChange = prevAvgOrderValue > 0 ? ((avgOrderValue - prevAvgOrderValue) / prevAvgOrderValue * 100) : 0;

        // Daily sales for chart
        const dailySales = [];
        for (let i = daysAgo - 1; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const dayStart = new Date(date.setHours(0, 0, 0, 0));
          const dayEnd = new Date(date.setHours(23, 59, 59, 999));
          
          const dayOrders = currentOrders.filter((o: any) => {
            const orderDate = new Date(o.createdAt);
            return orderDate >= dayStart && orderDate <= dayEnd;
          });
          
          dailySales.push({
            date: dayStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: dayOrders.reduce((sum: number, o: any) => sum + (Number(o.total) || 0), 0),
            orders: dayOrders.length
          });
        }

        // Top products
        const productSales: any = {};
        currentOrders.forEach((order: any) => {
          order.items.forEach((item: any) => {
            const productKey = item.product?.toString() || item.name;
            if (!productSales[productKey]) {
              productSales[productKey] = { 
                name: item.name, 
                revenue: 0, 
                quantity: 0,
                image: item.image,
                productId: item.product
              };
            }
            productSales[productKey].revenue += (Number(item.price) || 0) * (Number(item.quantity) || 0);
            productSales[productKey].quantity += (Number(item.quantity) || 0);
          });
        });

        const topProducts = Object.values(productSales)
          .sort((a: any, b: any) => b.revenue - a.revenue)
          .slice(0, 5);

        // Top categories
        const categorySales: any = {};
        currentOrders.forEach((order: any) => {
          order.items.forEach((item: any) => {
            // Handle category - it could be a string, an object with name, or undefined
            let categoryName = 'Uncategorized';
            if (item.category) {
              if (typeof item.category === 'string') {
                categoryName = item.category;
              } else if (item.category.name) {
                categoryName = item.category.name;
              } else if (item.category.slug) {
                categoryName = item.category.slug;
              }
            }
            
            const categoryKey = categoryName.toLowerCase();
            if (!categorySales[categoryKey]) {
              categorySales[categoryKey] = { 
                name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                revenue: 0, 
                orderCount: 0,
                itemCount: 0
              };
            }
            categorySales[categoryKey].revenue += (Number(item.price) || 0) * (Number(item.quantity) || 0);
            categorySales[categoryKey].itemCount += (Number(item.quantity) || 0);
          });
        });

        // Count unique orders per category
        currentOrders.forEach((order: any) => {
          const categoriesInOrder = new Set();
          order.items.forEach((item: any) => {
            let categoryName = 'Uncategorized';
            if (item.category) {
              if (typeof item.category === 'string') {
                categoryName = item.category;
              } else if (item.category.name) {
                categoryName = item.category.name;
              } else if (item.category.slug) {
                categoryName = item.category.slug;
              }
            }
            categoriesInOrder.add(categoryName.toLowerCase());
          });
          categoriesInOrder.forEach((cat: any) => {
            if (categorySales[cat]) {
              categorySales[cat].orderCount += 1;
            }
          });
        });

        const topCategories = Object.values(categorySales)
          .sort((a: any, b: any) => b.revenue - a.revenue)
          .slice(0, 5);

        setAnalytics({
          revenue: { current: currentRevenue, previous: previousRevenue, change: revenueChange },
          orders: { current: currentOrders.length, previous: previousOrders.length, change: previousOrders.length > 0 ? ((currentOrders.length - previousOrders.length) / previousOrders.length * 100) : 0 },
          customers: { current: currentCustomers, previous: previousCustomers, change: customersChange },
          avgOrderValue: { current: avgOrderValue, previous: prevAvgOrderValue, change: avgOrderChange },
          dailySales,
          topProducts,
          topCategories,
          recentOrders: currentOrders.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...analytics.dailySales.map((d: any) => d.revenue), 1);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics & Reports</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">Track your store performance</p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-sm md:text-base bg-gray-800 border border-gray-700 rounded-lg text-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
              <Download size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {/* Revenue */}
          <div className="bg-gray-800 p-3 md:p-4 lg:p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign size={20} className="md:w-6 md:h-6 text-green-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${analytics.revenue.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {analytics.revenue.change >= 0 ? <TrendingUp size={14} className="md:w-4 md:h-4" /> : <TrendingDown size={14} className="md:w-4 md:h-4" />}
                <span>{Math.abs(analytics.revenue.change).toFixed(1)}%</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 truncate">
              Rs. {(analytics.revenue.current || 0).toLocaleString()}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">Total Revenue</p>
          </div>

          {/* Orders */}
          <div className="bg-gray-800 p-3 md:p-4 lg:p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-pink-500/20 flex items-center justify-center">
                <ShoppingBag size={20} className="md:w-6 md:h-6 text-pink-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${analytics.orders.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {analytics.orders.change >= 0 ? <TrendingUp size={14} className="md:w-4 md:h-4" /> : <TrendingDown size={14} className="md:w-4 md:h-4" />}
                <span>{Math.abs(analytics.orders.change).toFixed(1)}%</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">
              {analytics.orders.current}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">Total Orders</p>
          </div>

          {/* Customers */}
          <div className="bg-gray-800 p-3 md:p-4 lg:p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users size={20} className="md:w-6 md:h-6 text-blue-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${analytics.customers.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {analytics.customers.change >= 0 ? <TrendingUp size={14} className="md:w-4 md:h-4" /> : <TrendingDown size={14} className="md:w-4 md:h-4" />}
                <span>{Math.abs(analytics.customers.change).toFixed(1)}%</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1">
              {analytics.customers.current}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">Customers</p>
          </div>

          {/* Avg Order Value */}
          <div className="bg-gray-800 p-3 md:p-4 lg:p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Package size={20} className="md:w-6 md:h-6 text-purple-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${analytics.avgOrderValue.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {analytics.avgOrderValue.change >= 0 ? <TrendingUp size={14} className="md:w-4 md:h-4" /> : <TrendingDown size={14} className="md:w-4 md:h-4" />}
                <span>{Math.abs(analytics.avgOrderValue.change).toFixed(1)}%</span>
              </div>
            </div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 truncate">
              Rs. {(analytics.avgOrderValue.current || 0).toLocaleString()}
            </h3>
            <p className="text-xs md:text-sm text-gray-400">Avg Order Value</p>
          </div>
        </div>

        {/* Charts Row - Hidden on Mobile */}
        <div className="hidden md:grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Revenue Chart */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Revenue Overview</h3>
            <div className="h-48 md:h-64">
              {analytics.dailySales.length > 0 ? (
                <div className="h-full flex items-end justify-between gap-1 md:gap-2">
                  {analytics.dailySales.map((day: any, index: number) => {
                    const height = maxRevenue > 0 ? (day.revenue / maxRevenue * 100) : 0;
                    return (
                      <div key={`day-${index}`} className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                        <div className="w-full flex flex-col justify-end h-[120px] md:h-[200px]">
                          <div
                            className="w-full bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                            style={{ height: `${height}%`, minHeight: day.revenue > 0 ? '4px' : '0' }}
                            title={`Rs. ${day.revenue.toLocaleString()}`}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Rs. {day.revenue.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-400 rotate-0 truncate w-full text-center">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Orders Chart */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Orders Overview</h3>
            <div className="h-48 md:h-64">
              {analytics.dailySales.length > 0 ? (
                <div className="h-full flex items-end justify-between gap-1 md:gap-2">
                  {analytics.dailySales.map((day: any, index: number) => {
                    const maxOrders = Math.max(...analytics.dailySales.map((d: any) => d.orders), 1);
                    const height = (day.orders / maxOrders * 100);
                    return (
                      <div key={`order-${index}`} className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                        <div className="w-full flex flex-col justify-end h-[120px] md:h-[200px]">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                            style={{ height: `${height}%`, minHeight: day.orders > 0 ? '4px' : '0' }}
                            title={`${day.orders} orders`}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              {day.orders}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-400 truncate w-full text-center">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Products Only */}
        <div className="max-w-3xl">
          {/* Top Products */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 md:mb-6">Top Selling Products</h3>
            <div className="space-y-3 md:space-y-4">
              {analytics.topProducts.length > 0 ? (
                analytics.topProducts.map((product: any, index: number) => (
                  <div key={`product-${index}`} className="flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg bg-gray-900 hover:bg-gray-900/70 transition-colors">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-400 font-bold text-xs md:text-sm">{index + 1}</span>
                    </div>
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate text-sm md:text-base">{product.name}</p>
                      <p className="text-xs md:text-sm text-gray-400">{product.quantity} units sold</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-green-400 text-sm md:text-base">
                        Rs. {product.revenue.toLocaleString()}
                      </p>
                      <p className="text-[10px] md:text-xs text-gray-500">
                        Rs. {(product.revenue / product.quantity).toFixed(0)} avg
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8 text-sm">No sales data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
