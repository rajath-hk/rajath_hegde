'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas';

export async function sendMessage(data: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    // This case should ideally be caught by client-side validation,
    // but it's good practice to have server-side checks.
    throw new Error('Invalid form data.');
  }
  
  try {
    // In a real application, you would integrate an email service like
    // SendGrid or Resend here to actually send the email.
    // For this portfolio, we'll simulate success by logging to the console.
    console.log('New message received:');
    console.log('Name:', validatedFields.data.name);
    console.log('Email:', validatedFields.data.email);
    console.log('Message:', validatedFields.data.message);

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'Something went wrong on the server. Please try again.' };
  }
}
