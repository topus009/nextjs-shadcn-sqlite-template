export const apiRegister = async (
  fullName: string,
  email: string,
  password: string,
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
    }),
  });

  return parseInt(await res.text());
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

  return parseInt(await res.text());
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

  return parseInt(await res.text());
};

export const apiLogout = async () => {
  const res = await fetch("/api/users/logout", {
    method: "POST",
  });

  return res.status;
};

