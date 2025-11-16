// Utility to fetch store settings
export async function getSettings() {
  try {
    const response = await fetch('/api/settings', {
      cache: 'no-store', // Always get fresh data
    });
    const data = await response.json();
    
    if (data.success) {
      return data.settings;
    }
    
    // Return defaults if fetch fails
    return {
      storeName: 'Night × Lace',
      email: 'info@nightxlace.com',
      phone: '+92 300 1234567',
      address: 'Karachi, Pakistan',
      description: 'Premium women\'s undergarments and lingerie',
      freeShippingThreshold: 3000,
      standardShipping: 200,
      expressShipping: 500,
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return defaults
    return {
      storeName: 'Night × Lace',
      email: 'info@nightxlace.com',
      phone: '+92 300 1234567',
      address: 'Karachi, Pakistan',
      description: 'Premium women\'s undergarments and lingerie',
      freeShippingThreshold: 3000,
      standardShipping: 200,
      expressShipping: 500,
    };
  }
}
