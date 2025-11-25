import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { Resend } from 'resend';

// Only initialize Resend if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const config = {
  runtime: 'edge',
};

export async function POST(req: Request) {
  try {
    const data = await req.json() as ContactFormData;
    const validatedFields = contactFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid form data. Please check your inputs.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { name, email, message } = validatedFields.data;

    // Check if Resend is properly configured
    if (!resend || !process.env.RESEND_API_KEY) {
      // Fallback to simulation mode during build or when API key is missing
      console.warn('Resend API key not configured. Simulating email send.');
      
      // Simulate work
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully! (Simulated)' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email using Resend
    const resendResult = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'default@example.com',
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `
You have received a new message from your portfolio website.

Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email,
    });

    if (resendResult.error) {
      console.error('Error sending email:', resendResult.error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Something went wrong. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}