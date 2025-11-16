import { Package, Truck, Clock, Shield } from 'lucide-react';

export default function ShippingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>📦 Delivery Information</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Shipping & Returns
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Fast, discreet delivery across Pakistan
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom max-w-6xl">
          
          {/* Shipping Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Truck size={40} className="mx-auto mb-4" style={{color: 'var(--color-primary)'}} />
              <h3 className="font-bold mb-2" style={{color: 'white'}}>Free Shipping</h3>
              <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>On orders over PKR 3000</p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Clock size={40} className="mx-auto mb-4" style={{color: 'var(--color-accent)'}} />
              <h3 className="font-bold mb-2" style={{color: 'white'}}>Fast Delivery</h3>
              <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>3-5 business days</p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Shield size={40} className="mx-auto mb-4" style={{color: 'var(--color-primary)'}} />
              <h3 className="font-bold mb-2" style={{color: 'white'}}>Discreet Packaging</h3>
              <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Complete privacy</p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Package size={40} className="mx-auto mb-4" style={{color: 'var(--color-accent)'}} />
              <h3 className="font-bold mb-2" style={{color: 'white'}}>Order Tracking</h3>
              <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Track your package</p>
            </div>
          </div>

          {/* Shipping Policy */}
          <div className="mb-12 p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Shipping Policy
            </h2>
            <div className="space-y-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Delivery Time</h3>
                <p>Standard delivery takes 3-5 business days across Pakistan. Orders are processed within 24 hours of confirmation.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Shipping Charges</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>FREE shipping on orders over PKR 3000</li>
                  <li>PKR 200 flat rate for orders under PKR 3000</li>
                  <li>Remote areas may incur additional charges</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Order Tracking</h3>
                <p>Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package in real-time.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Discreet Packaging</h3>
                <p>All orders are packaged in plain, unmarked boxes with no indication of contents. Your privacy is our priority.</p>
              </div>
            </div>
          </div>

          {/* Returns Policy */}
          <div className="mb-12 p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Returns & Refunds
            </h2>
            <div className="space-y-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Return Window</h3>
                <p>We accept returns within 3 days of delivery for manufacturing defects only.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Return Conditions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Items must be unused, unwashed, and unworn</li>
                  <li>Original packaging and tags must be intact</li>
                  <li>Hygiene seal must not be broken</li>
                  <li>Proof of purchase required</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Non-Returnable Items</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Items with broken hygiene seals</li>
                  <li>Used or washed products</li>
                  <li>Sale or clearance items</li>
                  <li>Gift cards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>Refund Process</h3>
                <p>Once we receive and inspect your return, we'll process your refund within 7-10 business days. Refunds will be issued to the original payment method.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3" style={{color: 'white'}}>How to Return</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact us at nightxlace@gmail.com or 03277492676</li>
                  <li>Provide your order number and reason for return</li>
                  <li>Pack the item securely in original packaging</li>
                  <li>Ship to our return address (provided via email)</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-8 rounded-2xl border" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Questions About Shipping?
            </h2>
            <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Our customer service team is here to help
            </p>
            <a href="/contact" className="btn-primary inline-block">
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
