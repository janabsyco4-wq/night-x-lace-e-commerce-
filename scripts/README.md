# API Testing Scripts

## Test API Endpoints Script

This script tests all 50+ API endpoints in the application to verify:
- Admin authentication is working correctly
- All endpoints return expected responses
- CRUD operations function properly
- Data validation is working

### Prerequisites

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Ensure MongoDB is connected and accessible

3. Have an admin account with credentials:
   - Email: `admin@nightxlace.com`
   - Password: `admin123`

### Running the Tests

```bash
npm run test:api
```

### What Gets Tested

The script tests the following endpoint categories:

#### 1. Authentication (3 endpoints)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

#### 2. Products (8 endpoints)
- `GET /api/products` - List all products
- `GET /api/products/[slug]` - Get single product
- `GET /api/admin/products` - Admin: List products
- `POST /api/admin/products` - Admin: Create product
- `GET /api/admin/products/[id]` - Admin: Get product
- `PUT /api/admin/products/[id]` - Admin: Update product
- `PATCH /api/admin/products/[id]` - Admin: Partial update
- `DELETE /api/admin/products/[id]` - Admin: Delete product

#### 3. Orders (5 endpoints)
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders
- `GET /api/orders/[id]` - Get single order
- `PATCH /api/orders/[id]` - Update order status
- `PUT /api/orders/[id]` - Update order (alias)
- `DELETE /api/orders/[id]` - Delete order

#### 4. Coupons (6 endpoints)
- `GET /api/coupons` - List active coupons
- `POST /api/coupons/validate` - Validate coupon code
- `GET /api/admin/coupons` - Admin: List all coupons
- `POST /api/admin/coupons` - Admin: Create coupon
- `PUT /api/admin/coupons/[id]` - Admin: Update coupon
- `PATCH /api/admin/coupons/[id]` - Admin: Toggle active status
- `DELETE /api/coupons/[id]` - Delete coupon

#### 5. Reviews (6 endpoints)
- `GET /api/reviews` - List reviews
- `GET /api/reviews/stats` - Get review statistics
- `POST /api/reviews` - Create review
- `POST /api/reviews/[id]/helpful` - Mark review helpful
- `DELETE /api/reviews/[id]/helpful` - Unmark review helpful
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

#### 6. Banners (4 endpoints)
- `GET /api/banners` - List banners
- `POST /api/banners` - Create banner
- `GET /api/banners/[id]` - Get single banner
- `PUT /api/banners/[id]` - Update banner
- `DELETE /api/banners/[id]` - Delete banner

#### 7. Contact (3 endpoints)
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List contact submissions
- `GET /api/contact/[id]` - Get single contact
- `DELETE /api/contact/[id]` - Delete contact

#### 8. Newsletter (2 endpoints)
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - List subscribers
- `DELETE /api/newsletter/[id]` - Unsubscribe

#### 9. Categories (1 endpoint)
- `GET /api/categories` - List all categories

#### 10. Settings (2 endpoints)
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

#### 11. Upload (1 endpoint)
- `POST /api/upload` - Upload image (skipped - requires file)

### Test Output

The script provides color-coded output:
- ✓ Green: Test passed
- ✗ Red: Test failed
- ⊘ Yellow: Test skipped

### Example Output

```
========================================
API ENDPOINT TESTING SCRIPT
========================================

[1] AUTH ENDPOINTS
─────────────────────────────────────────

✓ POST /api/auth/register
✓ POST /api/auth/login (Admin)
  Admin token obtained: eyJhbGciOiJIUzI1NiIs...
✓ GET /api/auth/me

[2] PRODUCTS ENDPOINTS
─────────────────────────────────────────

✓ GET /api/products
✓ GET /api/products/luxury-lace-bra
✓ GET /api/admin/products
✓ POST /api/admin/products
...

========================================
TEST SUMMARY
========================================

Total Tests: 52
Passed: 50
Failed: 0
Skipped: 2

Success Rate: 100.00%

✓ All tests passed successfully!
```

### Troubleshooting

**Issue: "Failed to get admin token"**
- Solution: Make sure admin account exists with correct credentials

**Issue: "Connection refused"**
- Solution: Ensure dev server is running on port 3000

**Issue: "Database connection failed"**
- Solution: Check MongoDB connection string in `.env.local`

**Issue: Tests fail with 401 Unauthorized**
- Solution: Admin authentication may have failed. Check admin credentials

### Notes

- The script creates test data and cleans it up automatically
- Some tests depend on previous tests (e.g., creating before updating)
- The script uses the admin token for protected endpoints
- Failed tests will show detailed error messages
