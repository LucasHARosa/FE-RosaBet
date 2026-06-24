
export interface FetcherOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  cache?: RequestCache; // https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
  next?: NextFetchRequestConfig;
  data?: unknown;
}

interface FetchResponse {
  response?: any;
  error?: any;
}

async function executeFetch(options: FetcherOptions): Promise<FetchResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = localStorage.getItem("token") || null;
  const authorization = token?.replace(/"/g, "");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
  };

  try {
    const response = await fetch(`${baseUrl}${options.url}`, {
      method: options.method || "GET",
      headers,
      body: options.data ? JSON.stringify(options.data) : undefined,
      cache: options.cache || "default",
      ...options.next,
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const error = {
        status: response.status,
        ...(contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text()),
      };
      return { error };
    }

    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    return { response: data };
  } catch (error: any) {
    return { error: { status: 500, ...error.message } }; // Default to 500 if there's an unexpected error
  }
}

export async function fetcher(options: FetcherOptions) {
  const { response, error } = await executeFetch(options);

  if (response) return response;

  const verifyUnauthorized = error?.status === 403;
  const verifyExpiredToken = error?.status === 401;
  //const timeOut = error?.status === 500;

  // if (timeOut) {
  //   window.alert("O servidor demorou demais a responder, tente novamente.");
  //   throw { ...error, status: error.status };
  // }

  if (verifyExpiredToken) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw { ...error, status: error.status };
  }

  if (verifyUnauthorized) {
    window.location.href = "/login";
    throw { ...error, status: error.status };
  }
  
  if (error) throw { ...error, status: error.status };
}
