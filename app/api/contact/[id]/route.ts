import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Get contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();

    const contact = await Contact.findByIdAndUpdate(
      id,
      { isRead: body.isRead },
      { new: true }
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully',
      contact,
    });
  } catch (error) {
    console.error('Update contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
