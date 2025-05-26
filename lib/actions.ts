'use server'

import {
  changePasswordFormSchema,
  contactFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
  registerFormSchema
} from './schema'
import { z } from 'zod'
import {
  apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiRegister
} from './apiCommunicator'
import {ValidationResult} from './validateUser'

export async function contactFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData))
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log(data)

    return {
      defaultValues: {
        name: '',
        email: '',
        message: '',
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

export async function loginFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = loginFormSchema.parse(Object.fromEntries(formData))
    const status = await apiLogin(data.email, data.password)

    if (status === 200) {
      return {
        defaultValues: {
          email: '',
          password: '',
        },
        success: true,
        errors: null,
      }
    } else if (status === 403) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Wrong email or password',
          path: ['email'],
        },
      ])
    } else {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'An error occurred during login',
          path: ['email'],
        },
      ])
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

export async function registerFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = registerFormSchema.parse(Object.fromEntries(formData))
    const response = await apiRegister(data.fullName, data.email, data.password);

    if (response === ValidationResult.TakenEmail) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Email already exists',
          path: ['email'],
        },
      ])
    }

    return {
      defaultValues: {
        fullName: '',
        email: '',
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

export async function forgotPasswordFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = forgotPasswordFormSchema.parse(Object.fromEntries(formData))
    const res = await apiForgotPassword(data.email)

    const errorMessages = {
      ResendConnectionError: 'Ошибка соединения с почтовым сервером',
      ResendUnhandledError: 'Ошибка при отправке письма',
      UserNotFound: 'Пользователь не найден',
    }

    const errorMessage = errorMessages[ValidationResult[res] as keyof typeof errorMessages];

    if (errorMessage) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: ['email'],
        },
      ])
    }

    return {
      defaultValues,
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

export async function changePasswordFormAction(
  _prevState: unknown,
  formData: FormData
) {
  const defaultValues = z
    .record(z.string(), z.string())
    .parse(Object.fromEntries(formData.entries()))

  try {
    const data = changePasswordFormSchema.parse(Object.fromEntries(formData))
    const res = await apiChangePassword(data.password, data.confirmPassword, data.token as string);

    const errorMessages = {
      UserNotFound: 'Пользователь не найден',
      InvalidChangePasswordToken: 'Токен не действителен',
    }

    const errorMessage = errorMessages[ValidationResult[res] as keyof typeof errorMessages];

    if (errorMessage) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: ['common'],
        },
      ])
    }

    return {
      defaultValues: {
        password: '',
        confirmPassword: '',
        token: data.token,
        email: data.email,
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(', '),
          ])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: null,
    }
  }
}

