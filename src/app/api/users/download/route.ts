import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    // Get token from headers
    const token = request.headers.get('token');
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('taxurgedb');
    const documentsCollection = db.collection('documents');

    // Fetch documents for the user
    const documents = await documentsCollection
      .find({ userId: new ObjectId(decodedToken.userId) })
      .sort({ uploadedAt: -1 })
      .toArray();

    // Extract file URLs
    const fileUrls = documents.map(doc => doc.fileUrl);

    return NextResponse.json(fileUrls, { status: 200 });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}