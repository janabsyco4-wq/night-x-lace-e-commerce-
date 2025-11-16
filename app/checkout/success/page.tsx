'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle, Package, Mail, Phone } from 'lucide-react';

export default function OrderSuccessPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('user_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <CheckCircle size={80} className="mx-auto mb-6" style={{color: 'var(--color-accent)'}} />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Order Placed Successfully!
          </h1>
          <p className="text-lg" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Thank you for shopping with Night × Lace
          </p>
        </div>
      </section>

      <div className="min-h-screen pb-12">
        <div className="container-custom max-w-3xl">
          <div className="p-8 rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-4" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
                <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>Order Confirmation</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                Your order has been received
              </h2>
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                We've sent a confirmation email with your order details.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl border" style={{backgroundColor: 'rgba(26, 26, 29, 0.5)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                <Package size={32} className="mx-auto mb-3" style={{color: 'var(--color-primary)'}} />
                <h3 className="font-semibold mb-2" style={{color: 'white'}}>Processing</h3>
                <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  Your order is being prepared
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{backgroundColor: 'rgba(26, 26, 29, 0.5)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                <Mail size={32} className="mx-auto mb-3" style={{color: 'var(--color-accent)'}} />
                <h3 className="font-semibold mb-2" style={{color: 'white'}}>Email Sent</h3>
                <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  Check your inbox for details
                </p>
              </div>

              <div className="p-6 rounded-xl border" style={{backgroundColor: 'rgba(26, 26, 29, 0.5)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                <Phone size={32} className="mx-auto mb-3" style={{color: 'var(--color-primary)'}} />
                <h3 className="font-semibold mb-2" style={{color: 'white'}}>We'll Call You</h3>
                <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  To confirm your order
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl mb-8" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
              <h3 className="font-semibold mb-2" style={{color: 'var(--color-primary)'}}>
                What's Next?
              </h3>
              <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                Our team will contact you within 24 hours to confirm your order and delivery details.
                Your order will be delivered within 3-5 business days.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all" style={{backgroundColor: 'var(--color-primary)'}}>
                    View My Orders
                  </Link>
                  <Link href="/shop" className="px-8 py-4 rounded-full font-semibold border-2 hover:bg-white/10 transition-all" style={{color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}>
                    Continue Shopping
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/shop" className="px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all" style={{backgroundColor: 'var(--color-primary)'}}>
                    Continue Shopping
                  </Link>
                  <Link href="/register" className="px-8 py-4 rounded-full font-semibold border-2 hover:bg-white/10 transition-all" style={{color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}>
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm mb-2" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
              Need help with your order?
            </p>
            <Link href="/contact" className="text-sm font-semibold hover:underline" style={{color: 'var(--color-accent)'}}>
              Contact Us: nightxlace@gmail.com | 03277492676
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
