"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // If logged in, redirect to dashboard
      router.push('/dashboard');
    }
  }, [router]);

  return null; // This component doesn't render anything
}