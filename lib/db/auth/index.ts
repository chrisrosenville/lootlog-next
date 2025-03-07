import { TSignupCredentials, TLoginCredentials } from "@/types/form.types";
import { clientFetch } from "..";

export async function signUp(data: TSignupCredentials) {
  const response = await clientFetch(`/auth/sign-up`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export async function login(user: TLoginCredentials) {
  const response = await clientFetch(`/auth/sign-in`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function logout() {
  const response = await clientFetch(`/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
}

export async function refreshToken() {
  const response = await clientFetch(`/auth/refresh`, {
    method: "GET",
    credentials: "include",
  });

  return response;
}
