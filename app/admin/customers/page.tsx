'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, DollarSign, X } from 'lucide-react';

interface Customer {
  email: string;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  totalOrders: number;
  totalSpent: number;
  firstOrderDate: string;
  lastOrderDate: string;
  orders: any[];
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchQuery, customers]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (data.success) {
        // Group orders by customer email
        const customerMap = new Map<string, Customer>();
        
        data.orders.forEach((order: any) => {
          const email = order.customer.email;
          
          if (!customerMap.has(email)) {
            customerMap.set(email, {
              email: email,
              name: order.customer.name,
              phone: order.customer.phone,
              address: order.customer.address,
              totalOrders: 0,
              totalSpent: 0,
              firstOrderDate: order.createdAt,
              lastOrderDate: order.createdAt,
              orders: []
            });
          }
          
          const customer = customerMap.get(email)!;
          customer.totalOrders++;
          customer.totalSpent += order.total;
          customer.orders.push(order);
          
          // Update first and last order dates
          if (new Date(order.createdAt) < new Date(customer.firstOrderDate)) {
            customer.firstOrderDate = order.createdAt;
          }
          if (new Date(order.createdAt) > new Date(customer.lastOrderDate)) {
            customer.lastOrderDate = order.createdAt;
          }
        });
        
        const customersArray = Array.from(customerMap.values());
        // Sort by total spent (highest first)
        customersArray.sort((a, b) => b.totalSpent - a.totalSpent);
        
        setCustomers(customersArray);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    if (!searchQuery) {
      setFilteredCustomers(customers);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.phone.includes(query)
    );
    setFilteredCustomers(filtered);
  };

  const getCustomerType = (totalSpent: number) => {
    if (totalSpent >= 10000) return { label: 'VIP', color: 'bg-yellow-500/20 text-yellow-400' };
    if (totalSpent >= 5000) return { label: 'Premium', color: 'bg-purple-500/20 text-purple-400' };
    if (totalSpent >= 2000) return { label: 'Regular', color: 'bg-blue-500/20 text-blue-400' };
    return { label: 'New', color: 'bg-green-500/20 text-green-400' };
  };

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
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Customers</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">View and manage your customers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Customers</p>
            <p className="text-xl md:text-2xl font-bold text-white">{customers.length}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">VIP Customers</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400">
              {customers.filter(c => c.totalSpent >= 10000).length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Revenue</p>
            <p className="text-lg md:text-2xl font-bold text-green-400">
              Rs. {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Avg Order Value</p>
            <p className="text-lg md:text-2xl font-bold text-blue-400">
              Rs. {customers.length > 0 
                ? Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                  customers.reduce((sum, c) => sum + c.totalOrders, 0)).toLocaleString()
                : 0}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Customers List - Desktop Table / Mobile Cards */}
        {filteredCustomers.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Users size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No customers found' : 'No customers yet'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredCustomers.map((customer) => {
                      const customerType = getCustomerType(customer.totalSpent);
                      return (
                        <tr key={customer.email} className="hover:bg-gray-700/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                                {customer.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-white font-medium">{customer.name}</p>
                                <p className="text-sm text-gray-400">{customer.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Phone size={14} className="text-gray-400" />
                                {customer.phone}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <MapPin size={14} className="text-gray-400" />
                                {customer.address.city}, {customer.address.state}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <ShoppingBag size={16} className="text-pink-400" />
                              <span className="text-white font-semibold">{customer.totalOrders}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-green-400" />
                              <span className="text-white font-semibold">Rs. {customer.totalSpent.toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${customerType.color}`}>
                              {customerType.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedCustomer(customer)}
                              className="text-pink-400 hover:text-pink-300 text-sm font-medium"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredCustomers.map((customer) => {
                const customerType = getCustomerType(customer.totalSpent);
                return (
                  <div
                    key={customer.email}
                    className="bg-gray-800 rounded-lg p-4 space-y-3"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{customer.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[180px]">{customer.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${customerType.color}`}>
                        {customerType.label}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone size={14} className="text-gray-400" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={14} />
                        {customer.address.city}, {customer.address.state}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-400">Orders</p>
                          <p className="text-white font-semibold">{customer.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Total Spent</p>
                          <p className="text-green-400 font-semibold">Rs. {customer.totalSpent.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 flex items-start md:items-center justify-center z-50 p-0 md:p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-none md:rounded-lg max-w-4xl w-full min-h-screen md:min-h-0 md:my-8">
            <div className="sticky top-0 z-10 bg-gray-800 p-4 md:p-6 border-b border-gray-700">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-lg md:text-2xl flex-shrink-0">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-2xl font-bold text-white truncate">{selectedCustomer.name}</h2>
                    <p className="text-sm md:text-base text-gray-400 truncate">{selectedCustomer.email}</p>
                    <span className={`inline-block mt-1 md:mt-2 px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                      getCustomerType(selectedCustomer.totalSpent).color
                    }`}>
                      {getCustomerType(selectedCustomer.totalSpent).label} Customer
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-gray-400 hover:text-white flex-shrink-0"
                >
                  <X size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm md:text-base text-gray-300 break-all">
                      <Mail size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="break-all">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm md:text-base text-gray-300">
                      <Phone size={14} className="text-gray-400 flex-shrink-0" />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-start gap-2 text-sm md:text-base text-gray-300">
                      <MapPin size={14} className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        {selectedCustomer.address.street}<br />
                        {selectedCustomer.address.city}, {selectedCustomer.address.state}<br />
                        {selectedCustomer.address.zipCode}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-3">Purchase Summary</h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-400">Total Orders:</span>
                      <span className="text-white font-semibold">{selectedCustomer.totalOrders}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-400">Total Spent:</span>
                      <span className="text-green-400 font-semibold">Rs. {selectedCustomer.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-400">Avg Order Value:</span>
                      <span className="text-blue-400 font-semibold">
                        Rs. {Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-400">First Order:</span>
                      <span className="text-gray-300 text-right">
                        {new Date(selectedCustomer.firstOrderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-400">Last Order:</span>
                      <span className="text-gray-300 text-right">
                        {new Date(selectedCustomer.lastOrderDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">Order History</h3>
                <div className="space-y-2 md:space-y-3">
                  {selectedCustomer.orders.map((order) => (
                    <div key={order._id} className="bg-gray-900 p-3 md:p-4 rounded-lg">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-mono text-xs md:text-sm truncate">{order.orderNumber}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm md:text-base text-white font-semibold">Rs. {order.total.toLocaleString()}</p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                            order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-400">
                        {order.items.length} items • {order.paymentMethod.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
