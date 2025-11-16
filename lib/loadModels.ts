// Import all models to ensure they're registered with Mongoose
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';
import Order from '@/models/Order';
import Admin from '@/models/Admin';
import Contact from '@/models/Contact';
import Newsletter from '@/models/Newsletter';
import Coupon from '@/models/Coupon';

// This function ensures all models are loaded
export function loadModels() {
  return {
    Product,
    Category,
    User,
    Order,
    Admin,
    Contact,
    Newsletter,
    Coupon,
  };
}

export default loadModels;
