import { Heart, Award, Shield, Users } from 'lucide-react';

export default function AboutPage() {
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
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>✨ Our Story</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            About Night × Lace
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Unlock Your Midnight Desire
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom max-w-4xl">
          {/* Story Section */}
          <div className="mb-16 p-8 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
            <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Our Story
            </h2>
            <div className="space-y-4" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              <p>
                Night × Lace was born from a passion to empower women through elegant, comfortable, and high-quality intimate wear. 
                We believe that every woman deserves to feel confident and beautiful in her own skin.
              </p>
              <p>
                Our carefully curated collection combines sophistication with comfort, offering premium lingerie that celebrates 
                femininity in all its forms. From everyday essentials to special occasion pieces, we provide intimate wear that 
                makes you feel extraordinary.
              </p>
              <p>
                Based in Pakistan, we're committed to delivering exceptional quality and service to women across the country, 
                making luxury intimate wear accessible to all.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Heart size={40} className="mb-4" style={{color: 'var(--color-primary)'}} />
              <h3 className="text-xl font-bold mb-3" style={{color: 'white'}}>Quality First</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                We source only the finest materials and work with trusted manufacturers to ensure every piece meets our high standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Shield size={40} className="mb-4" style={{color: 'var(--color-accent)'}} />
              <h3 className="text-xl font-bold mb-3" style={{color: 'white'}}>Privacy & Discretion</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Your privacy matters. All orders are packaged discreetly and delivered with complete confidentiality.
              </p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Award size={40} className="mb-4" style={{color: 'var(--color-primary)'}} />
              <h3 className="text-xl font-bold mb-3" style={{color: 'white'}}>Premium Selection</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Carefully curated collections featuring the latest styles and timeless classics in intimate wear.
              </p>
            </div>

            <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <Users size={40} className="mb-4" style={{color: 'var(--color-accent)'}} />
              <h3 className="text-xl font-bold mb-3" style={{color: 'white'}}>Customer Care</h3>
              <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Our dedicated team is here to help you find the perfect fit and answer any questions you may have.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-8 rounded-2xl border" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Have Questions?
            </h2>
            <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              We'd love to hear from you. Get in touch with our team.
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
