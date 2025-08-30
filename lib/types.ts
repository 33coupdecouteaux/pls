// Shared type definitions for the application

import type React from 'react';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@/server/trpc/appRouter';

// TRPC output types
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type Listing = RouterOutputs['listing']['list'][number];

// Analytics types
export interface AnalyticsProperty {
  id: string;
  title: string;
  price: string;
  views: number;
  inquiries: number;
  favorites: number;
}

export interface ActivityItem {
  id: string;
  type: 'view' | 'inquiry' | 'favorite' | 'booking';
  title: string;
  timestamp: string;
  user?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  property: string;
  time: string;
}

// Project item type (from basehub/CMS)
export interface ProjectItemFragment {
  _title: string;
  _slug: string;
  description: {
    json: unknown[];
    text: string;
  };
  year: string | null;
  location: string | null;
  mainImage: {
    url: string;
    alt: string | null;
  } | null;
  gallery: Array<{
    url: string;
    alt: string | null;
  }> | null;
}

// Session type (based on better-auth)
export interface UserSession {
  userId: string;
  sessionId: string;
  expiresAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

// Extended context type for authenticated procedures
export interface AuthenticatedContext {
  session: UserSession;
}