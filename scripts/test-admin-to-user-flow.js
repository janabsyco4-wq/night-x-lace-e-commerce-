// Comprehensive Admin-to-User Flow Test Script
const BASE_URL = 'http://localhost:3000';

let adminToken = '';
let userToken = '';
let testProductId = '';
let testCategoryId = '';
let testCouponId = '';
let testBannerId = '';
let testProductSlug = '';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(`  ${title}`, colors.bright + colors.cyan);
  console.log('='.repeat(70) + '\n');
}

function logTest(name, passed, details = '') {
  const icon = passed ? '✅' : '❌';
  const color = passed ? colors.green : colors.red;
  log(`${icon} ${name}`, color);
  if (details) log(`   ${details}`, colors.yellow);
}

async function apiCall(method, endpoint, body = null, token = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json().catch(() => ({}));
    
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    return { status: 0, data: {}, ok: false, error: error.message };
  }
}

// ============================================================================
// AUTHENTICATION TESTS
// ============================================================================

async function testAdminLogin() {
  logSection('1. ADMIN AUTHENTICATION');
  
  const result = await apiCall('POST', '/api/admin/auth/login', {
    email: 'admin@nightxlace.com',
    password: 'admin123'
  });
  
  if (result.ok && result.data.token) {
    adminToken = result.data.token;
    logTest('Admin Login', true, `Token: ${adminToken.substring(0, 20)}...`);
    return true;
  } else {
    logTest('Admin Login', false, `Status: ${result.status}`);
    return false;
  }
}

async function testUserRegistration() {
  logSection('2. USER REGISTRATION & LOGIN');
  
  const timestamp = Date.now();
  const registerResult = await apiCall('POST', '/api/auth/register', {
    name: 'Test User',
    email: `testuser${timestamp}@test.com`,
    password: 'test123',
    phone: '1234567890'
  });
  
  if (registerResult.status === 201 && registerResult.data.token) {
    userToken = registerResult.data.token;
    logTest('User Registration', true, `Email: testuser${timestamp}@test.com`);
    return true;
  } else {
    logTest('User Registration', false, `Status: ${registerResult.status}`);
    return false;
  }
}

// ============================================================================
// CATEGORY CRUD TESTS
// ============================================================================

async function testCategoryFlow() {
  logSection('3. CATEGORY MANAGEMENT (Admin → User)');
  
  // Create Category
  const timestamp = Date.now();
  const createResult = await apiCall('POST', '/api/admin/categories', {
    name: `Test Category ${timestamp}`,
    slug: `test-category-${timestamp}`,
    description: 'Test category description',
    image: '/images/test-category.jpg'
  }, adminToken);
  
  if (createResult.ok && createResult.data.category) {
    testCategoryId = createResult.data.category._id;
    logTest('Create Category (Admin)', true, `ID: ${testCategoryId}`);
  } else {
    logTest('Create Category (Admin)', false, `Status: ${createResult.status}`);
    return false;
  }
  
  // Get All Categories (User Side)
  const getResult = await apiCall('GET', '/api/categories');
  const categoryExists = getResult.data.categories?.some(c => c._id === testCategoryId);
  logTest('View Category (User)', categoryExists, 'Category visible on user side');
  
  // Update Category
  const updateResult = await apiCall('PUT', `/api/admin/categories`, {
    id: testCategoryId,
    name: `Updated Category ${timestamp}`,
    description: 'Updated description'
  }, adminToken);
  
  logTest('Update Category (Admin)', updateResult.ok, 'Category updated');
  
  return true;
}

// ============================================================================
// PRODUCT CRUD TESTS
// ============================================================================

