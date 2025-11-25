/**
 * API Endpoint Testing Script
 * Tests all 50+ API endpoints to verify admin authentication and data retrieval
 */

const BASE_URL = 'http://localhost:3000';
let adminToken = '';
let testProductId = '';
let testOrderId = '';
let testCouponId = '';
let testBannerId = '';
let testReviewId = '';
let testContactId = '';
let testNewsletterId = '';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  total: 0,
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, status, details = '') {
  results.total++;
  if (status === 'PASS') {
    results.passed++;
    log(`✓ ${name}`, 'green');
  } else if (status === 'FAIL') {
    results.failed++;
    log(`✗ ${name}`, 'red');
    if (details) log(`  ${details}`, 'red');
  } else if (status === 'SKIP') {
    results.skipped++;
    log(`⊘ ${name}`, 'yellow');
    if (details) log(`  ${details}`, 'yellow');
  }
}

async function testEndpoint(name, method, url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        ...options.headers,
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
    });

    const data = await response.json().catch(() => ({}));

    if (options.expectedStatus) {
      if (response.status === options.expectedStatus) {
        logTest(name, 'PASS');
        return { success: true, data, status: response.status };
      } else {
        logTest(name, 'FAIL', `Expected ${options.expectedStatus}, got ${response.status}`);
        return { success: false, data, status: response.status };
      }
    }

    if (response.ok) {
      logTest(name, 'PASS');
      return { success: true, data, status: response.status };
    } else {
      logTest(name, 'FAIL', `Status: ${response.status} - ${data.error || 'Unknown error'}`);
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    logTest(name, 'FAIL', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n========================================', 'cyan');
  log('API ENDPOINT TESTING SCRIPT', 'cyan');
  log('========================================\n', 'cyan');

  // ==================== AUTH ENDPOINTS ====================
  log('\n[1] AUTH ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  // Register a test user
  const registerResult = await testEndpoint(
    'POST /api/auth/register',
    'POST',
    '/api/auth/register',
    {
      body: {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'Test123456',
      },
    }
  );

  // Login as admin
  const loginResult = await testEndpoint(
    'POST /api/auth/login (Admin)',
    'POST',
    '/api/auth/login',
    {
      body: {
        email: 'admin@nightxlace.com',
        password: 'admin123',
      },
    }
  );

  if (loginResult.success && loginResult.data.token) {
    adminToken = loginResult.data.token;
    log(`  Admin token obtained: ${adminToken.substring(0, 20)}...`, 'green');
  } else {
    log('  ⚠ Failed to get admin token. Admin-only tests will fail.', 'yellow');
  }

  // Get current user
  await testEndpoint('GET /api/auth/me', 'GET', '/api/auth/me');

  // ==================== PRODUCTS ENDPOINTS ====================
  log('\n[2] PRODUCTS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  // Public product endpoints
  const productsResult = await testEndpoint('GET /api/products', 'GET', '/api/products');
  
  if (productsResult.success && productsResult.data.products?.length > 0) {
    testProductId = productsResult.data.products[0]._id;
    const slug = productsResult.data.products[0].slug;
    await testEndpoint(`GET /api/products/${slug}`, 'GET', `/api/products/${slug}`);
  }

  // Admin product endpoints
  await testEndpoint('GET /api/admin/products', 'GET', '/api/admin/products');

  // Get a category ID first
  const categoriesResult = await testEndpoint('GET /api/categories', 'GET', '/api/categories');
  let categoryId = null;
  if (categoriesResult.success && categoriesResult.data.categories?.length > 0) {
    categoryId = categoriesResult.data.categories[0]._id;
  }

  const createProductResult = await testEndpoint(
    'POST /api/admin/products',
    'POST',
    '/api/admin/products',
    {
      body: {
        name: `Test Product ${Date.now()}`,
        description: 'Test description for automated testing',
        price: 99.99,
        salePrice: 79.99,
        category: categoryId || '507f1f77bcf86cd799439011',
        images: ['https://example.com/image.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'White'],
        stock: 100,
        inStock: true,
        featured: false,
      },
    }
  );

  if (createProductResult.success && createProductResult.data.product?._id) {
    testProductId = createProductResult.data.product._id;
  }

  if (testProductId) {
    await testEndpoint(`GET /api/admin/products/${testProductId}`, 'GET', `/api/admin/products/${testProductId}`);
    
    await testEndpoint(
      `PUT /api/admin/products/${testProductId}`,
      'PUT',
      `/api/admin/products/${testProductId}`,
      {
        body: {
          name: 'Updated Test Product',
          price: 89.99,
        },
      }
    );

    await testEndpoint(
      `PATCH /api/admin/products/${testProductId}`,
      'PATCH',
      `/api/admin/products/${testProductId}`,
      {
        body: {
          featured: true,
        },
      }
    );
  }

  // ==================== ORDERS ENDPOINTS ====================
  log('\n[3] ORDERS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  const orderResult = await testEndpoint(
    'POST /api/orders',
    'POST',
    '/api/orders',
    {
      body: {
        customer: {
          name: 'Test User',
          email: 'testorder@example.com',
          phone: '1234567890',
          address: {
            street: '123 Test St',
            city: 'Test City',
            state: 'Test State',
            zipCode: '12345',
            country: 'Pakistan',
          },
        },
        items: [
          {
            product: testProductId || '507f1f77bcf86cd799439011',
            name: 'Test Product',
            price: 99.99,
            quantity: 1,
            size: 'M',
            color: 'Black',
          },
        ],
        subtotal: 99.99,
        shippingCost: 0,
        discount: 0,
        total: 99.99,
        paymentMethod: 'COD',
      },
    }
  );

  if (orderResult.success && orderResult.data.order?._id) {
    testOrderId = orderResult.data.order._id;
  }

  await testEndpoint('GET /api/orders', 'GET', '/api/orders');

  if (testOrderId) {
    await testEndpoint(`GET /api/orders/${testOrderId}`, 'GET', `/api/orders/${testOrderId}`);
    
    await testEndpoint(
      `PATCH /api/orders/${testOrderId}`,
      'PATCH',
      `/api/orders/${testOrderId}`,
      {
        body: {
          status: 'processing',
        },
      }
    );

    await testEndpoint(
      `PUT /api/orders/${testOrderId}`,
      'PUT',
      `/api/orders/${testOrderId}`,
      {
        body: {
          status: 'shipped',
        },
      }
    );
  }

  // ==================== COUPONS ENDPOINTS ====================
  log('\n[4] COUPONS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  await testEndpoint('GET /api/coupons', 'GET', '/api/coupons');

  await testEndpoint('GET /api/admin/coupons', 'GET', '/api/admin/coupons');

  const couponResult = await testEndpoint(
    'POST /api/admin/coupons',
    'POST',
    '/api/admin/coupons',
    {
      body: {
        code: `TEST${Date.now()}`,
        type: 'percentage',
        value: 20,
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        minOrderValue: 100,
        usageLimit: 100,
        active: true,
      },
    }
  );

  if (couponResult.success && couponResult.data.coupon?._id) {
    testCouponId = couponResult.data.coupon._id;
  }

  // Use the coupon we just created
  if (couponResult.success && couponResult.data.coupon?.code) {
    await testEndpoint(
      'POST /api/coupons/validate',
      'POST',
      '/api/coupons/validate',
      {
        body: {
          code: couponResult.data.coupon.code,
          orderTotal: 500,
          userToken: adminToken,
        },
      }
    );
  } else {
    logTest('POST /api/coupons/validate', 'SKIP', 'No coupon created to validate');
  }

  if (testCouponId) {
    await testEndpoint(
      `PUT /api/admin/coupons/${testCouponId}`,
      'PUT',
      `/api/admin/coupons/${testCouponId}`,
      {
        body: {
          discount: 25,
        },
      }
    );

    await testEndpoint(
      `PATCH /api/admin/coupons/${testCouponId}`,
      'PATCH',
      `/api/admin/coupons/${testCouponId}`,
      {
        body: {
          active: false,
        },
      }
    );
  }

  // ==================== REVIEWS ENDPOINTS ====================
  log('\n[5] REVIEWS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  await testEndpoint('GET /api/reviews', 'GET', '/api/reviews');

  await testEndpoint('GET /api/reviews/stats', 'GET', '/api/reviews/stats');

  const reviewResult = await testEndpoint(
    'POST /api/reviews',
    'POST',
    '/api/reviews',
    {
      body: {
        productId: testProductId || '507f1f77bcf86cd799439011',
        author: 'Test User',
        email: 'testreview@example.com',
        rating: 5,
        comment: 'Great product! Highly recommended.',
      },
    }
  );

  if (reviewResult.success && reviewResult.data.review?._id) {
    testReviewId = reviewResult.data.review._id;
  }

  if (testReviewId) {
    await testEndpoint(
      `POST /api/reviews/${testReviewId}/helpful`,
      'POST',
      `/api/reviews/${testReviewId}/helpful`
    );

    await testEndpoint(
      `DELETE /api/reviews/${testReviewId}/helpful`,
      'DELETE',
      `/api/reviews/${testReviewId}/helpful`
    );

    await testEndpoint(
      `PUT /api/reviews/${testReviewId}`,
      'PUT',
      `/api/reviews/${testReviewId}`,
      {
        body: {
          rating: 4,
          comment: 'Updated review',
        },
      }
    );
  }

  // ==================== BANNERS ENDPOINTS ====================
  log('\n[6] BANNERS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  await testEndpoint('GET /api/banners', 'GET', '/api/banners');

  const bannerResult = await testEndpoint(
    'POST /api/banners',
    'POST',
    '/api/banners',
    {
      body: {
        type: 'promo',
        title: 'Test Banner',
        subtitle: 'Test subtitle',
        discount: '20% OFF',
        image: 'https://example.com/banner.jpg',
        link: '/shop',
        position: 1,
        isActive: true,
      },
    }
  );

  if (bannerResult.success && bannerResult.data.banner?._id) {
    testBannerId = bannerResult.data.banner._id;
  }

  if (testBannerId) {
    await testEndpoint(`GET /api/banners/${testBannerId}`, 'GET', `/api/banners/${testBannerId}`);

    await testEndpoint(
      `PUT /api/banners/${testBannerId}`,
      'PUT',
      `/api/banners/${testBannerId}`,
      {
        body: {
          title: 'Updated Banner',
        },
      }
    );
  }

  // ==================== CONTACT ENDPOINTS ====================
  log('\n[7] CONTACT ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  const contactResult = await testEndpoint(
    'POST /api/contact',
    'POST',
    '/api/contact',
    {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      },
    }
  );

  if (contactResult.success && contactResult.data.contact?._id) {
    testContactId = contactResult.data.contact._id;
  }

  await testEndpoint('GET /api/contact', 'GET', '/api/contact');

  if (testContactId) {
    await testEndpoint(`GET /api/contact/${testContactId}`, 'GET', `/api/contact/${testContactId}`);
  }

  // ==================== NEWSLETTER ENDPOINTS ====================
  log('\n[8] NEWSLETTER ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  const newsletterResult = await testEndpoint(
    'POST /api/newsletter',
    'POST',
    '/api/newsletter',
    {
      body: {
        email: `newsletter${Date.now()}@example.com`,
      },
    }
  );

  if (newsletterResult.success && newsletterResult.data.subscriber?._id) {
    testNewsletterId = newsletterResult.data.subscriber._id;
  }

  await testEndpoint('GET /api/newsletter', 'GET', '/api/newsletter');

  // ==================== CATEGORIES ENDPOINTS ====================
  log('\n[9] CATEGORIES ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  await testEndpoint('GET /api/categories', 'GET', '/api/categories');

  // ==================== SETTINGS ENDPOINTS ====================
  log('\n[10] SETTINGS ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  await testEndpoint('GET /api/settings', 'GET', '/api/settings');

  await testEndpoint(
    'PUT /api/settings',
    'PUT',
    '/api/settings',
    {
      body: {
        topBannerText: 'Test Banner Text',
        mainHeading: 'Test Heading',
      },
    }
  );

  // ==================== UPLOAD ENDPOINT ====================
  log('\n[11] UPLOAD ENDPOINT', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  logTest('POST /api/upload', 'SKIP', 'Requires multipart/form-data with actual file');

  // ==================== CLEANUP (DELETE TESTS) ====================
  log('\n[12] CLEANUP - DELETE ENDPOINTS', 'blue');
  log('─────────────────────────────────────────\n', 'blue');

  if (testReviewId) {
    await testEndpoint(`DELETE /api/reviews/${testReviewId}`, 'DELETE', `/api/reviews/${testReviewId}`);
  }

  if (testOrderId) {
    await testEndpoint(`DELETE /api/orders/${testOrderId}`, 'DELETE', `/api/orders/${testOrderId}`);
  }

  if (testCouponId) {
    await testEndpoint(`DELETE /api/admin/coupons/${testCouponId}`, 'DELETE', `/api/coupons/${testCouponId}`);
  }

  if (testBannerId) {
    await testEndpoint(`DELETE /api/banners/${testBannerId}`, 'DELETE', `/api/banners/${testBannerId}`);
  }

  if (testContactId) {
    await testEndpoint(`DELETE /api/contact/${testContactId}`, 'DELETE', `/api/contact/${testContactId}`);
  }

  if (testNewsletterId) {
    await testEndpoint(`DELETE /api/newsletter/${testNewsletterId}`, 'DELETE', `/api/newsletter/${testNewsletterId}`);
  }

  if (testProductId) {
    await testEndpoint(`DELETE /api/admin/products/${testProductId}`, 'DELETE', `/api/admin/products/${testProductId}`);
  }

  // ==================== SUMMARY ====================
  log('\n========================================', 'cyan');
  log('TEST SUMMARY', 'cyan');
  log('========================================\n', 'cyan');

  log(`Total Tests: ${results.total}`, 'blue');
  log(`Passed: ${results.passed}`, 'green');
  log(`Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
  log(`Skipped: ${results.skipped}`, 'yellow');

  const successRate = ((results.passed / (results.total - results.skipped)) * 100).toFixed(2);
  log(`\nSuccess Rate: ${successRate}%`, successRate >= 80 ? 'green' : 'red');

  if (results.failed > 0) {
    log('\n⚠ Some tests failed. Check the output above for details.', 'yellow');
  } else {
    log('\n✓ All tests passed successfully!', 'green');
  }

  log('\n========================================\n', 'cyan');
}

// Run the tests
runTests().catch((error) => {
  log(`\nFatal error: ${error.message}`, 'red');
  process.exit(1);
});
