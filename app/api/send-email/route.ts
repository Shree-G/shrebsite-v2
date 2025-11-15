// This is a template for email integration
// Replace with your actual email service (SendGrid, Resend, etc.)

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: Replace with your actual email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: 'your-email@example.com',
    //   from: 'noreply@yourdomain.com',
    //   subject: `New message from ${name}`,
    //   html: `<p>${message}</p><p>From: ${email}</p>`
    // });

    console.log('Email received:', { name, email, message })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
