import Link from 'next/link';
import { categories } from '@/data/categories';

export default function Categories() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Shop by Category
          </h2>
          <p style={{color: 'rgba(255, 255, 255, 0.7)'}}>
            Explore our complete range of intimate wear
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="rounded-lg p-6 text-center hover:shadow-2xl transition-all border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all hover:scale-110" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)'}}>
                  <span className="text-2xl">👗</span>
                </div>
                <h3 className="font-semibold transition-colors group-hover:text-primary" style={{color: 'white'}}>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
