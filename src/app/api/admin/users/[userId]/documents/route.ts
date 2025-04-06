import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { getAdminAuthStatus } from '@/lib/adminAuth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Check admin authentication
    const isAdmin = getAdminAuthStatus();
    if (!isAdmin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { userId } = params;

    const client = await clientPromise;
    const db = client.db();

    // Fetch documents for the specific user
    const documents = await db.collection('documents')
      .find({ userId: new ObjectId(userId) })
      .sort({ uploadDate: -1 })
      .toArray();

    // Convert ObjectId to string in the response
    const serializedDocuments = documents.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      userId: doc.userId.toString()
    }));

    return NextResponse.json({ documents });

  } catch (error) {
    console.error('Error fetching user documents:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}