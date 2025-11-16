'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndFetchOrder();
  }, []);

  const checkAuthAndFetchOrder = async () => {
    const token = localStorage.getItem('user_token');
    if (!token) {
      router.push('/login');
      return;
    }

    await fetchOrder();
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Pending' };
      case 'processing':
        return { icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/20', label: 'Processing' };
      case 'shipped':
        return { icon: Truck, color: 'text-purple-400', bg: 'bg-purple-500/20', label: 'Shipped' };
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20', label: 'Delivered' };
      default:
        return { icon: Package, color: 'text-gray-400', bg: 'bg-gray-500/20', label: status };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#0f0f11'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderColor: 'var(--color-primary)'}}></div>
          <p style={{color: 'white'}}>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen py-8 md:py-12" style={{backgroundColor: '#0f0f11'}}>
      <div className="container-custom max-w-5xl">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-lg transition-all hover:bg-white/5 text-sm md:text-base"
          style={{color: 'rgba(255, 255, 255, 0.7)'}}
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{color: 'white', fontFamily: 'var(--font-family-serif)'}}>
            Order Details
          </h1>
          <p className="font-mono text-sm md:text-base" style={{color: 'var(--color-accent)'}}>
            {order.orderNumber}
          </p>
        </div>

        {/* Status Card */}
        <div className={`p-4 md:p-6 rounded-xl border mb-4 md:mb-6 ${statusInfo.bg}`} style={{borderColor: statusInfo.color}}>
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${statusInfo.bg}`}>
              <StatusIcon size={24} className={`md:w-8 md:h-8 ${statusInfo.color}`} />
            </div>
            <div>
              <p className="text-xs md:text-sm mb-1" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Order Status</p>
              <p className={`text-xl md:text-2xl font-bold ${statusInfo.color}`}>{statusInfo.label}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{color: 'white'}}>Order Items</h2>
              <div className="space-y-3 md:space-y-4">
                {order.items.map((item: any, index: number) => (
                  <div key={`item-${index}`} className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 text-sm md:text-base truncate" style={{color: 'white'}}>{item.name}</h3>
                      <p className="text-xs md:text-sm mb-1 md:mb-2" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                        Qty: {item.quantity || 0} × Rs. {(item.price || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm md:text-base" style={{color: 'white'}}>
                        Rs. {((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{color: 'white'}}>Delivery Address</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="md:w-5 md:h-5" style={{color: 'var(--color-accent)'}} />
                  <div className="text-sm md:text-base">
                    <p style={{color: 'white'}}>{order.customer.address.street}</p>
                    <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                      {order.customer.address.city}, {order.customer.address.state}
                    </p>
                    <p style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                      {order.customer.address.zipCode}, {order.customer.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{color: 'white'}}>Order Summary</h2>
              <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex justify-between" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  <span>Subtotal</span>
                  <span>Rs. {order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  <span>Shipping</span>
                  <span>Rs. {order.shippingCost.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                    <span>- Rs. {order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 md:pt-3 border-t flex justify-between text-lg md:text-xl font-bold" style={{borderColor: 'rgba(212, 175, 55, 0.2)', color: 'white'}}>
                  <span>Total</span>
                  <span>Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{color: 'white'}}>Contact Info</h2>
              <div className="space-y-2 md:space-y-3 text-sm md:text-base">
                <div className="flex items-center gap-2 md:gap-3">
                  <Mail size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                  <span className="break-all" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Phone size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                  <span style={{color: 'rgba(255, 255, 255, 0.7)'}}>{order.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="p-4 md:p-6 rounded-xl border backdrop-blur-sm" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4" style={{color: 'white'}}>Order Info</h2>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex items-center gap-2 md:gap-3">
                  <Calendar size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                  <div>
                    <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Order Date</p>
                    <p style={{color: 'white'}}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <Package size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                  <div>
                    <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>Payment Method</p>
                    <p className="uppercase" style={{color: 'white'}}>{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 md:space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all border"
                style={{borderColor: 'var(--color-accent)', color: 'var(--color-accent)'}}
              >
                Print Invoice
              </button>
              <Link
                href="/contact"
                className="block w-full px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all text-center"
                style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white'}}
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
