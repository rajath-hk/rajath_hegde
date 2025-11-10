import { contactFormSchema, type ContactFormData } from '@/lib/schemas';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // In a real application, you would integrate an email service here
    // For now, we'll simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully!'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing message:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Something went wrong. Please try again.'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}