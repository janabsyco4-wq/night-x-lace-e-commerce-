'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Mail, Download, Trash2, Search, Calendar } from 'lucide-react';

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    filterSubscribers();
  }, [searchQuery, subscribers]);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSubscribers = () => {
    if (!searchQuery) {
      setFilteredSubscribers(subscribers);
      return;
    }

    const filtered = subscribers.filter(sub =>
      sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubscribers(filtered);
  };

  const handleDelete = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;

    try {
      const response = await fetch(`/api/newsletter/${subscriberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Email', 'Subscribed Date', 'Status'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleDateString(),
        sub.isActive ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const copyAllEmails = () => {
    const emails = filteredSubscribers.map(sub => sub.email).join(', ');
    navigator.clipboard.writeText(emails);
    alert('All emails copied to clipboard!');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Newsletter Subscribers</h1>
            <p className="text-sm md:text-base text-gray-400 mt-1">Manage your email subscribers</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={copyAllEmails}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Mail size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Copy Emails</span>
              <span className="sm:hidden">Copy</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Download size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total Subscribers</p>
            <p className="text-xl md:text-2xl font-bold text-white">{subscribers.length}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Active</p>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {subscribers.filter(s => s.isActive).length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">This Month</p>
            <p className="text-xl md:text-2xl font-bold text-blue-400">
              {subscribers.filter(s => {
                const subDate = new Date(s.subscribedAt);
                const now = new Date();
                return subDate.getMonth() === now.getMonth() && 
                       subDate.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Subscribers Table */}
        {filteredSubscribers.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <Mail size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No subscribers found' : 'No subscribers yet'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Subscribed Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredSubscribers.map((subscriber, index) => (
                      <tr key={subscriber._id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-pink-400" />
                            <span className="text-white">{subscriber.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subscriber.isActive 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {subscriber.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(subscriber._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Remove subscriber"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredSubscribers.map((subscriber, index) => (
                <div key={subscriber._id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-gray-400 text-sm">#{index + 1}</span>
                      <Mail size={16} className="text-pink-400 flex-shrink-0" />
                      <span className="text-white text-sm truncate">{subscriber.email}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={14} />
                      {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.isActive 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {subscriber.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Box */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 md:p-4">
          <div className="flex gap-3">
            <Mail className="text-blue-400 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-white font-semibold mb-1 text-sm md:text-base">Email Marketing Tips</h3>
              <ul className="text-xs md:text-sm text-gray-300 space-y-1">
                <li>• Use "Copy Emails" to paste into your email marketing tool</li>
                <li>• Export CSV for importing into MailChimp, SendGrid, etc.</li>
                <li>• Send newsletters regularly to keep customers engaged</li>
                <li>• Always include an unsubscribe link in your emails</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
