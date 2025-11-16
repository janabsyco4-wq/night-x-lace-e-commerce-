import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Banner from '@/models/Banner';

export async function GET() {
  try {
    await connectDB();
    
    const banners = await Banner.find({ isActive: true }).sort({ position: 1 }).lean();
    
    return NextResponse.json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error('Get banners error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    const banner = await Banner.create(data);
    
    return NextResponse.json({
      success: true,
      banner,
    }, { status: 201 });
  } catch (error) {
    console.error('Create banner error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create banner' },
      { status: 500 }
    );
  }
}