async function testProductFlow() {
  logSection('4. PRODUCT MANAGEMENT (Admin → User)');
  
  // Create Product
  const timestamp = Date.now();
  testProductSlug = `test-product-${timestamp}`;
  
  const createResult = await apiCall('POST', '/api/admin/products', {
    name: `Test Product ${timestamp}`,
    slug: testProductSlug,
    description: 'Test product description',
    price: 2999,
    compareAtPrice: 3999,
    category: testCategoryId,
    images: ['/images/test-product.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'White'],
    stock: 100,
    featured: true,
    tags: ['test', 'new']
  }, adminToken);
  
  if (createResult.ok && createResult.data.product) {
    testProductId = createResult.data.product._id;
    logTest('Create Product (Admin)', true, `ID: ${testProductId}`);
  } else {
    logTest('Create Product (Admin)', false, `Status: ${createResult.status}`);
    return false;
  }
  
  // Get All Products (User Side)
  const getAllResult = await apiCall('GET', '/api/products');
  const productInList = getAllResult.data.products?.some(p => p._id === testProductId);
  logTest('View Product in List (User)', productInList, 'Product visible in shop');
  
  // Get Product by Slug (User Side)
  const getBySlugResult = await apiCall('GET', `/api/products/${testProductSlug}`);
  logTest('View Product Details (User)', getBySlugResult.ok, `Slug: ${testProductSlug}`);
  
  // Update Product
  const updateResult = await apiCall('PUT', `/api/admin/products`, {
    id: testProductId,
    name: `Updated Product ${timestamp}`,
    price: 2499,
    stock: 50
  }, adminToken);
  
  logTest('Update Product (Admin)', updateResult.ok, 'Product updated');
  
  // Verify Update on User Side
  const verifyResult = await apiCall('GET', `/api/products/${testProductSlug}`);
  const priceUpdated = verifyResult.data.product?.price === 2499;
  logTest('Verify Update (User)', priceUpdated, 'Updated price visible to users');
  
  return true;
}

// ============================================================================
// COUPON CRUD TESTS
// ============================================================================

async function testCouponFlow() {
  logSection('5. COUPON MANAGEMENT (Admin → User)');
  
  // Create Coupon
  const timestamp = Date.now();
  const couponCode = `TEST${timestamp}`;
  
  const createResult = await apiCall('POST', '/api/admin/coupons', {
    code: couponCode,
    type: 'percentage',
    value: 20,
    minOrderValue: 1000,
    maxDiscount: 500,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 100,
    active: true
  }, adminToken);
  
  if (createResult.ok && createResult.data.coupon) {
    testCouponId = createResult.data.coupon._id;
    logTest('Create Coupon (Admin)', true, `Code: ${couponCode}`);
  } else {
    logTest('Create Coupon (Admin)', false, `Status: ${createResult.status}`);
    return false;
  }
  
  // Validate Coupon (User Side - with login)
  const validateResult = await apiCall('POST', '/api/coupons/validate', {
    code: couponCode,
    orderTotal: 2000,
    userToken: userToken
  });
  
  logTest('Validate Coupon (User)', validateResult.ok, 'Coupon validated successfully');
  
  // Get All Coupons (User Side)
  const getAllResult = await apiCall('GET', '/api/coupons');
  const couponVisible = getAllResult.data.coupons?.some(c => c.code === couponCode);
  logTest('View Coupon (User)', couponVisible, 'Coupon visible to users');
  
  // Update Coupon
  const updateResult = await apiCall('PUT', `/api/admin/coupons/${testCouponId}`, {
    value: 25,
    active: true
  }, adminToken);
  
  logTest('Update Coupon (Admin)', updateResult.ok, 'Coupon value updated to 25%');
  
  return true;
}

// ============================================================================
// BANNER CRUD TESTS
// ============================================================================

async function testBannerFlow() {
  logSection('6. BANNER MANAGEMENT (Admin → User)');
  
  // Create Banner
  const createResult = await apiCall('POST', '/api/banners', {
    type: 'top',
    isActive: true,
    topText: '🎉 Test Sale:',
    topDiscountText: '30% OFF',
    topCouponCode: 'TESTSALE30'
  }, adminToken);
  
  if (createResult.status === 201 && createResult.data.banner) {
    testBannerId = createResult.data.banner._id;
    logTest('Create Banner (Admin)', true, `ID: ${testBannerId}`);
  } else {
    logTest('Create Banner (Admin)', false, `Status: ${createResult.status}`);
    return false;
  }
  
  // Get All Banners (User Side)
  const getAllResult = await apiCall('GET', '/api/banners');
  const bannerVisible = getAllResult.data.banners?.some(b => b._id === testBannerId);
  logTest('View Banner (User)', bannerVisible, 'Banner visible on user side');
  
  // Update Banner
  const updateResult = await apiCall('PUT', `/api/banners/${testBannerId}`, {
    topDiscountText: '40% OFF',
    topCouponCode: 'TESTSALE40'
  }, adminToken);
  
  logTest('Update Banner (Admin)', updateResult.ok, 'Banner updated');
  
  // Verify Update on User Side
  const verifyResult = await apiCall('GET', '/api/banners');
  const updatedBanner = verifyResult.data.banners?.find(b => b._id === testBannerId);
  const updateVisible = updatedBanner?.topDiscountText === '40% OFF';
  logTest('Verify Update (User)', updateVisible, 'Updated banner visible to users');
  
  return true;
}

// ============================================================================
// ORDER FLOW TEST
// ============================================================================

async function testOrderFlow() {
  logSection('7. ORDER FLOW (User → Admin)');
  
  // Create Order (User Side)
  const orderResult = await apiCall('POST', '/api/orders', {
    userId: 'test-user-id',
    customer: {
      name: 'Test User',
      email: 'testuser@test.com',
      phone: '1234567890',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Pakistan'
      }
    },
    items: [{
      product: testProductId,
      name: 'Test Product',
      price: 2499,
      quantity: 2,
      size: 'M',
      color: 'Black'
    }],
    subtotal: 4998,
    shippingCost: 200,
    discount: 0,
    total: 5198,
    paymentMethod: 'cod'
  });
  
  if (orderResult.status === 201 && orderResult.data.order) {
    const orderId = orderResult.data.order._id;
    logTest('Create Order (User)', true, `Order: ${orderResult.data.order.orderNumber}`);
    
    // Get All Orders (Admin Side)
    const adminOrdersResult = await apiCall('GET', '/api/orders', null, adminToken);
    const orderVisible = adminOrdersResult.data.orders?.some(o => o._id === orderId);
    logTest('View Order (Admin)', orderVisible, 'Order visible in admin panel');
    
    // Update Order Status (Admin)
    const updateResult = await apiCall('PUT', `/api/orders/${orderId}`, {
      status: 'processing'
    }, adminToken);
    
    logTest('Update Order Status (Admin)', updateResult.ok, 'Order status updated');
    
    return true;
  } else {
    logTest('Create Order (User)', false, `Status: ${orderResult.status}`);
    return false;
  }
}

