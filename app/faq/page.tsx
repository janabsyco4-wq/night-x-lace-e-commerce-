'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I choose the right size?',
    answer: 'Please refer to our Size Guide page for detailed measurements. We recommend measuring yourself and comparing with our size chart for the best fit.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 3 days of delivery if the product has any manufacturing defects. The item must be unused and in original packaging.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days across Pakistan. We offer free shipping on orders over PKR 3000.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard encryption for all transactions. Currently, we offer Cash on Delivery for maximum security and convenience.'
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'All orders are packaged discreetly. Gift wrapping service will be available soon.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, once your order is shipped, you will receive tracking information via email and SMS.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'Currently, we accept Cash on Delivery (COD). Credit/Debit cards, JazzCash, and EasyPaisa will be available soon.'
  },
  {
    question: 'How do I care for my lingerie?',
    answer: 'Hand wash in cold water with mild detergent. Avoid bleach and tumble drying. Lay flat to dry for best results.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>❓ Help Center</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Find answers to common questions about our products and services
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border backdrop-blur-sm transition-all"
                style={{backgroundColor: 'transparent', borderColor: openIndex === index ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.3)'}}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold pr-4" style={{color: 'white'}}>
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp size={24} style={{color: 'var(--color-primary)'}} />
                  ) : (
                    <ChevronDown size={24} style={{color: 'var(--color-accent)'}} />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)', color: 'rgba(255, 255, 255, 0.8)'}}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 text-center p-8 rounded-2xl border" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Still Have Questions?
            </h2>
            <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Can't find what you're looking for? Contact our support team.
            </p>
            <a href="/contact" className="btn-primary inline-block">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
