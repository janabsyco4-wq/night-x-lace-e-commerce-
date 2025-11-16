// Comprehensive API Testing Script
const BASE_URL = 'http://localhost:3000';

let passCount = 0;
let failCount = 0;
let testResults = [];

async function testAPI(name, method, endpoint, body = null, expectedStatus = 200, headers = {}) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({}));
    
    const passed = response.status === expectedStatus;
    if (passed) {
      passCount++;
      console.log(`✅ ${name}`);
    } else {
      failCount++;
      console.log(`❌ ${name} - Expected ${expectedStatus}, got ${response.status}`);
    }
    
    testResults.push({ name, passed, status: response.status, expectedStatus });
    return { passed, data, status: response.status };
  } catch (error) {
    failCount++;
    console.log(`❌ ${name} - ${error.message}`);
    testResults.push({ name, passed: false, error: error.message });
    return { passed: false, error };
  }
}

async function runAllTests() {
  console.log('🧪 COMPREHENSIVE API TEST SUITE\n');
  console.log('=' .repeat(60));
  
  // ========== AUTH APIs ==========
  console.log('\n📁 AUTH APIs\n');
  
  await testAPI('Register User', 'POST', '/api/auth/register', {
    name: 'Test User',
    email: `test${Date.now()}@test.com`,
    password: 'test123'
  }, 201);
  
  const loginResult = await testAPI('Login User', 'POST', '/api/auth/login', {
    email: 'test@test.com',
    password: 'test123'
  }, 200);
  
  const userToken = loginResult.data?.token || 'dummy-token';
  
  await testAPI('Get Current User', 'GET', '/api/auth/me', null, 200, {
    'Authorization': `Bearer ${userToken}`
  });
  
  // ========== ADMIN AUTH APIs ==========
  console.log('\n📁 ADMIN AUTH APIs\n');
  
  const adminLoginResult = await testAPI('Admin Login', 'POST', '/api/admin/auth/login', {
    email: 'admin@nightxlace.com',
    password: 'admin123'
  }, 200);
  
  const adminToken = adminLoginResult.data?.token || 'dummy-admin-token';
  
  // ========== PRODUCTS APIs ==========
  console.log('\n📁 PRODUCTS APIs\n');
  
  await testAPI('Get All Products', 'GET', '/api/products');
  await testAPI('Get Product by Slug', 'GET', '/api/products/luxury-lace-bra');
  
  await testAPI('Create Product (Admin)', 'POST', '/api/admin/products', {
    name: 'Test Product',
    slug: `test-product-${Date.now()}`,
    price: 1000,
    category: 'Bras',
    description: 'Test',
    images: []
  }, 201, { 'Authorization': `Bearer ${adminToken}` });
  
  await testAPI('Update Product (Admin)', 'PUT', '/api/admin/products', {
    id: 'test-id',
    name: 'Updated Product'
  }, 200, { 'Authorization': `Bearer ${adminToken}` });
  
  await testAPI('Delete Product (Admin)', 'DELETE', '/api/admin/products?id=test-id', null, 200, {
    'Authorization': `Bearer ${adminToken}`
  });
  
  // ========== CATEGORIES APIs ==========
  console.log('\n📁 CATEGORIES APIs\n');
  
  await testAPI('Get All Categories', 'GET', '/api/categories');
  
  await testAPI('Create Category (Admin)', 'POST', '/api/admin/categories', {
    name: 'Test Category',
    slug: `test-cat-${Date.now()}`,
    description: 'Test'
  }, 201, { 'Authorization': `Bearer ${adminToken}` });
  
  await testAPI('Update Category (Admin)', 'PUT', '/api/admin/categories', {
    id: 'test-id',
    name: 'Updated Category'
  }, 200, { 'Authorization': `Bearer ${adminToken}` });
  
  await testAPI('Delete Category (Admin)', 'DELETE', '/api/admin/categories?id=test-id', null, 200, {
    'Authorization': `Bearer ${adminToken}`
  });
  
  // ========== ORDERS APIs ==========
  console.log('\n📁 ORDERS APIs\n');
  
  await testAPI('Create Order', 'POST', '/api/orders', {
    items: [{ productId: 'test', quantity: 1, price: 1000 }],
    customerInfo: {
      fullName: 'Test User',
      email: 'test@test.com',
      phone: '1234567890',
      address: 'Test Address'
    },
    total: 1000
  }, 201);
  
  await testAPI('Get All Orders', 'GET', '/api/orders');
  await testAPI('Get Order by ID', 'GET', '/api/orders/test-order-id');
  await testAPI('Update Order Status', 'PUT', '/api/orders/test-order-id', {
    status: 'processing'
  });
  
  // ========== COUPONS APIs ==========
  console.log('\n📁 COUPONS APIs\n');
  
  await testAPI('Get All Coupons', 'GET', '/api/coupons');
  
  await testAPI('Validate Coupon (No Login)', 'POST', '/api/coupons/validate', {
    code: 'SAVE20',
    orderTotal: 5000
  }, 401);
  
  await testAPI('Validate Coupon (With Login)', 'POST', '/api/coupons/validate', {
    code: 'SAVE20',
    orderTotal: 5000,
    userToken: userToken
  }, 404);
  
  await testAPI('Create Coupon (Admin)', 'POST', '/api/admin/coupons', {
    code: `TEST${Date.now()}`,
    type: 'percentage',
    value: 10,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }, 201, { 'Authorization': `Bearer ${adminToken}` });
  
  await testAPI('Update Coupon (Admin)', 'PUT', '/api/coupons/test-id', {
    active: false
  });
  
  await testAPI('Delete Coupon (Admin)', 'DELETE', '/api/coupons/test-id');
  
  // ========== REVIEWS APIs ==========
  console.log('\n📁 REVIEWS APIs\n');
  
  await testAPI('Get All Reviews', 'GET', '/api/reviews');
  await testAPI('Get Review Stats', 'GET', '/api/reviews/stats');
  
  await testAPI('Create Review', 'POST', '/api/reviews', {
    productId: 'test-product',
    rating: 5,
    comment: 'Great product!',
    userName: 'Test User'
  }, 201);
  
  await testAPI('Update Review', 'PUT', '/api/reviews/test-id', {
    approved: true
  });
  
  await testAPI('Delete Review', 'DELETE', '/api/reviews/test-id');
  
  // ========== BANNERS APIs ==========
  console.log('\n📁 BANNERS APIs\n');
  
  await testAPI('Get Banner by ID', 'GET', '/api/banners/test-id');
  
  // ========== SETTINGS APIs ==========
  console.log('\n📁 SETTINGS APIs\n');
  
  await testAPI('Get Settings', 'GET', '/api/settings');
  
  await testAPI('Update Settings', 'PUT', '/api/settings', {
    email: 'info@nightxlace.com',
    phone: '+92 300 1234567'
  });
  
  // ========== CONTACT APIs ==========
  console.log('\n📁 CONTACT APIs\n');
  
  await testAPI('Submit Contact Form', 'POST', '/api/contact', {
    name: 'Test User',
    email: 'test@test.com',
    subject: 'Test',
    message: 'Test message'
  }, 201);
  
  await testAPI('Get All Messages', 'GET', '/api/contact');
  await testAPI('Get Message by ID', 'GET', '/api/contact/test-id');
  await testAPI('Delete Message', 'DELETE', '/api/contact/test-id');
  
  // ========== NEWSLETTER APIs ==========
  console.log('\n📁 NEWSLETTER APIs\n');
  
  await testAPI('Subscribe Newsletter', 'POST', '/api/newsletter', {
    email: `test${Date.now()}@test.com`
  }, 201);
  
  await testAPI('Get All Subscribers', 'GET', '/api/newsletter');
  await testAPI('Delete Subscriber', 'DELETE', '/api/newsletter/test-id');
  
  // ========== UPLOAD API ==========
  console.log('\n📁 UPLOAD API\n');
  
  await testAPI('Upload Endpoint Check', 'GET', '/api/upload', null, 405);
  
  // ========== SUMMARY ==========
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 TEST SUMMARY\n');
  console.log(`Total Tests: ${passCount + failCount}`);
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);
  
  if (failCount > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.filter(t => !t.passed).forEach(t => {
      console.log(`  - ${t.name} ${t.error ? `(${t.error})` : `(${t.status}/${t.expectedStatus})`}`);
    });
  }
  
  console.log('\n🎉 API testing complete!');
}

runAllTests().catch(error => {
  console.error('❌ Test suite error:', error);
  process.exit(1);
});
