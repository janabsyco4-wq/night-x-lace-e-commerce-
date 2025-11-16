'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    email: 'info@nightxlace.com',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan',
  });

  useEffect(() => {
    // Fetch settings on mount
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings({
            email: data.settings.email,
            phone: data.settings.phone,
            address: data.settings.address,
          });
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (loading) return;
    
    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md border mb-4 md:mb-6" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <span className="text-xs md:text-sm font-medium" style={{color: 'var(--color-accent)'}}>💬 Get in Touch</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Contact Us
          </h1>
          <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            We're here to help with any questions or concerns
          </p>
        </div>
      </section>

      <div className="pb-8 md:pb-12">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            {/* Contact Info Cards */}
            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                <Phone size={20} className="md:w-7 md:h-7" style={{color: 'var(--color-primary)'}} />
              </div>
              <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2" style={{color: 'white'}}>Phone</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{settings.phone}</p>
            </div>

            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm text-center" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)'}}>
                <Mail size={20} className="md:w-7 md:h-7" style={{color: 'var(--color-accent)'}} />
              </div>
              <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2" style={{color: 'white'}}>Email</h3>
              <p className="text-xs md:text-sm break-all" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{settings.email}</p>
            </div>

            <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm text-center sm:col-span-3 lg:col-span-1" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                <MapPin size={20} className="md:w-7 md:h-7" style={{color: 'var(--color-primary)'}} />
              </div>
              <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2" style={{color: 'white'}}>Location</h3>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{settings.address}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                Send Us a Message
              </h2>

              {submitted && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg text-center text-sm md:text-base" style={{backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent)'}}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2" style={{color: 'white'}}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2" style={{color: 'white'}}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2" style={{color: 'white'}}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                      placeholder="03XX XXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2" style={{color: 'white'}}>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1.5 md:mb-2" style={{color: 'white'}}>Message *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{backgroundColor: 'var(--color-primary)'}}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="md:w-5 md:h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
