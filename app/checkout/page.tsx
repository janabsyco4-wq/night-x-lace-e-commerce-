'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { CreditCard, Truck, Lock, Tag, X } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    area: '',
    address: '',
    zipCode: '',
    addressType: 'home',
    paymentMethod: 'cod',
  });
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userToken = localStorage.getItem('user_token');
    setIsLoggedIn(!!userToken);
  }, []);

  // Pre-fill form for logged-in users
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{color: 'white'}}>Your cart is empty</h1>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Check if user is logged in
    const userToken = localStorage.getItem('user_token');
    if (!userToken) {
      setCouponError('Please login to use coupon codes');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode,
          orderTotal: getCartTotal(),
          userToken: userToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAppliedCoupon(data.coupon);
        setCouponError('');
      } else {
        if (data.requiresLogin) {
          setCouponError('Please login to use coupon codes. Click here to login.');
        } else {
          setCouponError(data.message);
        }
        setAppliedCoupon(null);
      }
    } catch (error) {
      setCouponError('Failed to apply coupon');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal() || 0;
    const shippingCost = subtotal >= 3000 ? 0 : 200;
    const couponDiscount = appliedCoupon ? (appliedCoupon.discount || 0) : 0;
    
    const total = subtotal + shippingCost - couponDiscount;
    return Math.max(0, total); // Ensure total is never negative
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const shippingCost = getCartTotal() >= 3000 ? 0 : 200;
      
      // Check if user is logged in
      const userData = localStorage.getItem('user');
      const userId = userData ? JSON.parse(userData).id : null;
      
      const orderData = {
        userId: userId, // Add userId if logged in
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.province,
            zipCode: formData.zipCode,
            country: 'Pakistan',
          },
        },
        items: cart.map(item => ({
          product: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.product.images?.[0] || '',
          category: item.product.category,
        })),
        subtotal: getCartTotal(),
        shippingCost,
        discount: appliedCoupon ? appliedCoupon.discount : 0,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        total: calculateTotal(),
        paymentMethod: formData.paymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push('/checkout/success');
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const shippingCost = getCartTotal() >= 3000 ? 0 : 200;
  const total = getCartTotal() + shippingCost;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-6 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)'}}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)'}}></div>
        </div>
        
        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border mb-2 md:mb-4" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'var(--color-accent)'}}>
            <Lock size={14} className="md:w-4 md:h-4" style={{color: 'var(--color-accent)'}} />
            <span className="text-xs md:text-sm font-medium" style={{color: 'var(--color-accent)'}}>Secure Checkout</span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-bold" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
            Checkout
          </h1>
        </div>
      </section>

      <div className="min-h-screen pb-6 md:pb-12">
        <div className="container-custom">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-3 md:space-y-6">
                {/* Payment Method */}
                <div className="p-3 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
                    <CreditCard size={20} className="md:w-6 md:h-6" style={{color: 'var(--color-accent)'}} />
                    <h2 className="text-lg md:text-2xl font-bold" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    {/* Cash on Delivery */}
                    <label className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="p-2 md:p-4 rounded-lg md:rounded-xl border-2 text-center transition-all peer-checked:border-4 hover:bg-white/5" style={{borderColor: formData.paymentMethod === 'cod' ? 'var(--color-primary)' : 'rgba(212, 175, 55, 0.3)'}}>
                        <div className="text-2xl md:text-3xl mb-1 md:mb-2">💵</div>
                        <div className="font-semibold text-xs md:text-sm mb-0.5 md:mb-1" style={{color: 'white'}}>Cash on Delivery</div>
                        <div className="text-[10px] md:text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Pay on delivery</div>
                      </div>
                      {formData.paymentMethod === 'cod' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)'}}>
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </label>

                    {/* Credit/Debit Card */}
                    <label className="relative cursor-not-allowed opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        disabled
                        className="peer sr-only"
                      />
                      <div className="p-4 rounded-xl border-2 text-center transition-all" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                        <div className="text-3xl mb-2">💳</div>
                        <div className="font-semibold text-sm mb-1" style={{color: 'white'}}>Card Payment</div>
                        <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Coming Soon</div>
                      </div>
                    </label>

                    {/* JazzCash/EasyPaisa */}
                    <label className="relative cursor-not-allowed opacity-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="jazzcash"
                        disabled
                        className="peer sr-only"
                      />
                      <div className="p-4 rounded-xl border-2 text-center transition-all" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                        <div className="text-3xl mb-2">📱</div>
                        <div className="font-semibold text-sm mb-1" style={{color: 'white'}}>JazzCash/EasyPaisa</div>
                        <div className="text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>Coming Soon</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="p-6 rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  <div className="flex items-center gap-3 mb-6">
                    <Truck size={24} style={{color: 'var(--color-accent)'}} />
                    <h2 className="text-2xl font-bold" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                      Shipping Information
                    </h2>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2" style={{color: 'white'}}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                          style={{
                            backgroundColor: 'rgba(26, 26, 29, 0.8)',
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: 'white'
                          }}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2" style={{color: 'white'}}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all text-sm md:text-base"
                          style={{
                            backgroundColor: 'rgba(26, 26, 29, 0.8)',
                            borderColor: 'rgba(212, 175, 55, 0.3)',
                            color: 'white'
                          }}
                          placeholder="03XX XXXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2" style={{color: 'white'}}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: 'rgba(26, 26, 29, 0.8)',
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                          color: 'white'
                        }}
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Address Details */}
                    <div className="pt-4 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                      <h3 className="font-semibold mb-4" style={{color: 'white'}}>Address Details</h3>
                      
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                              Province *
                            </label>
                            <select
                              name="province"
                              required
                              value={formData.province}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                              style={{
                                backgroundColor: 'rgba(26, 26, 29, 0.8)',
                                borderColor: 'rgba(212, 175, 55, 0.3)',
                                color: 'white'
                              }}
                            >
                              <option value="">Select Province</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Sindh">Sindh</option>
                              <option value="KPK">Khyber Pakhtunkhwa</option>
                              <option value="Balochistan">Balochistan</option>
                              <option value="Islamabad">Islamabad Capital Territory</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                              City *
                            </label>
                            <select
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                              style={{
                                backgroundColor: 'rgba(26, 26, 29, 0.8)',
                                borderColor: 'rgba(212, 175, 55, 0.3)',
                                color: 'white'
                              }}
                            >
                              <option value="">Select City</option>
                              <optgroup label="Punjab">
                                <option value="Lahore">Lahore</option>
                                <option value="Faisalabad">Faisalabad</option>
                                <option value="Rawalpindi">Rawalpindi</option>
                                <option value="Multan">Multan</option>
                                <option value="Gujranwala">Gujranwala</option>
                                <option value="Sialkot">Sialkot</option>
                                <option value="Bahawalpur">Bahawalpur</option>
                                <option value="Sargodha">Sargodha</option>
                                <option value="Sheikhupura">Sheikhupura</option>
                                <option value="Jhang">Jhang</option>
                                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                                <option value="Gujrat">Gujrat</option>
                                <option value="Kasur">Kasur</option>
                                <option value="Sahiwal">Sahiwal</option>
                                <option value="Okara">Okara</option>
                                <option value="Wah Cantt">Wah Cantt</option>
                                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                                <option value="Chiniot">Chiniot</option>
                                <option value="Kamoke">Kamoke</option>
                                <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                                <option value="Jhelum">Jhelum</option>
                                <option value="Sadiqabad">Sadiqabad</option>
                                <option value="Khanewal">Khanewal</option>
                                <option value="Hafizabad">Hafizabad</option>
                                <option value="Muzaffargarh">Muzaffargarh</option>
                                <option value="Khanpur">Khanpur</option>
                                <option value="Gojra">Gojra</option>
                                <option value="Mandi Burewala">Mandi Burewala</option>
                                <option value="Toba Tek Singh">Toba Tek Singh</option>
                                <option value="Muridke">Muridke</option>
                                <option value="Khushab">Khushab</option>
                                <option value="Pakpattan">Pakpattan</option>
                                <option value="Jaranwala">Jaranwala</option>
                                <option value="Chishtian">Chishtian</option>
                                <option value="Daska">Daska</option>
                                <option value="Mianwali">Mianwali</option>
                                <option value="Ahmadpur East">Ahmadpur East</option>
                                <option value="Kamalia">Kamalia</option>
                                <option value="Vihari">Vihari</option>
                                <option value="Wazirabad">Wazirabad</option>
                                <option value="Layyah">Layyah</option>
                                <option value="Chakwal">Chakwal</option>
                                <option value="Attock">Attock</option>
                                <option value="Kharian">Kharian</option>
                                <option value="Narowal">Narowal</option>
                                <option value="Lodhran">Lodhran</option>
                                <option value="Rajanpur">Rajanpur</option>
                                <option value="Bahawalnagar">Bahawalnagar</option>
                                <option value="Sambrial">Sambrial</option>
                                <option value="Pattoki">Pattoki</option>
                                <option value="Hasilpur">Hasilpur</option>
                                <option value="Taxila">Taxila</option>
                              </optgroup>
                              <optgroup label="Sindh">
                                <option value="Karachi">Karachi</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Sukkur">Sukkur</option>
                                <option value="Larkana">Larkana</option>
                                <option value="Nawabshah">Nawabshah</option>
                                <option value="Mirpur Khas">Mirpur Khas</option>
                                <option value="Jacobabad">Jacobabad</option>
                                <option value="Shikarpur">Shikarpur</option>
                                <option value="Khairpur">Khairpur</option>
                                <option value="Dadu">Dadu</option>
                                <option value="Umerkot">Umerkot</option>
                                <option value="Tando Allahyar">Tando Allahyar</option>
                                <option value="Tando Adam">Tando Adam</option>
                                <option value="Sanghar">Sanghar</option>
                                <option value="Badin">Badin</option>
                                <option value="Thatta">Thatta</option>
                                <option value="Matiari">Matiari</option>
                                <option value="Ghotki">Ghotki</option>
                                <option value="Kandhkot">Kandhkot</option>
                                <option value="Kashmore">Kashmore</option>
                                <option value="Naushahro Feroze">Naushahro Feroze</option>
                                <option value="Shahdadpur">Shahdadpur</option>
                                <option value="Sakrand">Sakrand</option>
                                <option value="Kotri">Kotri</option>
                                <option value="Jamshoro">Jamshoro</option>
                                <option value="Sehwan">Sehwan</option>
                                <option value="Ratodero">Ratodero</option>
                                <option value="Kambar">Kambar</option>
                                <option value="Shahdadkot">Shahdadkot</option>
                                <option value="Mithi">Mithi</option>
                              </optgroup>
                              <optgroup label="Khyber Pakhtunkhwa">
                                <option value="Peshawar">Peshawar</option>
                                <option value="Mardan">Mardan</option>
                                <option value="Abbottabad">Abbottabad</option>
                                <option value="Mingora">Mingora</option>
                                <option value="Kohat">Kohat</option>
                                <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                                <option value="Swabi">Swabi</option>
                                <option value="Mansehra">Mansehra</option>
                                <option value="Bannu">Bannu</option>
                                <option value="Charsadda">Charsadda</option>
                                <option value="Nowshera">Nowshera</option>
                                <option value="Haripur">Haripur</option>
                                <option value="Swat">Swat</option>
                                <option value="Karak">Karak</option>
                                <option value="Hangu">Hangu</option>
                                <option value="Lakki Marwat">Lakki Marwat</option>
                                <option value="Tank">Tank</option>
                                <option value="Timergara">Timergara</option>
                                <option value="Chitral">Chitral</option>
                                <option value="Batkhela">Batkhela</option>
                                <option value="Parachinar">Parachinar</option>
                                <option value="Alpuri">Alpuri</option>
                                <option value="Daggar">Daggar</option>
                                <option value="Saidu Sharif">Saidu Sharif</option>
                                <option value="Havelian">Havelian</option>
                              </optgroup>
                              <optgroup label="Balochistan">
                                <option value="Quetta">Quetta</option>
                                <option value="Turbat">Turbat</option>
                                <option value="Khuzdar">Khuzdar</option>
                                <option value="Hub">Hub</option>
                                <option value="Chaman">Chaman</option>
                                <option value="Gwadar">Gwadar</option>
                                <option value="Sibi">Sibi</option>
                                <option value="Zhob">Zhob</option>
                                <option value="Loralai">Loralai</option>
                                <option value="Pishin">Pishin</option>
                                <option value="Dera Murad Jamali">Dera Murad Jamali</option>
                                <option value="Dera Allah Yar">Dera Allah Yar</option>
                                <option value="Jaffarabad">Jaffarabad</option>
                                <option value="Nasirabad">Nasirabad</option>
                                <option value="Kalat">Kalat</option>
                                <option value="Mastung">Mastung</option>
                                <option value="Kharan">Kharan</option>
                                <option value="Ormara">Ormara</option>
                                <option value="Pasni">Pasni</option>
                                <option value="Uthal">Uthal</option>
                                <option value="Bela">Bela</option>
                                <option value="Duki">Duki</option>
                                <option value="Kohlu">Kohlu</option>
                              </optgroup>
                              <optgroup label="Islamabad Capital Territory">
                                <option value="Islamabad">Islamabad</option>
                              </optgroup>
                              <optgroup label="Azad Kashmir">
                                <option value="Muzaffarabad">Muzaffarabad</option>
                                <option value="Mirpur">Mirpur</option>
                                <option value="Rawalakot">Rawalakot</option>
                                <option value="Kotli">Kotli</option>
                                <option value="Bhimber">Bhimber</option>
                                <option value="Bagh">Bagh</option>
                                <option value="Palandri">Palandri</option>
                                <option value="Dadyal">Dadyal</option>
                                <option value="Hattian Bala">Hattian Bala</option>
                                <option value="Athmuqam">Athmuqam</option>
                                <option value="Hajira">Hajira</option>
                                <option value="Forward Kahuta">Forward Kahuta</option>
                              </optgroup>
                              <optgroup label="Gilgit-Baltistan">
                                <option value="Gilgit">Gilgit</option>
                                <option value="Skardu">Skardu</option>
                                <option value="Hunza">Hunza</option>
                                <option value="Chilas">Chilas</option>
                                <option value="Ghanche">Ghanche</option>
                                <option value="Ghizer">Ghizer</option>
                                <option value="Nagar">Nagar</option>
                                <option value="Astore">Astore</option>
                                <option value="Khaplu">Khaplu</option>
                                <option value="Shigar">Shigar</option>
                              </optgroup>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                            Area / Locality *
                          </label>
                          <input
                            type="text"
                            name="area"
                            required
                            value={formData.area}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: 'rgba(26, 26, 29, 0.8)',
                              borderColor: 'rgba(212, 175, 55, 0.3)',
                              color: 'white'
                            }}
                            placeholder="e.g., Garden Town, DHA, Gulberg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                            Complete Address *
                          </label>
                          <textarea
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                            style={{
                              backgroundColor: 'rgba(26, 26, 29, 0.8)',
                              borderColor: 'rgba(212, 175, 55, 0.3)',
                              color: 'white'
                            }}
                            placeholder="House/Flat No., Building Name, Street Name, Landmark"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                            Postal Code (Optional)
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                            style={{
                              backgroundColor: 'rgba(26, 26, 29, 0.8)',
                              borderColor: 'rgba(212, 175, 55, 0.3)',
                              color: 'white'
                            }}
                            placeholder="e.g., 54000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{color: 'white'}}>
                            Address Type
                          </label>
                          <div className="flex gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="addressType"
                                value="home"
                                checked={formData.addressType === 'home'}
                                onChange={handleChange}
                                className="accent-pink-500"
                              />
                              <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>🏠 Home</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="addressType"
                                value="office"
                                checked={formData.addressType === 'office'}
                                onChange={handleChange}
                                className="accent-pink-500"
                              />
                              <span style={{color: 'rgba(255, 255, 255, 0.8)'}}>🏢 Office</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-3 md:p-6 rounded-xl md:rounded-2xl border backdrop-blur-sm" style={{backgroundColor: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                  <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-6" style={{fontFamily: 'var(--font-family-serif)', color: 'white'}}>
                    Order Summary
                  </h2>

                  <div className="space-y-2 md:space-y-4 mb-3 md:mb-6">
                    {cart.map((item, index) => (
                      <div key={`${item.product.id}-${index}`} className="flex gap-2 md:gap-3">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 border" style={{backgroundColor: 'rgba(26, 26, 29, 0.8)', borderColor: 'rgba(212, 175, 55, 0.2)'}}>
                          {item.product.images?.[0] ? (
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <span className="text-xl md:text-2xl">📷</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-xs md:text-sm" style={{color: 'white'}}>{item.product.name}</h3>
                          <p className="text-[10px] md:text-xs" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                            {item.size} • {item.color} • Qty: {item.quantity}
                          </p>
                          <p className="text-xs md:text-sm font-bold" style={{color: 'var(--color-accent)'}}>
                            PKR {(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Section */}
                  <div className="mb-3 md:mb-6 pt-3 md:pt-6 border-t" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Tag size={16} className="md:w-[18px] md:h-[18px]" style={{color: 'var(--color-accent)'}} />
                      <span className="font-semibold text-sm md:text-base" style={{color: 'white'}}>Have a Coupon?</span>
                      {!isLoggedIn && (
                        <span className="text-xs px-2 py-1 rounded" style={{backgroundColor: 'rgba(255, 0, 127, 0.2)', color: 'var(--color-primary)'}}>
                          Login Required
                        </span>
                      )}
                    </div>
                    
                    {!isLoggedIn ? (
                      <div className="p-4 rounded-lg" style={{backgroundColor: 'rgba(255, 0, 127, 0.1)', border: '1px solid rgba(255, 0, 127, 0.3)'}}>
                        <p className="text-sm mb-2" style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                          🔒 Please <Link href="/login" className="font-semibold underline" style={{color: 'var(--color-primary)'}}>login</Link> to use coupon codes and get exclusive discounts!
                        </p>
                        <p className="text-xs" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                          Don't have an account? <Link href="/register" className="underline" style={{color: 'var(--color-accent)'}}>Register here</Link>
                        </p>
                      </div>
                    ) : !appliedCoupon ? (
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="Enter coupon code"
                            className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all font-mono text-sm"
                            style={{
                              backgroundColor: 'rgba(26, 26, 29, 0.8)',
                              borderColor: 'rgba(212, 175, 55, 0.3)',
                              color: 'white'
                            }}
                          />
                          <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={couponLoading}
                            className="px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 whitespace-nowrap text-sm sm:text-base min-h-[48px]"
                            style={{backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)'}}
                          >
                            {couponLoading ? 'Applying...' : 'Apply'}
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-sm text-red-400">{couponError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)'}}>
                        <div className="flex items-center gap-2">
                          <Tag size={16} style={{color: 'var(--color-accent)'}} />
                          <span className="font-mono font-bold" style={{color: 'var(--color-accent)'}}>
                            {appliedCoupon.code}
                          </span>
                          <span className="text-sm" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                            (-Rs. {appliedCoupon.discount})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      <span>Subtotal</span>
                      <span style={{color: 'white'}}>Rs. {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between" style={{color: 'rgba(255, 255, 255, 0.7)'}}>
                      <span>Shipping</span>
                      <span style={{color: 'white'}}>
                        {shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between" style={{color: 'var(--color-accent)'}}>
                        <span>Coupon ({appliedCoupon.code})</span>
                        <span>-Rs. {appliedCoupon.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-3" style={{borderColor: 'rgba(212, 175, 55, 0.3)'}}>
                      <div className="flex justify-between text-xl font-bold">
                        <span style={{color: 'white'}}>Total</span>
                        <span style={{color: 'var(--color-accent)'}}>
                          Rs. {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 md:px-8 md:py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                    style={{backgroundColor: 'var(--color-primary)'}}
                  >
                    Place Order
                  </button>

                  <p className="text-[10px] md:text-xs text-center mt-2 md:mt-4" style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                    By placing your order, you agree to our Terms & Conditions
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
