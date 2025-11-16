'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminShortcut from '@/components/layout/AdminShortcut';
import ScrollToTop from '@/components/ScrollToTop';
import TopBanner from '@/components/home/TopBanner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          {!isAdminRoute && <TopBanner />}
          {!isAdminRoute && <Header />}
          <main className={`min-h-screen ${!isAdminRoute ? 'pt-[140px] md:pt-[150px]' : ''}`}>
            {children}
          </main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <AdminShortcut />}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
