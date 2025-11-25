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
  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const isHomePage = pathname === '/';

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          {!isAdminRoute && !isAuthRoute && <TopBanner />}
          {!isAdminRoute && !isAuthRoute && <Header />}
          <main className={`min-h-screen ${!isAdminRoute && !isHomePage && !isAuthRoute ? 'pt-[59px] md:pt-[73px]' : ''}`}>
            {children}
          </main>
          {!isAdminRoute && !isAuthRoute && <Footer />}
          {!isAdminRoute && !isAuthRoute && <AdminShortcut />}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
