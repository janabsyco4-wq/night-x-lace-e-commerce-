'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Shield, X } from 'lucide-react';

export default function AdminShortcut() {
  const [showAdminLink, setShowAdminLink] = useState(false);
  const keyPressesRef = useRef<number[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key && e.key.toLowerCase() === 'a') {
        const now = Date.now();
        const recentPresses = [...keyPressesRef.current, now].filter(time => now - time < 1000);
        keyPressesRef.current = recentPresses;

        if (recentPresses.length >= 3) {
          setShowAdminLink(true);
          keyPressesRef.current = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!showAdminLink) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="p-4 rounded-2xl border shadow-2xl backdrop-blur-md" style={{backgroundColor: 'rgba(26, 26, 29, 0.95)', borderColor: 'var(--color-accent)'}}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield size={20} style={{color: 'var(--color-accent)'}} />
            <span className="font-semibold" style={{color: 'white'}}>Admin Access</span>
          </div>
          <button
            onClick={() => setShowAdminLink(false)}
            className="p-1 rounded-full hover:bg-white/10 transition-all"
          >
            <X size={16} style={{color: 'rgba(255, 255, 255, 0.7)'}} />
          </button>
        </div>
        <Link
          href="/admin/login"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)'}}
        >
          <Shield size={18} />
          Admin Login
        </Link>
      </div>
    </div>
  );
}
