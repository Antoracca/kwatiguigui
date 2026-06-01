// ===========================================================================
// KUSSALA V2 — TypeScript Type Definitions
// ===========================================================================

import type {
  UserType,
  PaymentMethod,
  PaymentStatus,
  PublicationStatus,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------
export interface Profile {
  id: string;
  firstName: string;
  age: number;
  whatsapp: string;
  phone: string | null;
  city: string;
  neighborhood: string;
  jobType: string;
  experience: string;
  userType: UserType;
  isActive: boolean;
  subscriptionPaid: boolean;
  expiryDate: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Job
// ---------------------------------------------------------------------------
export interface Job {
  id: string;
  userId: string;
  firstName: string;
  age: number;
  whatsapp: string | null; // null for non-premium viewers
  city: string;
  neighborhood: string;
  jobType: string;
  experience: string;
  userType: UserType;
  isActive: boolean;
  publicationStatus: PublicationStatus;
  createdAt: string;
  expiresAt: string;
}

// ---------------------------------------------------------------------------
// Payment
// ---------------------------------------------------------------------------
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference: string;
  transactionId: string;
  phoneNumber: string;
  createdAt: string;
  processedAt: string | null;
}

// ---------------------------------------------------------------------------
// Message
// ---------------------------------------------------------------------------
export interface Message {
  id: string;
  fromUserId: string | null;
  toUserId: string;
  subject: string;
  content: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  category: "job_inquiry" | "job_offer" | "general";
  createdAt: string;
}

// ---------------------------------------------------------------------------
// JobType (catalog)
// ---------------------------------------------------------------------------
export interface JobTypeCatalog {
  id: string;
  name: string;
  category: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// InfoContent
// ---------------------------------------------------------------------------
export interface InfoContent {
  id: string;
  type: "formation" | "stage" | "conseil";
  title: string;
  content: string;
  author: string;
  category: string;
  location: string;
  duration: string;
  level: string;
  isPublished: boolean;
  featured: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Admin User
// ---------------------------------------------------------------------------
export interface AdminUser {
  id: string;
  email: string;
  role: "superadmin" | "moderator";
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Subscription
// ---------------------------------------------------------------------------
export interface Subscription {
  id: string;
  userId: string;
  plan: "freemium" | "premium";
  status: "active" | "inactive" | "cancelled";
  startDate: string;
  endDate: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Audit Log
// ---------------------------------------------------------------------------
export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  details: Record<string, unknown>;
  ipAddress: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// API Response wrappers
// ---------------------------------------------------------------------------
export interface ApiResponse<T> {
  data: T;
  error: null;
}

export interface ApiError {
  data: null;
  error: {
    message: string;
    code: string;
    status: number;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// ---------------------------------------------------------------------------
// Search/Filter params
// ---------------------------------------------------------------------------
export interface JobSearchParams {
  query?: string;
  jobType?: string;
  userType?: UserType;
  page?: number;
  perPage?: number;
  sortBy?: "created_at" | "expires_at";
  sortOrder?: "asc" | "desc";
}
