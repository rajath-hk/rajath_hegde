import { contactFormSchema, type ContactFormData } from '@/lib/schemas';

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

    // Simulate work (replace with email/send integration if needed)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return new Response(JSON.stringify({ success: true, message: 'Your message has been sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}