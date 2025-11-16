export default function TermsPage() {
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
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>📋 Legal Information</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Last updated: November 15, 2025
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
            
            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>1. Acceptance of Terms</h2>
              <p>By accessing and using Night × Lace website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>2. Products and Pricing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Pakistani Rupees (PKR)</li>
                <li>Prices are subject to change without notice</li>
                <li>Product images are for illustration purposes and may vary slightly from actual products</li>
                <li>We reserve the right to limit quantities and refuse service</li>
                <li>Product availability is subject to stock</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>3. Orders and Payment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Payment is due at the time of delivery (Cash on Delivery)</li>
                <li>You must provide accurate and complete information when placing an order</li>
                <li>Order confirmation will be sent via email and SMS</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>4. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery takes 3-5 business days across Pakistan</li>
                <li>Free shipping on orders over PKR 3000</li>
                <li>Delivery charges apply for orders under PKR 3000</li>
                <li>We are not responsible for delays caused by courier services</li>
                <li>All packages are delivered discreetly</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>5. Returns and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Returns accepted within 3 days of delivery for manufacturing defects only</li>
                <li>Items must be unused, unwashed, and in original packaging</li>
                <li>Hygiene products cannot be returned once opened</li>
                <li>Refunds will be processed within 7-10 business days</li>
                <li>Customer is responsible for return shipping costs unless item is defective</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>6. Privacy and Confidentiality</h2>
              <p>We respect your privacy and handle all orders with complete discretion. Please refer to our Privacy Policy for detailed information on how we collect and use your data.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>7. Intellectual Property</h2>
              <p>All content on this website, including images, text, logos, and designs, is the property of Night × Lace and protected by copyright laws. Unauthorized use is prohibited.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>8. Limitation of Liability</h2>
              <p>Night × Lace shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>9. Contact Information</h2>
              <p className="mb-3">For questions about these Terms & Conditions:</p>
              <ul className="space-y-2">
                <li>Email: nightxlace@gmail.com</li>
                <li>Phone: 03277492676</li>
                <li>Address: Garden Town, Okara, Pakistan</li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
