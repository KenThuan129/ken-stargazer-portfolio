import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // You'll need to verify your domain for production
      to: ['ken.stargazer.12092003@gmail.com'], // Your email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a1a; color: #ffffff;">
          <h2 style="color: #ff6b9d; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #1a1a2e; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #9d4edd;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #9d4edd;">Email:</strong> <a href="mailto:${email}" style="color: #00d9ff;">${email}</a></p>
          </div>
          
          <div style="background-color: #1a1a2e; padding: 20px; border-radius: 12px;">
            <h3 style="color: #ff6b9d; margin-bottom: 10px;">Message:</h3>
            <p style="color: #ffffff; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="margin-top: 20px; color: #a0a0a0; font-size: 12px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

