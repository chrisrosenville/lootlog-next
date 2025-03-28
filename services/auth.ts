"use server";

import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashPassword } from "@/utils/password";
import { IRegisterCredentials, ILoginCredentials } from "@/types/user";

import { prisma } from "@/prisma/prisma";

export const login = async (credentials: ILoginCredentials) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.error("Error getting user details:", error);
  }
};

export const register = async (credentials: IRegisterCredentials) => {
  try {
    const hashedPassword = await hashPassword(credentials.password);

    const user = await prisma.user.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
        userName: credentials.userName,
        fullName: credentials.fullName,
      },
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      fullName: string;
      email: string;
      password: string;
      roleName: string;
      createdAt: Date;
      updatedAt: Date;
    } & DefaultSession["user"];
  }
}

// export async function signUp(data: TSignupCredentials) {
//   const response = await clientFetch(`/auth/sign-up`, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return response;
// }

// export async function login(user: TLoginCredentials) {
//   const response = await clientFetch(`/auth/sign-in`, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   return response;
// }

// export async function logout() {
//   const response = await clientFetch(`/auth/sign-out`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   return response;
// }

// export async function refreshToken() {
//   const response = await clientFetch(`/auth/refresh`, {
//     method: "GET",
//     credentials: "include",
//   });

//   return response;
// }

// export async function verifySessionToken(tokenValue: string) {
//   if (!tokenValue) return null;

//   try {
//     const res = await serverFetch(`/auth/verify`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `session=${tokenValue}`,
//       },
//       cache: "no-cache",
//     });

//     if (res.ok) return true;
//     else return false;
//   } catch (error) {
//     console.error("Error getting user details:", error);
//     throw new Error("No user details were found");
//   }
// }
