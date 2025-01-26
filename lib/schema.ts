import { z } from 'zod'
import { validateName, validatePassword } from './validateUser'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(32, { message: 'Name must be at most 32 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z
    .string()
    .min(2, { message: 'Message must be at least 2 characters' })
    .max(1000, { message: 'Message must be at most 1000 characters' }),
})

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 6 characters' }),
})

export const forgotPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export const changePasswordFormSchema = z.object({
    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(32, { message: 'Password must be at most 32 characters' })
      .refine((value) => validatePassword(value), {
        message: 'Invalid password',
      }),
    confirmPassword: z.string(),
    email: z.string().optional(),
    token: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

    if (!data.email && !data.token) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either email or token is required',
        path: ['email', 'token'],
      });
    }
  }
});

export const registerFormSchema = z.object({
    fullName: z
      .string()
      .min(2, { message: 'FullName must be at least 2 characters' })
      .max(32, { message: 'FullName must be at most 32 characters' })
      .refine((value) => validateName(value), {
        message: 'Invalid full name',
      }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(32, { message: 'Password must be at most 32 characters' })
      .refine((value) => validatePassword(value), {
        message: 'Invalid password',
      }),
    confirmPassword: z.string()
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
  }
});
