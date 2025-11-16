// Simple connection test
const BASE_URL = 'http://localhost:3000';

async function testConnection() {
  console.log('Testing server connection...\n');
  
  // Test 1: Server is running
  try {
    const response = await fetch(BASE_URL);
    console.log(`✅ Server is running (Status: ${response.status})`);
  } catch (error) {
    console.log(`❌ Server is not running: ${error.message}`);
    return;
  }
  
  // Test 2: API endpoint exists
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();
    console.log(`✅ API endpoint works (Status: ${response.status})`);
    console.log(`   Products found: ${data.products?.length || 0}`);
  } catch (error) {
    console.log(`❌ API error: ${error.message}`);
  }
  
  // Test 3: Admin login
  try {
    const response = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@nightxlace.com',
        password: 'admin123'
      })
    });
    const data = await response.json();
    console.log(`\nAdmin Login Test:`);
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(`❌ Admin login error: ${error.message}`);
  }
  
  // Test 4: User registration
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@test.com`,
        password: 'test123'
      })
    });
    const data = await response.json();
    console.log(`\nUser Registration Test:`);
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(`❌ User registration error: ${error.message}`);
  }
}

testConnection();
