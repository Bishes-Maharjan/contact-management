import type {
  Contact,
  ContactFormData,
  LoginData,
  RegisterData,
  User,
} from "./types";

const API_BASE_URL = "http://localhost:3000/api";

// Helper function for API calls
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }

  return data;
}

// Auth API
export const authAPI = {
  register: (data: RegisterData) =>
    fetchAPI<{ success: boolean; user: User }>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: LoginData) =>
    fetchAPI<{ success: boolean; user: User }>("/users/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: () => fetchAPI<{ user: User }>("/users/me"),

  logout: () =>
    fetchAPI<{ success: boolean; message: string }>("/users/logout", {
      method: "POST",
    }),
};

// Contacts API
export const contactsAPI = {
  getAll: () => fetchAPI<Contact[]>("/contacts"),

  create: (data: ContactFormData) =>
    fetchAPI<{ success: boolean; contact: Contact }>("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<ContactFormData>) =>
    fetchAPI<{ success: boolean; contact: Contact }>(`/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchAPI<{ success: boolean; message: string }>(`/contacts/${id}`, {
      method: "DELETE",
    }),
};
