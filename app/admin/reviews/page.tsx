'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Star, Trash2, User, CheckCircle, XCircle } from 'lucide-react';

interface Review {
  _id: string;
  product: {
    _id: string;
    name: string;
    images: string[];
  };
  author: string;
  rating: number;
  createdAt: string;
  comment: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      if (data.success) {
        setReviews(reviews.filter(review => review._id !== id));
        alert('Review deleted successfully');
      } else {
        alert(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const handleApproveReview = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });

      const data = await res.json();

      if (data.success) {
        setReviews(reviews.map(review => 
          review._id === id ? { ...review, status: 'approved' as const } : review
        ));
      } else {
        alert(data.message || 'Failed to approve review');
        // Refresh reviews if review not found
        if (res.status === 404) {
          fetchReviews();
        }
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Failed to approve review');
    }
  };

  const handleRejectReview = async (id: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });

      const data = await res.json();

      if (data.success) {
        setReviews(reviews.map(review => 
          review._id === id ? { ...review, status: 'rejected' as const } : review
        ));
      } else {
        alert(data.message || 'Failed to reject review');
        // Refresh reviews if review not found
        if (res.status === 404) {
          fetchReviews();
        }
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
      alert('Failed to reject review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesSearch = review.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    avgRating: reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: 'var(--color-primary)'}}></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'white' }}>
            Reviews Management
          </h1>
          <p className="text-sm md:text-base" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage and moderate customer reviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          <div className="p-4 md:p-6 rounded-xl border" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Reviews</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: 'white' }}>{stats.total}</p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Approved</p>
            <p className="text-xl md:text-2xl font-bold text-green-500">{stats.approved}</p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Pending</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Rejected</p>
            <p className="text-xl md:text-2xl font-bold text-red-500">{stats.rejected}</p>
          </div>
          <div className="p-4 md:p-6 rounded-xl border col-span-2 lg:col-span-1" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
            <p className="text-xs md:text-sm mb-1 md:mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Avg Rating</p>
            <div className="flex items-center gap-2">
              <p className="text-xl md:text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{stats.avgRating}</p>
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2"
            style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)', color: 'white' }}
          />
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'approved', 'pending', 'rejected'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm rounded-lg font-medium transition-all whitespace-nowrap"
                style={{
                  backgroundColor: filterStatus === status ? 'var(--color-primary)' : 'rgba(26, 26, 29, 0.8)',
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  color: 'white',
                  border: '1px solid'
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List - Desktop Table */}
        <div className="hidden md:block rounded-xl border overflow-hidden" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.3)' }}>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Product</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Customer</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Rating</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Review</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Status</th>
                  <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review._id} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={review.product?.images?.[0] || '/placeholder.png'} 
                          alt={review.product?.name || 'Product'} 
                          className="w-12 h-12 rounded-lg object-cover" 
                        />
                        <span className="text-sm" style={{ color: 'white' }}>{review.product?.name || 'Unknown Product'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'white' }}>{review.author}</p>
                        <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{formatDate(review.createdAt)}</p>
                        {review.verified && (
                          <span className="text-xs px-2 py-0.5 rounded-full inline-block mt-1" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent)' }}>
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm line-clamp-2 max-w-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{review.comment}</p>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        review.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        review.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {review.status !== 'approved' && (
                          <button
                            onClick={() => handleApproveReview(review._id)}
                            className="p-2 rounded-lg transition-all hover:bg-green-500/20"
                            title="Approve"
                          >
                            <CheckCircle size={18} className="text-green-500" />
                          </button>
                        )}
                        {review.status !== 'rejected' && (
                          <button
                            onClick={() => handleRejectReview(review._id)}
                            className="p-2 rounded-lg transition-all hover:bg-red-500/20"
                            title="Reject"
                          >
                            <XCircle size={18} className="text-red-500" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="p-2 rounded-lg transition-all hover:bg-red-500/20"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews List - Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredReviews.map((review) => (
            <div key={review._id} className="p-4 rounded-xl border" style={{ backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.3)' }}>
              {/* Product Info */}
              <div className="flex items-start gap-3 mb-3">
                <img 
                  src={review.product?.images?.[0] || '/placeholder.png'} 
                  alt={review.product?.name || 'Product'} 
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold mb-1 truncate" style={{ color: 'white' }}>{review.product?.name || 'Unknown Product'}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                    ))}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block ${
                    review.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                    review.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 0, 127, 0.2)' }}>
                  <User size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'white' }}>{review.author}</p>
                  <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{formatDate(review.createdAt)}</p>
                </div>
                {review.verified && (
                  <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: 'var(--color-accent)' }}>
                    ✓ Verified
                  </span>
                )}
              </div>

              {/* Review Comment */}
              <p className="text-sm mb-3 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{review.comment}</p>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                {review.status !== 'approved' && (
                  <button
                    onClick={() => handleApproveReview(review._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all bg-green-500/20 text-green-500"
                  >
                    <CheckCircle size={14} />
                    Approve
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button
                    onClick={() => handleRejectReview(review._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all bg-yellow-500/20 text-yellow-500"
                  >
                    <XCircle size={14} />
                    Reject
                  </button>
                )}
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all bg-red-500/20 text-red-500"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>No reviews found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
