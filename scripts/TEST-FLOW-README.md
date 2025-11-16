# Admin-to-User Flow Test Script

## Overview
This comprehensive test script validates the complete workflow from admin operations to user-facing features, ensuring data flows correctly through the entire system.

## What It Tests

### 1. **Authentication**
- ✅ Admin login with credentials
- ✅ User registration and token generation

### 2. **Category Management**
- ✅ Admin creates category
- ✅ Category appears on user side
- ✅ Admin updates category
- ✅ Admin deletes category

### 3. **Product Management**
- ✅ Admin creates product
- ✅ Product appears in shop (user side)
- ✅ Product details page works (user side)
- ✅ Admin updates product
- ✅ Updates reflect on user side
- ✅ Admin deletes product

### 4. **Coupon Management**
- ✅ Admin creates coupon
- ✅ User can validate coupon
- ✅ Coupon appears in user listings
- ✅ Admin updates coupon
- ✅ Admin deletes coupon

### 5. **Banner Management**
- ✅ Admin creates banner
- ✅ Banner appears on user side
- ✅ Admin updates banner
- ✅ Updates reflect on user side
- ✅ Admin deletes banner

### 6. **Order Flow**
- ✅ User creates order
- ✅ Order appears in admin panel
- ✅ Admin updates order status

### 7. **Contact Messages**
- ✅ User submits contact form
- ✅ Message appears in admin panel

### 8. **Cleanup**
- ✅ All test data is deleted

## How to Run

### Prerequisites
1. Make sure MongoDB is running
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Ensure you have an admin account with credentials:
   - Email: `admin@nightxlace.com`
   - Password: `admin123`

### Run the Test
```bash
node scripts/test-admin-to-user-flow.js
```

## Expected Output

The script will display:
- ✅ Green checkmarks for passing tests
- ❌ Red X marks for failing tests
- Detailed information about each operation
- Final summary with success rate

### Example Output:
```
🧪 COMPREHENSIVE ADMIN-TO-USER FLOW TEST SUITE
Testing: Products, Categories, Coupons, Banners, Orders, Messages

======================================================================
  1. ADMIN AUTHENTICATION
======================================================================

✅ Admin Login
   Token: eyJhbGciOiJIUzI1NiIs...

======================================================================
  2. USER REGISTRATION & LOGIN
======================================================================

✅ User Registration
   Email: testuser1234567890@test.com

... (more tests)

======================================================================
  TEST SUMMARY
======================================================================

Total Test Flows: 9
Passed: 9
Failed: 0
Success Rate: 100.0%
Duration: 3.45s

🎉 All tests passed! Admin-to-User flow is working correctly!
```

## Test Flow Diagram

```
ADMIN SIDE                          USER SIDE
─────────────────────────────────────────────────────────────
1. Admin Login ──────────────────→ (Authentication)
                                    
2. Create Category ──────────────→ View Categories
                                    
3. Create Product ───────────────→ View in Shop
                                 → View Product Details
                                    
4. Update Product ───────────────→ See Updated Info
                                    
5. Create Coupon ────────────────→ Validate Coupon
                                 → Apply at Checkout
                                    
6. Create Banner ────────────────→ See Banner on Homepage
                                    
7. View Orders ←─────────────────  Create Order
                                    
8. View Messages ←───────────────  Submit Contact Form
                                    
9. Delete Test Data
```

## Troubleshooting

### All Tests Fail with 500 Errors
- **Cause**: Development server is not running
- **Solution**: Run `npm run dev` in another terminal

### Admin Login Fails
- **Cause**: Admin account doesn't exist
- **Solution**: Run `node scripts/create-admin.js` to create admin account

### Database Connection Errors
- **Cause**: MongoDB is not running
- **Solution**: Start MongoDB service

### Some Tests Pass, Others Fail
- Check the specific error messages
- Verify API routes exist for failing endpoints
- Check database connection
- Review server logs for detailed errors

## What Gets Created During Tests

The script creates temporary test data:
- 1 test category
- 1 test product
- 1 test coupon
- 1 test banner
- 1 test order
- 1 test contact message
- 1 test user account

**All test data is automatically cleaned up at the end!**

## Integration with CI/CD

You can integrate this test into your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run E2E Flow Tests
  run: |
    npm run dev &
    sleep 10
    node scripts/test-admin-to-user-flow.js
```

## Notes

- Test data uses timestamps to avoid conflicts
- Each test is independent and can run multiple times
- Cleanup happens even if some tests fail
- The script is safe to run on development environments
- **Do not run on production!**
