import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/models/Settings';

// GET settings
export async function GET() {
  try {
    await connectDB();

    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('📝 Updating settings with:', body);

    let settings = await Settings.findOne();
    
    if (!settings) {
      console.log('Creating new settings document');
      settings = await Settings.create(body);
    } else {
      console.log('Updating existing settings document');
      settings = await Settings.findOneAndUpdate(
        {},
        { $set: { ...body, updatedAt: new Date() } },
        { new: true, runValidators: false }
      );
    }

    console.log('✅ Settings updated:', settings);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
