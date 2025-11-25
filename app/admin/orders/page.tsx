'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        fetchOrders();
        if (selectedOrder?._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      case 'shipped': return 'bg-purple-500/20 text-purple-400';
      case 'delivered': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Orders Management</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">View and manage customer orders</p>
          </div>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 text-sm md:text-base bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            Refresh Orders
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Orders</p>
            <p className="text-xl md:text-2xl font-bold text-white">{orders.length}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Pending</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Processing</p>
            <p className="text-xl md:text-2xl font-bold text-blue-400">
              {orders.filter(o => o.status === 'processing').length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Shipped</p>
            <p className="text-xl md:text-2xl font-bold text-purple-400">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Delivered</p>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Filter - Mobile Dropdown / Desktop Buttons */}
        <div>
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <label className="block text-sm text-gray-400 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-pink-600 focus:outline-none"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List - Desktop Table / Mobile Cards */}
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No orders found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order #</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-sm text-white font-mono">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">{order.customer.name}</div>
                          <div className="text-xs text-gray-400">{order.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {order.items.length} items
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-white whitespace-nowrap">
                          Rs. {order.total.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-pink-400 hover:text-pink-300 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-800 rounded-lg p-4 space-y-3"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-mono text-pink-400 font-semibold">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-white font-medium">{order.customer.name}</p>
                    <p className="text-xs text-gray-400 truncate">{order.customer.email}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <div>
                      <p className="text-xs text-gray-400">{order.items.length} items</p>
                    </div>
                    <p className="text-lg font-bold text-white">
                      Rs. {order.total.toLocaleString()}
                    </p>
                  </div>

                  <button
                    className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 md:p-4">
          <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
            <div className="p-3 md:p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex items-center gap-1 md:gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-xs md:text-base">Back</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-white">Order Details</h2>
                  <p className="text-xs md:text-base text-gray-400 mt-0.5 md:mt-1">Order #{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white text-lg md:text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-3 md:p-6 space-y-3 md:space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1.5 md:mb-3">Customer Information</h3>
                <div className="bg-gray-900 p-2 md:p-4 rounded-lg space-y-1 md:space-y-2 text-xs md:text-base">
                  <p className="text-gray-300"><span className="text-gray-400">Name:</span> {selectedOrder.customer.name}</p>
                  <p className="text-gray-300 break-all"><span className="text-gray-400">Email:</span> {selectedOrder.customer.email}</p>
                  <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {selectedOrder.customer.phone}</p>
                  <p className="text-gray-300"><span className="text-gray-400">Address:</span> {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city}, {selectedOrder.customer.address.state} - {selectedOrder.customer.address.zipCode}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1.5 md:mb-3">Order Items</h3>
                <div className="space-y-2 md:space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-900 p-2 md:p-4 rounded-lg flex gap-2 md:gap-4">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-12 h-12 md:w-20 md:h-20 object-cover rounded flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs md:text-base text-white font-medium truncate">{item.name}</h4>
                        <p className="text-[10px] md:text-sm text-gray-400">Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}</p>
                        <p className="text-[10px] md:text-sm text-gray-400">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs md:text-base text-white font-semibold whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1.5 md:mb-3">Order Summary</h3>
                <div className="bg-gray-900 p-2 md:p-4 rounded-lg space-y-1 md:space-y-2 text-xs md:text-base">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span>Rs. {selectedOrder.shippingCost.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>
                        Discount {selectedOrder.couponCode && `(${selectedOrder.couponCode})`}:
                      </span>
                      <span>- Rs. {selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white font-semibold text-sm md:text-lg pt-1 md:pt-2 border-t border-gray-700">
                    <span>Total:</span>
                    <span>Rs. {selectedOrder.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 pt-1 md:pt-2">
                    <span>Payment Method:</span>
                    <span className="uppercase">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1.5 md:mb-3">Update Order Status</h3>
                <div className="flex gap-1.5 md:gap-2 flex-wrap">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder._id, status)}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg capitalize transition-colors text-xs md:text-base ${
                        selectedOrder.status === status
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {status}
                    </button>
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
