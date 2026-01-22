/**
 * User Domain Specification
 *
 * Defines the core user entity for Poseidon.AI platform.
 * All user-related data must conform to these schemas.
 */

import { z } from 'zod';

// =============================================================================
// ENUMS
// =============================================================================

export const RiskProfileSchema = z.enum(['conservative', 'moderate', 'aggressive']);
export type RiskProfile = z.infer<typeof RiskProfileSchema>;

export const UserStatusSchema = z.enum(['active', 'onboarding', 'suspended', 'churned']);
export type UserStatus = z.infer<typeof UserStatusSchema>;

// =============================================================================
// MAIN SCHEMA
// =============================================================================

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url().nullable().optional(),

  // Risk & Financial Profile
  riskProfile: RiskProfileSchema,
  protectScore: z.number().min(0).max(100),
  netWorth: z.number().min(0),
  monthlyIncome: z.number().min(0),
  monthlySavingsRate: z.number().min(0).max(100), // percentage

  // Relationships
  financialGoalIds: z.array(z.string().uuid()),
  linkedAccountIds: z.array(z.string().uuid()),

  // Timestamps
  onboardedAt: z.string().datetime(),
  lastActiveAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  // Status
  status: UserStatusSchema,
});

export type User = z.infer<typeof UserSchema>;

// =============================================================================
// PARTIAL SCHEMAS (for updates, forms, etc.)
// =============================================================================

export const UserUpdateSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export const UserCreateSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastActiveAt: true,
  protectScore: true,
  financialGoalIds: true,
  linkedAccountIds: true,
}).extend({
  protectScore: z.number().min(0).max(100).default(50),
  financialGoalIds: z.array(z.string().uuid()).default([]),
  linkedAccountIds: z.array(z.string().uuid()).default([]),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
