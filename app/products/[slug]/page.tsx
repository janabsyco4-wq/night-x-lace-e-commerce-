'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import ProductReviews from '@/components/products/ProductReviews';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.slug}`);
      const data = await res.json();
      if (data.success) {
        setProduct(data.product);
        // Fetch related products
        if (data.product.category) {
          fetchRelatedProducts(data.product.category._id, data.product._id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId: string, productId: string) => {
    try {
      const res = await fetch(`/api/products?category=${categoryId}`);
      const data = await res.json();
      if (data.success) {
        setRelatedProducts(data.products.filter((p: any) => p._id !== productId).slice(0, 4));
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setShowError(true);
      return;
    }
    
    if (product) {
      addToCart({
        ...product,
        id: product._id,
        image: product.images[0] || '',
        category: product.category?.name || '',
      }, selectedSize, selectedColor, quantity);
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: 'var(--color-primary)'}}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{color: 'white'}}>Product Not Found</h1>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-4 md:mb-8 flex items-center gap-2 text-xs md:text-sm overflow-x-auto" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
          <Link href="/" className="hover:opacity-80 whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:opacity-80 whitespace-nowrap">Shop</Link>
          <span>/</span>
          <span className="truncate" style={{color: 'white'}}>{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
          {/* Product Images Gallery */}
          <div className="space-y-3 md:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border backdrop-blur-sm" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              {product.images && product.images[selectedImageIndex] ? (
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-6xl md:text-8xl">📷</span>
                </div>
              )}
              {product.featured && (
                <span className="absolute top-3 left-3 md:top-4 md:left-4 text-white text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-sm shadow-lg" style={{backgroundColor: 'var(--color-primary)'}}>
                  Featured
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 md:gap-3">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-80 min-h-[44px] ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    style={{
                      backgroundColor: 'rgba(26, 26, 29, 0.8)',
                      borderColor: selectedImageIndex === index ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`star-${i}`} size={16} className={`md:w-[18px] md:h-[18px] ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.7)'}}>({product.reviewCount} reviews)</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-3 md:mb-4" style={{color: 'var(--color-accent)', fontFamily: 'var(--font-family-serif)'}}>
                PKR {product.price.toLocaleString()}
              </div>
            </div>

            <p style={{color: 'rgba(255, 255, 255, 0.8)'}} className="leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <label className="font-semibold text-sm md:text-base" style={{color: 'white'}}>Select Size</label>
                <Link 
                  href="/size-guide" 
                  className="text-xs md:text-sm font-medium hover:underline transition-colors flex items-center gap-1"
                  style={{color: 'var(--color-accent)'}}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={`size-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-2.5 rounded-lg border transition-all min-h-[44px] text-sm md:text-base"
                    style={{
                      backgroundColor: selectedSize === size ? 'var(--color-primary)' : 'transparent',
                      borderColor: selectedSize === size ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.3)',
                      color: 'white'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{color: 'white'}}>Select Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={`color-${color}`}
                    onClick={() => setSelectedColor(color)}
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: color.toLowerCase() === 'black' ? '#1A1A1D' : 
                                     color.toLowerCase() === 'white' ? '#fff' :
                                     color.toLowerCase() === 'red' ? '#FF007F' :
                                     color.toLowerCase() === 'nude' ? '#E8C4A0' :
                                     color.toLowerCase() === 'pink' ? '#FF007F' :
                                     color.toLowerCase() === 'blue' ? '#4169E1' :
                                     color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#808080' :
                                     '#ccc',
                      borderColor: selectedColor === color ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.2)',
                      borderWidth: selectedColor === color ? '3px' : '2px'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-2 md:mb-3 text-sm md:text-base" style={{color: 'white'}}>Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-lg"
                  style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                >
                  -
                </button>
                <span className="text-xl md:text-2xl font-semibold min-w-[40px] text-center" style={{color: 'white'}}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-lg border flex items-center justify-center text-lg"
                  style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {showError && (!selectedSize || !selectedColor) && (
              <div className="p-3 md:p-4 rounded-lg border animate-pulse" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', borderColor: 'var(--color-primary)', color: 'var(--color-primary)'}}>
                <p className="text-sm md:text-base font-semibold">
                  ⚠️ Please select {!selectedSize && !selectedColor ? 'size and color' : !selectedSize ? 'size' : 'color'}
                </p>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base min-h-[48px]"
                style={{backgroundColor: 'var(--color-primary)'}}
              >
                <ShoppingCart size={18} className="md:w-5 md:h-5" />
                Add to Cart
              </button>
              <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all hover:bg-white/10" style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}>
                <Heart size={18} className="md:w-5 md:h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="flex items-center justify-between gap-3 md:gap-6 pt-4 md:pt-6 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
              <div className="flex items-center gap-2">
                <Truck size={18} className="md:w-5 md:h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                <p className="text-xs md:text-sm whitespace-nowrap" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Free Shipping</p>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="md:w-5 md:h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                <p className="text-xs md:text-sm whitespace-nowrap" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Secure Payment</p>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="md:w-5 md:h-5 flex-shrink-0" style={{color: 'var(--color-accent)'}} />
                <p className="text-xs md:text-sm whitespace-nowrap" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 md:mt-16">
          <ProductReviews />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
