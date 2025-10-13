import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must be less than 50 characters.' })
    .regex(/^[a-zA-Z\s]*$/, { message: 'Name can only contain letters and spaces.' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address.' })
    .min(5, { message: 'Email must be at least 5 characters.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must be less than 1000 characters.' })
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
