declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_COOKIE_SECRET: string;
      SESSION_COOKIE_NAME: string;
      SESSION_EXPIRATION_TIME: string;
      RESEND_TOKEN: string;
      CHANGE_PASSWORD_SECRET: string;
      RESEND_MAIL_TO: string;
    }
  }
  interface User {
    id: number;
    password: string;
    email: string;
    fullName: string;
    avatar?: string;
    isAdmin?: boolean;
  }

  interface ChangePasswordTokens {
    id: number;
    email: string;
    changePasswordToken: string;
  }
}

export {};
