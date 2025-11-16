import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  freeShippingThreshold: number;
  standardShipping: number;
  expressShipping: number;
  // Banner settings
  topBannerText: string;
  mainHeading: string;
  mainDiscount: string;
  mainCouponCode: string;
  bannerEndDate: string;
  smallBanner1Code: string;
  smallBanner1Discount: string;
  smallBanner1Description: string;
  smallBanner2Code: string;
  smallBanner2Discount: string;
  smallBanner2Description: string;
  smallBanner3Code: string;
  smallBanner3Discount: string;
  smallBanner3Description: string;
  // Logo settings
  logoFirstPart: string;
  logoSecondPart: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    storeName: {
      type: String,
      default: 'Night × Lace',
    },
    email: {
      type: String,
      default: 'info@nightxlace.com',
    },
    phone: {
      type: String,
      default: '+92 300 1234567',
    },
    address: {
      type: String,
      default: 'Karachi, Pakistan',
    },
    description: {
      type: String,
      default: 'Premium women\'s undergarments and lingerie',
    },
    freeShippingThreshold: {
      type: Number,
      default: 3000,
    },
    standardShipping: {
      type: Number,
      default: 200,
    },
    expressShipping: {
      type: Number,
      default: 500,
    },
    // Banner settings
    topBannerText: {
      type: String,
      default: '🎉 Summer Sale: 50% OFF - Use Code: ALI12345',
    },
    mainHeading: {
      type: String,
      default: 'Unlock Your Luxury',
    },
    mainDiscount: {
      type: String,
      default: '50% OFF',
    },
    mainCouponCode: {
      type: String,
      default: 'ALI12345',
    },
    bannerEndDate: {
      type: String,
      default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    smallBanner1Code: {
      type: String,
      default: 'SAVE20',
    },
    smallBanner1Discount: {
      type: String,
      default: '20%',
    },
    smallBanner1Description: {
      type: String,
      default: 'Get 20% off on all items',
    },
    smallBanner2Code: {
      type: String,
      default: 'FIRST15',
    },
    smallBanner2Discount: {
      type: String,
      default: '15%',
    },
    smallBanner2Description: {
      type: String,
      default: 'First order special discount',
    },
    smallBanner3Code: {
      type: String,
      default: 'LUXURY30',
    },
    smallBanner3Discount: {
      type: String,
      default: '30%',
    },
    smallBanner3Description: {
      type: String,
      default: 'Premium collection discount',
    },
    // Logo settings
    logoFirstPart: {
      type: String,
      default: 'Night',
    },
    logoSecondPart: {
      type: String,
      default: 'Lace',
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Clear the model if it exists to avoid caching issues
if (mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export default mongoose.model<ISettings>('Settings', SettingsSchema);
