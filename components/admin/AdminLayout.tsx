'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  FolderOpen,
  Tag,
  Mail,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Star,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setCurrentTab(params.get('tab'));
    }
  }, [pathname]);

  useEffect(() => {
    // Fetch unread message count
    fetchUnreadCount();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        const unread = data.messages.filter((msg: any) => !msg.isRead).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: FolderOpen, label: 'Categories', href: '/admin/categories' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
    { icon: Star, label: 'Reviews', href: '/admin/reviews' },
    { icon: Mail, label: 'Newsletter', href: '/admin/newsletter' },
    { icon: FileText, label: 'Messages', href: '/admin/messages' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  ];

  const settingsItems = [
    { label: 'Store Info', href: '/admin/settings?tab=store' },
    { label: 'Shipping', href: '/admin/settings?tab=shipping' },
    { label: 'Banners', href: '/admin/settings?tab=banners' },
    { label: 'Logo', href: '/admin/settings?tab=logo' },
    { label: 'Password', href: '/admin/settings?tab=password' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#0f0f11'}}>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
        style={{backgroundColor: '#1a1a1d', borderRight: '1px solid rgba(212, 175, 55, 0.1)'}}
      >
        <div className="h-full flex flex-col">
          {/* Logo - Fixed */}
          <div className="sticky top-0 z-10 p-6 border-b" style={{backgroundColor: '#1a1a1d', borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              {sidebarOpen ? (
                <>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)'}}>
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <div>
                    <h2 className="font-bold" style={{color: 'white', fontSize: '16px'}}>
                      Night × Lace
                    </h2>
                    <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Admin Panel</p>
                  </div>
                </>
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto" style={{backgroundColor: 'var(--color-primary)'}}>
                  <span className="text-white font-bold text-xl">N</span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const isMessages = item.label === 'Messages';
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                      isActive ? 'shadow-lg' : 'hover:bg-white/5'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <item.icon size={20} />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    {isMessages && unreadCount > 0 && (
                      <span 
                        className="absolute top-2 right-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full"
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          fontSize: '11px'
                        }}
                      >
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Settings Section */}
              <div className="pt-2">
                <div className="flex items-center gap-3 px-4 py-2" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                  <Settings size={20} />
                  {sidebarOpen && <span className="text-xs font-semibold uppercase tracking-wider">Settings</span>}
                </div>
                {sidebarOpen && (
                  <div className="space-y-1 mt-1">
                    {settingsItems.map((item) => {
                      const tabParam = item.href.split('tab=')[1];
                      const isActive = pathname === '/admin/settings' && currentTab === tabParam;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-4 py-2 pl-12 rounded-lg transition-all text-sm ${
                            isActive ? 'shadow-lg' : 'hover:bg-white/5'
                          }`}
                          style={{
                            backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.1)'}}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all hover:bg-white/5"
              style={{color: 'rgba(255, 255, 255, 0.7)'}}
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className={`fixed top-0 right-0 z-30 border-b backdrop-blur-md transition-all duration-300 ${
          sidebarOpen ? 'left-0 lg:left-64' : 'left-0 lg:left-20'
        }`} style={{backgroundColor: 'rgba(26, 26, 29, 0.95)', borderColor: 'rgba(212, 175, 55, 0.1)', paddingRight: '17px'}}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/5 transition-all"
              >
                {sidebarOpen ? (
                  <X size={20} style={{color: 'white'}} />
                ) : (
                  <Menu size={20} style={{color: 'white'}} />
                )}
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', minWidth: '300px'}}>
                <Search size={18} style={{color: 'rgba(255, 255, 255, 0.5)'}} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none flex-1"
                  style={{color: 'white'}}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/5 transition-all">
                <Bell size={20} style={{color: 'white'}} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-accent)'}}>
                  <span className="text-sm font-bold" style={{color: 'var(--color-bg)'}}>A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium" style={{color: 'white'}}>Admin</p>
                  <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.5)'}}>Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto" style={{marginTop: '73px'}}>
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
