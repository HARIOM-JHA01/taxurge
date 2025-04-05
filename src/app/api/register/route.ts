import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { fullName, email, password } = await request.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('taxurgedb');
    const collection = db.collection('users');

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const result = await collection.insertOne({
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Generate JWT token
    const token = generateToken({
      _id: result.insertedId,
      email,
      fullName
    });

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        token,
        name: fullName
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}