import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const getTicketEmailTemplate = (data: any) => `
New Ticket Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}
`;

const getSubscriptionEmailTemplate = (data: any) => `
New Subscription

Email: ${data.email}
`;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type } = data; // 'ticket' or 'subscription'

    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is not configured');
      return NextResponse.json(
        { error: 'Email service is not properly configured' },
        { status: 500 }
      );
    }

    if (!process.env.NOTIFICATION_EMAIL) {
      console.error('Notification email is not configured');
      return NextResponse.json(
        { error: 'Notification email not configured' },
        { status: 500 }
      );
    }

    const emailContent = type === 'ticket'
      ? getTicketEmailTemplate(data)
      : getSubscriptionEmailTemplate(data);

    const subject = type === 'ticket'
      ? `New Ticket: ${data.subject}`
      : 'New Subscription Alert';

    const result = await resend.emails.send({
      from: 'support@taxurge.com',
      to: process.env.NOTIFICATION_EMAIL,
      subject: subject,
      text: emailContent,
    });

    if (!result || result.error) {
      console.error('Resend API error:', result?.error);
      return NextResponse.json(
        { error: 'Failed to send email notification' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Notification sent successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
}