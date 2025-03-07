const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const INTERNAL_API_URL =
  process.env.NEXT_INTERNAL_API_URL || "http://backend-dev:3456";

export async function serverFetch(path: string, options: RequestInit = {}) {
  try {
    // For server components, use the internal Docker network URL
    const res = await fetch(`${INTERNAL_API_URL}${path}`, {
      ...options,
    });

    return res;
  } catch (error) {
    console.error("Server fetch error:", error);
    throw error;
  }
}

export async function clientFetch(path: string, options: RequestInit = {}) {
  // For client components, use the public URL through Nginx
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
  });

  return res;
}
