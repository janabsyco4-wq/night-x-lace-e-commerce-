'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Ahmed',
    location: 'Karachi',
    rating: 5,
    text: 'Absolutely love the quality! The fabric is so soft and comfortable. Best lingerie I\'ve ever purchased.',
    image: '👩',
  },
  {
    name: 'Ayesha Khan',
    location: 'Lahore',
    rating: 5,
    text: 'Fast delivery and beautiful packaging. The products exceeded my expectations. Highly recommend!',
    image: '👩‍🦰',
  },
  {
    name: 'Fatima Ali',
    location: 'Islamabad',
    rating: 5,
    text: 'Finally found a brand that understands quality and comfort. The fit is perfect and the designs are gorgeous.',
    image: '👱‍♀️',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md border mb-4" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>⭐ Customer Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Loved by Thousands
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            See what our customers are saying about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.2)'}}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-base mb-6 leading-relaxed" style={{color: 'rgba(255, 255, 255, 0.9)'}}>
                "{testimonial.text}"
              </p>

              {/* Customer info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold" style={{color: 'white'}}>{testimonial.name}</p>
                  <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.6)'}}>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--color-accent)'}}>10K+</p>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--color-accent)'}}>4.9</p>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--color-accent)'}}>98%</p>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2" style={{color: 'var(--color-accent)'}}>24/7</p>
            <p className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
