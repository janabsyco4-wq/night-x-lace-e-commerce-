'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Mail, Search, Calendar, User, Phone, MessageSquare, Check, X } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [searchQuery, filterStatus, messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = [...messages];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus === 'read') {
      filtered = filtered.filter(msg => msg.isRead);
    } else if (filterStatus === 'unread') {
      filtered = filtered.filter(msg => !msg.isRead);
    }

    setFilteredMessages(filtered);
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const markAsRead = async (messageId: string) => {
    // Update UI immediately
    setMessages(messages.map(msg => 
      msg._id === messageId ? { ...msg, isRead: true } : msg
    ));

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) {
        // Revert on error
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      // Revert on error
      fetchMessages();
    }
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
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">View and manage customer inquiries</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Total</p>
            <p className="text-xl md:text-2xl font-bold text-white">{messages.length}</p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Unread</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400">
              {messages.filter(m => !m.isRead).length}
            </p>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded-lg">
            <p className="text-gray-400 text-xs md:text-sm">Read</p>
            <p className="text-xl md:text-2xl font-bold text-green-400">
              {messages.filter(m => !m.isRead).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 p-3 md:p-4 rounded-lg space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`flex-1 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg capitalize transition-colors ${
                    filterStatus === status
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No messages found' : 'No messages yet'}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Mark Read</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredMessages.map((message) => (
                      <tr 
                        key={message._id} 
                        className={`hover:bg-gray-700/50 cursor-pointer ${!message.isRead ? 'bg-gray-700/30' : ''}`}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.isRead) {
                            markAsRead(message._id);
                          }
                        }}
                      >
                        <td className="px-6 py-4">
                          {message.isRead ? (
                            <Check size={20} className="text-green-400" />
                          ) : (
                            <Mail size={20} className="text-yellow-400" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            <div>
                              <p className="text-white font-medium">{message.name}</p>
                              <p className="text-xs text-gray-400">{message.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white truncate max-w-xs">{message.subject}</p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">{message.message}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div 
                            className="flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={message.isRead}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (!message.isRead) {
                                  markAsRead(message._id);
                                }
                              }}
                              className="w-5 h-5 rounded cursor-pointer accent-green-500"
                              style={{
                                accentColor: '#22c55e',
                                cursor: 'pointer'
                              }}
                              title={message.isRead ? "Already marked as read" : "Mark as read"}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(message._id);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete message"
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className={`bg-gray-800 rounded-lg p-4 space-y-3 ${!message.isRead ? 'border-l-4 border-yellow-400' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) {
                      markAsRead(message._id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {message.isRead ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Mail size={18} className="text-yellow-400" />
                      )}
                      <span className={`text-xs font-medium ${message.isRead ? 'text-green-400' : 'text-yellow-400'}`}>
                        {message.isRead ? 'Read' : 'Unread'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={message.isRead}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (!message.isRead) {
                              markAsRead(message._id);
                            }
                          }}
                          className="w-5 h-5 rounded cursor-pointer accent-green-500"
                          style={{
                            accentColor: '#22c55e',
                            cursor: 'pointer'
                          }}
                          title={message.isRead ? "Already marked as read" : "Mark as read"}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message._id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-semibold">{message.name}</p>
                    <p className="text-xs text-gray-400 truncate">{message.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-white font-medium">{message.subject}</p>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">{message.message}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={14} />
                      {new Date(message.createdAt).toLocaleDateString()}
                    </div>
                    <button className="text-sm text-pink-400 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm md:text-base">Back</span>
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    {selectedMessage.isRead ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Read</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Unread</span>
                    )}
                    <span className="text-xs md:text-sm text-gray-400">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Sender Info */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User size={16} className="text-gray-400" />
                    <span className="font-medium">{selectedMessage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${selectedMessage.email}`} className="text-pink-400 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone size={16} className="text-gray-400" />
                      <a href={`tel:${selectedMessage.phone}`} className="text-pink-400 hover:underline">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Message</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-center"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage._id);
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
