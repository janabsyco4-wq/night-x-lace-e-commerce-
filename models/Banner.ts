import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  type: 'top' | 'promo' | 'small';
  isActive: boolean;
  topText?: string;
  topDiscountText?: string;
  topCouponCode?: string;
  title?: string;
  subtitle?: string;
  discount?: string;
  endDate?: Date;
  image?: string;
  link?: string;
  position?: number;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    type: {
      type: String,
      enum: ['top', 'promo', 'small'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    topText: {
      type: String,
    },
    topDiscountText: {
      type: String,
    },
    topCouponCode: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    discount: {
      type: String,
    },
    endDate: {
      type: Date,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    position: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.models.Banner || mongoose.model<IBanner>('Banner', bannerSchema);

export default Banner;
