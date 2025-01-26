enum ValidationResult {
  None,
  InvalidEmail,
  InvalidPassword,
  InvalidFullName,
  TakenEmail,
  NotPost,
  NotAllFieldsPassed,
  UserNotFound,
  ForgotPasswordSuccess,
  ResendUnhandledError,
  ResendConnectionError,
  InvalidChangePasswordToken,
}

export const validatePassword = (password?: string) =>
  password && /[a-z,A-Z,0-9,@$!%*#?&]/.test(password);

export const validateName = (name?: string) =>
  name && /[a-z\sA-Z]/.test(name);

export { ValidationResult };