// ============================================================================
// CONTACT & MESSAGES TEST
// ============================================================================

async function testContactFlow() {
  logSection('8. CONTACT MESSAGES (User → Admin)');
  
  // Submit Contact Form (User Side)
  const contactResult = await apiCall('POST', '/api/contact', {
    name: 'Test User',
    email: 'testuser@test.com',
    subject: 'Test Message',
    message: 'This is a test message from the contact form'
  });
  
  if (contactResult.status === 201 || contactResult.ok) {
    logTest('Submit Contact Form (User)', true, 'Message sent');
    
    // Get All Messages (Admin Side)
    const messagesResult = await apiCall('GET', '/api/contact', null, adminToken);
    logTest('View Messages (Admin)', messagesResult.ok, 'Messages visible in admin panel');
    
    return true;
  } else {
    logTest('Submit Contact Form (User)', false, `Status: ${contactResult.status}`);
    return false;
  }
}

// ============================================================================
// CLEANUP TESTS
// ============================================================================

async function testCleanup() {
  logSection('9. CLEANUP (Delete Test Data)');
  
  let cleanupSuccess = true;
  
  // Delete Product
  if (testProductId) {
    const result = await apiCall('DELETE', `/api/admin/products?id=${testProductId}`, null, adminToken);
    logTest('Delete Product', result.ok, `ID: ${testProductId}`);
    cleanupSuccess = cleanupSuccess && result.ok;
  }
  
  // Delete Category
  if (testCategoryId) {
    const result = await apiCall('DELETE', `/api/admin/categories?id=${testCategoryId}`, null, adminToken);
    logTest('Delete Category', result.ok, `ID: ${testCategoryId}`);
    cleanupSuccess = cleanupSuccess && result.ok;
  }
  
  // Delete Coupon
  if (testCouponId) {
    const result = await apiCall('DELETE', `/api/coupons/${testCouponId}`, null, adminToken);
    logTest('Delete Coupon', result.ok, `ID: ${testCouponId}`);
    cleanupSuccess = cleanupSuccess && result.ok;
  }
  
  // Delete Banner
  if (testBannerId) {
    const result = await apiCall('DELETE', `/api/banners/${testBannerId}`, null, adminToken);
    logTest('Delete Banner', result.ok, `ID: ${testBannerId}`);
    cleanupSuccess = cleanupSuccess && result.ok;
  }
  
  return cleanupSuccess;
}

// ============================================================================
// MAIN TEST RUNNER
// ============================================================================

async function runAllTests() {
  console.clear();
  log('\n🧪 COMPREHENSIVE ADMIN-TO-USER FLOW TEST SUITE', colors.bright + colors.blue);
  log('Testing: Products, Categories, Coupons, Banners, Orders, Messages\n', colors.cyan);
  
  const startTime = Date.now();
  let totalTests = 0;
  let passedTests = 0;
  
  try {
    // Run all test flows
    if (await testAdminLogin()) passedTests++;
    totalTests++;
    
    if (await testUserRegistration()) passedTests++;
    totalTests++;
    
    if (await testCategoryFlow()) passedTests++;
    totalTests++;
    
    if (await testProductFlow()) passedTests++;
    totalTests++;
    
    if (await testCouponFlow()) passedTests++;
    totalTests++;
    
    if (await testBannerFlow()) passedTests++;
    totalTests++;
    
    if (await testOrderFlow()) passedTests++;
    totalTests++;
    
    if (await testContactFlow()) passedTests++;
    totalTests++;
    
    if (await testCleanup()) passedTests++;
    totalTests++;
    
  } catch (error) {
    log(`\n❌ Test suite error: ${error.message}`, colors.red);
  }
  
  // Final Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  logSection('TEST SUMMARY');
  log(`Total Test Flows: ${totalTests}`, colors.bright);
  log(`Passed: ${passedTests}`, colors.green);
  log(`Failed: ${totalTests - passedTests}`, colors.red);
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, colors.cyan);
  log(`Duration: ${duration}s`, colors.yellow);
  
  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Admin-to-User flow is working correctly!', colors.green + colors.bright);
  } else {
    log('\n⚠️  Some tests failed. Please check the details above.', colors.yellow);
  }
  
  console.log('\n');
}

// Run the test suite
runAllTests().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
