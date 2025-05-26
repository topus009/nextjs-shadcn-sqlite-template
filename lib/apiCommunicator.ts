export const apiRegister = async (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      password,
      confirmPassword,
    }),
  });

  const text = await res.text();
  const parsed = parseInt(text);
  // If parsing fails or we get a 500 error, return -1 to indicate server error
  if (isNaN(parsed) || res.status >= 500) {
    return -1;
  }
  return parsed;
};

export const apiChangePassword = async (
  password: string,
  confirmPassword: string,
  token: string,
) => {
  const res = await fetch("/api/users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      confirmPassword,
      token,
    }),
  });

  const text = await res.text();
  const parsed = parseInt(text);
  // If parsing fails or we get a 500 error, return -1 to indicate server error
  if (isNaN(parsed) || res.status >= 500) {
    return -1;
  }
  return parsed;
};

export const apiLogin = async (email: string, password: string) => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.status;
};

export const apiForgotPassword = async (
  email: string,
) => {
  const res = await fetch("/api/users/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const text = await res.text();
  const parsed = parseInt(text);
  // If parsing fails or we get a 500 error, return -1 to indicate server error
  if (isNaN(parsed) || res.status >= 500) {
    return -1;
  }
  return parsed;
};

export const apiLogout = async () => {
  const res = await fetch("/api/users/logout", {
    method: "POST",
  });

  return res.status;
};

