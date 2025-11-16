export default function PrivacyPolicyPage() {
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
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>🔒 Your Privacy Matters</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Privacy Policy
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
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>1. Information We Collect</h2>
              <div className="space-y-3">
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, phone number, and delivery address</li>
                  <li>Order history and purchase information</li>
                  <li>Communication preferences</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>2. How We Use Your Information</h2>
              <div className="space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and deliveries</li>
                  <li>Send you promotional materials (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </div>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>3. Information Sharing</h2>
              <p className="mb-3">We do not sell or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors to handle transactions</li>
                <li>Service providers who assist in our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information. All orders are packaged and delivered with complete discretion to protect your privacy.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>6. Cookies</h2>
              <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookies through your browser settings.</p>
            </section>

            <section className="p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl font-bold mb-4" style={{color: 'white'}}>7. Contact Us</h2>
              <p className="mb-3">If you have any questions about this Privacy Policy, please contact us:</p>
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
