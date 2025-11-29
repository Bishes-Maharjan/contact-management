export interface User {
  _id: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  _id: string;
  name: {
    first: string;
    last?: string;
  };
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  phone: string;
  email?: string;
  notes?: string;
  favorite?: boolean;
  belongsTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterData {
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

export interface ContactFormData {
  name: {
    first: string;
    last?: string;
  };
  phone: string;
  email?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  notes?: string;
  favorite?: boolean;
}


