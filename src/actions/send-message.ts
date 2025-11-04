'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas';

export async function sendMessage(data: ContactFormData) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.'
    };
  }
  
  try {
    // In a real application, you would integrate an email service like
    // SendGrid or Resend here to actually send the email.
    // For this portfolio, we'll simulate success.
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { 
      success: true, 
      message: 'Your message has been sent successfully!' 
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return { 
      success: false, 
      error: 'Something went wrong on the server. Please try again.' 
    };
  }
}