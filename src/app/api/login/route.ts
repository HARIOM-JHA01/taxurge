import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('taxurgedb');
    const collection = db.collection('users');

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    });

    return NextResponse.json(
      { 
        message: 'Login successful',
        token,
        name: user.fullName
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}