'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, ThumbsUp, User } from 'lucide-react';

interface Review {
  _id: string;
  author: string;
  email: string;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  status: string;
  createdAt: string;
}

export default function ProductReviews() {
  const params = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [newReview, setNewReview] = useState({ 
    author: '', 
    email: '', 
    rating: 5, 
    comment: '' 
  });

  // Load liked reviews from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('likedReviews');
    if (stored) {
      setLikedReviews(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [params.slug]);

  const fetchReviews = async () => {
    try {
      // Get product ID from slug
      const productRes = await fetch(`/api/products/${params.slug}`);
      const productData = await productRes.json();
      
      if (productData.success && productData.product) {
        // Fetch approved reviews for this product
        const url = `/api/reviews?product=${productData.product._id}&status=approved`;
        console.log('Fetching reviews from:', url);
        const reviewsRes = await fetch(url);
        const reviewsData = await reviewsRes.json();
        
        console.log('Reviews response:', reviewsData);
        
        if (reviewsData.success) {
          setReviews(reviewsData.reviews);
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Get product ID from slug
      const productRes = await fetch(`/api/products/${params.slug}`);
      const productData = await productRes.json();
      
      if (!productData.success || !productData.product) {
        alert('Product not found');
        return;
      }

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productData.product._id,
          author: newReview.author,
          email: newReview.email,
          rating: newReview.rating,
          comment: newReview.comment
        })
      });

      const data = await res.json();

      if (data.success) {
        alert('Thank you for your review! It has been published.');
        setShowReviewForm(false);
        setNewReview({ author: '', email: '', rating: 5, comment: '' });
        // Refresh reviews to show the new one
        fetchReviews();
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleHelpful = (reviewId: string) => {
    const isLiked = likedReviews.has(reviewId);
    const newLikedReviews = new Set(likedReviews);
    
    if (isLiked) {
      // Unlike - remove like
      newLikedReviews.delete(reviewId);
      setReviews(reviews.map(r => 
        r._id === reviewId ? { ...r, helpful: Math.max(0, r.helpful - 1) } : r
      ));
    } else {
      // Like - add like
      newLikedReviews.add(reviewId);
      setReviews(reviews.map(r => 
        r._id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      ));
    }
    
    // Save to localStorage
    setLikedReviews(newLikedReviews);
    localStorage.setItem('likedReviews', JSON.stringify([...newLikedReviews]));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };



  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{borderColor: 'var(--color-primary)'}}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Rating Summary - Only show if there are reviews */}
      {reviews.length > 0 && (
        <div className="p-4 md:p-6 rounded-xl md:rounded-2xl border" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: 'var(--color-accent)'}}>
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
              </div>
              <div className="flex items-center gap-1 mb-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`md:w-5 md:h-5 ${i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex-1 w-full">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-2 md:gap-3 mb-2">
                    <span className="text-xs md:text-sm w-6 md:w-8" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{rating}★</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                      <div 
                        className="h-full transition-all" 
                        style={{backgroundColor: 'var(--color-accent)', width: `${percentage}%`}}
                      ></div>
                    </div>
                    <span className="text-xs md:text-sm w-8 md:w-12 text-right" style={{color: 'rgba(255, 255, 255, 0.7)'}}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="w-full mt-4 md:mt-6 py-2.5 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all"
            style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="p-4 md:p-6 rounded-xl md:rounded-2xl border" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
          <h3 className="text-lg md:text-xl font-bold mb-4" style={{color: 'white'}}>Write Your Review</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>Your Name *</label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>Your Email *</label>
              <input
                type="email"
                value={newReview.email}
                onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all"
                style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    size={28} 
                    className={`md:w-8 md:h-8 ${rating <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>Your Review *</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              rows={4}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
              style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 md:py-3 text-sm md:text-base rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="flex-1 py-2.5 md:py-3 text-sm md:text-base rounded-lg font-semibold border-2 transition-all"
              style={{borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white'}}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-bold" style={{color: 'white'}}>Customer Reviews</h3>
          {reviews.length > 0 && (
            <span className="text-sm md:text-base" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          )}
        </div>
        
        {reviews.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-xl border" style={{backgroundColor: 'rgba(26, 26, 29, 0.4)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)'}}>
              <Star size={32} className="md:w-10 md:h-10" style={{color: 'var(--color-accent)'}} />
            </div>
            <h4 className="text-lg md:text-xl font-semibold mb-2" style={{color: 'white'}}>No Reviews Yet</h4>
            <p className="text-sm md:text-base mb-4" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
              Be the first to share your experience with this product!
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="px-6 py-2.5 rounded-lg font-semibold transition-all inline-block"
              style={{backgroundColor: 'var(--color-primary)', color: 'white'}}
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div 
                key={review._id} 
                className="group p-4 md:p-6 rounded-xl border transition-all hover:shadow-lg" 
                style={{
                  backgroundColor: 'rgba(26, 26, 29, 0.6)', 
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl transition-transform group-hover:scale-105" 
                      style={{
                        backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
                        color: 'white'
                      }}
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    {review.verified && (
                      <div 
                        className="absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2"
                        style={{backgroundColor: 'var(--color-accent)', borderColor: 'rgba(26, 26, 29, 0.6)'}}
                      >
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-base md:text-lg" style={{color: 'white'}}>
                            {review.author}
                          </h4>
                          {review.verified && (
                            <span className="hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-medium" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-accent)'}}>
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={`md:w-4 md:h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs md:text-sm font-medium" style={{color: 'var(--color-accent)'}}>{review.rating}.0</span>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm whitespace-nowrap" style={{color: 'rgba(255, 255, 255, 0.4)'}}>
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {/* Verified Badge Mobile */}
                    {review.verified && (
                      <div className="sm:hidden mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium" style={{backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-accent)'}}>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified Purchase
                        </span>
                      </div>
                    )}
                    
                    {/* Review Text */}
                    <div className="mb-4">
                      <p className="text-sm md:text-base leading-relaxed" style={{color: 'rgba(255, 255, 255, 0.85)'}}>
                        "{review.comment}"
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.15)'}}>
                      <button 
                        onClick={() => handleHelpful(review._id)}
                        className="flex items-center gap-2 text-xs md:text-sm font-medium transition-all hover:scale-105 active:scale-95" 
                        style={{
                          color: likedReviews.has(review._id) ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.5)'
                        }}
                      >
                        <ThumbsUp 
                          size={14} 
                          className={`md:w-4 md:h-4 transition-all ${likedReviews.has(review._id) ? 'fill-current' : ''}`}
                        />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
