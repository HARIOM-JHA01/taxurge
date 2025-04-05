import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { ObjectId } from 'mongodb';

// Helper function to parse form data
async function parseFormData(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll('uploadedDocuments') as File[];
  return files;
}

export async function POST(request: Request) {
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

    // Parse form data
    const files = await parseFormData(request);
    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('taxurgedb');
    const documentsCollection = db.collection('documents');

    // Upload files to Cloudinary and save references to MongoDB
    const uploadPromises = files.map(async (file) => {
      // Convert File to buffer for Cloudinary upload
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Upload to Cloudinary
      const fileObj = {
        buffer,
        mimetype: file.type,
      };
      const fileUrl = await uploadToCloudinary(fileObj);
      
      // Save document reference to MongoDB
      await documentsCollection.insertOne({
        userId: new ObjectId(decodedToken.userId),
        fileName: file.name,
        fileUrl,
        uploadedAt: new Date(),
      });
      
      return fileUrl;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return NextResponse.json(
      { message: 'Files uploaded successfully', urls: uploadedUrls },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}