'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto mb-6" style={{color: 'var(--color-accent)'}} />
          <h1 className="text-3xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Your Cart is Empty
          </h1>
          <p className="mb-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Add some beautiful items to your cart
          </p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border mb-3 md:mb-4 text-xs md:text-sm" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <span className="font-medium" style={{color: 'var(--color-accent)'}}>🛍️ Your Selection</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Shopping Cart
          </h1>
        </div>
      </section>

      <div className="min-h-screen pb-8 md:pb-12 overflow-hidden">
      <div className="container-custom overflow-hidden">

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                className="p-4 md:p-6 rounded-xl md:rounded-2xl border relative"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.6)', borderColor: 'rgba(212, 175, 55, 0.3)', zIndex: 1}}
              >
                <div className="flex gap-3 md:gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 border" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                    {item.product.images && item.product.images.length > 0 ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-2xl md:text-3xl">📷</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-semibold text-base md:text-lg mb-1 md:mb-2 hover:opacity-80 transition-opacity truncate" style={{color: 'white'}}>
                        {item.product.name}
                      </h3>
                    </Link>
                    <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p className="text-base md:text-lg font-bold" style={{color: 'var(--color-accent)'}}>
                        PKR {item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-3 md:mt-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all flex-shrink-0"
                          style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                          type="button"
                        >
                          -
                        </button>
                        <span className="text-lg md:text-xl font-semibold min-w-[32px] md:min-w-[40px] text-center" style={{color: 'white'}}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-xl font-bold hover:bg-white/10 transition-all flex-shrink-0"
                          style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="w-fit p-2 md:p-3 rounded-lg hover:bg-red-500/20 transition-all border flex-shrink-0"
                        style={{color: 'var(--color-primary)', borderColor: 'rgba(212, 175, 55, 0.3)'}}
                        type="button"
                      >
                        <Trash2 size={20} className="md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 p-4 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                Order Summary
              </h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  <span>Subtotal</span>
                  <span style={{color: 'white'}}>PKR {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                  <span>Shipping</span>
                  <span style={{color: 'white'}}>
                    {getCartTotal() >= 3000 ? 'FREE' : 'PKR 200'}
                  </span>
                </div>
                <div className="border-t pt-3 md:pt-4" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  <div className="flex justify-between text-lg md:text-xl font-bold">
                    <span style={{color: 'white'}}>Total</span>
                    <span style={{color: 'var(--color-accent)'}}>
                      PKR {(getCartTotal() + (getCartTotal() >= 3000 ? 0 : 200)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {getCartTotal() < 3000 && (
                <p className="text-xs md:text-sm mb-4 p-2.5 md:p-3 rounded-lg" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', color: 'var(--color-primary)'}}>
                  Add PKR {(3000 - getCartTotal()).toLocaleString()} more for free shipping!
                </p>
              )}

              <Link href="/checkout" className="block w-full text-center px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base min-h-[48px]" style={{backgroundColor: 'var(--color-primary)'}}>
                Proceed to Checkout
              </Link>

              <Link href="/shop" className="block w-full text-center px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold border-2 mt-3 md:mt-4 hover:bg-white/10 transition-all text-sm md:text-base min-h-[44px]" style={{color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
