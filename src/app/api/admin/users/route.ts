import { NextResponse } from 'next/server';
import { getAdminAuthStatus } from '@/lib/adminAuth';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // Verify admin authentication
    if (!getAdminAuthStatus()) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('taxurgedb');
    const users = await db.collection('users')
      .find({})
      .project({ password: 0 }) // Exclude password field
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}