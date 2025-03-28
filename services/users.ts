import { TUser } from "@/types/user";
import { clientFetch } from "..";

export const getUserByIdAsAdmin = async (userId: number) => {
  try {
    const res = await clientFetch(`/users/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    return (await res.json()) as TUser;
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await clientFetch(`/users/whoami`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (res.ok) return (await res.json()) as TUser;
    else return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("No user details were found");
  }
};

export const checkAdminStatus = async () => {
  try {
    const res = await clientFetch(`/users/is-admin`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (res.ok) return (await res.json()) as boolean;
    else return null;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("No user details were found");
  }
};

export const updateUser = async (user: Partial<TUser>) => {
  try {
    const res = await clientFetch(`/users/${user.id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const res = await clientFetch(`/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

("use server");
import { revalidatePath } from "next/cache";

import { TUser } from "@/types/user";
import { getCookie } from "../auth/session";
import { serverFetch } from "..";

export const getCurrentUserFromServer = async () => {
  const cookie = await getCookie("session");
  if (!cookie?.value) return null;

  try {
    const res = await serverFetch(`/users/whoami`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
      cache: "no-store",
    });
    revalidatePath("/dashboard/user");

    return res;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw new Error("No user details were found");
  }
};

export const getAllUsers = async () => {
  const cookie = await getCookie("session");
  if (!cookie?.value) throw new Error("No session was found");

  try {
    const res = await serverFetch(`/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    return (await res.json()) as TUser[];
  } catch (error) {
    console.error("Error getting user details:", error);
    return null;
  }
};
