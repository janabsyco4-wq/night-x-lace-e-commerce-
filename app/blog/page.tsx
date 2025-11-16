import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Finding Your Perfect Bra Size',
    excerpt: 'Discover the secrets to finding a bra that fits perfectly and provides all-day comfort.',
    image: '📏',
    category: 'Size Guide',
    date: 'Nov 10, 2025',
    author: 'Night × Lace Team',
    slug: 'perfect-bra-size-guide'
  },
  {
    id: 2,
    title: 'How to Care for Your Lingerie: Tips for Longevity',
    excerpt: 'Learn the best practices for washing and storing your intimate wear to make it last longer.',
    image: '🧺',
    category: 'Care Tips',
    date: 'Nov 8, 2025',
    author: 'Night × Lace Team',
    slug: 'lingerie-care-tips'
  },
  {
    id: 3,
    title: 'Top 5 Lingerie Trends for 2025',
    excerpt: 'Stay ahead of the curve with the latest styles and colors in intimate fashion.',
    image: '✨',
    category: 'Fashion',
    date: 'Nov 5, 2025',
    author: 'Night × Lace Team',
    slug: 'lingerie-trends-2025'
  },
  {
    id: 4,
    title: 'Choosing the Right Fabric: Comfort vs Style',
    excerpt: 'Understanding different lingerie fabrics and which ones work best for your lifestyle.',
    image: '🧵',
    category: 'Materials',
    date: 'Nov 1, 2025',
    author: 'Night × Lace Team',
    slug: 'lingerie-fabric-guide'
  },
  {
    id: 5,
    title: 'Building Your Lingerie Wardrobe: Essentials Every Woman Needs',
    excerpt: 'From everyday basics to special occasion pieces, here are the must-haves.',
    image: '👗',
    category: 'Style Guide',
    date: 'Oct 28, 2025',
    author: 'Night × Lace Team',
    slug: 'lingerie-wardrobe-essentials'
  },
  {
    id: 6,
    title: 'Confidence Boost: How the Right Lingerie Changes Everything',
    excerpt: 'Explore the psychology behind feeling confident in beautiful intimate wear.',
    image: '💪',
    category: 'Lifestyle',
    date: 'Oct 25, 2025',
    author: 'Night × Lace Team',
    slug: 'lingerie-confidence-boost'
  }
];

export default function BlogPage() {
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
            <span className="text-sm font-medium" style={{color: 'var(--color-accent)'}}>📝 Style & Care</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Blog & Style Guide
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Tips, trends, and expert advice for intimate wear
          </p>
        </div>
      </section>

      <div className="pb-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <article 
                key={post.id}
                className="group rounded-2xl overflow-hidden border backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
                style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}
              >
                <div className="aspect-video flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                  {post.image}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)', color: 'var(--color-primary)'}}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                      <Calendar size={12} />
                      {post.date}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-opacity-80 transition-colors" style={{color: 'white'}}>
                    {post.title}
                  </h2>
                  
                  <p className="text-sm mb-4" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
                    <div className="flex items-center gap-2 text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                      <User size={14} />
                      {post.author}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                      style={{color: 'var(--color-accent)'}}
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 rounded-2xl border" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)'}}>
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              Have Questions?
            </h2>
            <p className="mb-6" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Can't find what you're looking for? Check our FAQ or contact us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/faq" className="btn-primary inline-block">
                View FAQ
              </Link>
              <Link href="/contact" className="px-8 py-4 rounded-full font-semibold border-2 hover:bg-white/10 transition-all" style={{color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
