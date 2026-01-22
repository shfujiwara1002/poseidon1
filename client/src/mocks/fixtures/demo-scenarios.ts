/**
 * Demo Scenarios Fixtures
 *
 * Pre-built demo data for MIT CTO Program pitch presentation.
 * Three user personas demonstrating different use cases.
 */

import { type User, type Transaction, type Alert } from '@specs/domain';
import {
  generateMockUser,
  resetMockSeed,
} from '../generators/user.mock';
import {
  generateMockTransactions,
  generateSuspiciousTransactions,
  resetTransactionSeed,
} from '../generators/transaction.mock';
import {
  generateMockAlerts,
  generateAlertsBySeverity,
  resetAlertSeed,
} from '../generators/alert.mock';

// =============================================================================
// USER PERSONAS
// =============================================================================

// Reset seeds for reproducible demo data
resetMockSeed(42);

export const demoUsers = {
  /**
   * Conservative Retiree
   * High protection score, moderate net worth, focused on preservation
   */
  conservativeRetiree: generateMockUser({
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    riskProfile: 'conservative',
    protectScore: 94,
    netWorth: 850000,
    monthlyIncome: 4500,
    monthlySavingsRate: 15,
    status: 'active',
  }),

  /**
   * Aggressive Investor
   * High risk tolerance, higher income, growth-focused
   */
  aggressiveInvestor: generateMockUser({
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    riskProfile: 'aggressive',
    protectScore: 78,
    netWorth: 320000,
    monthlyIncome: 18000,
    monthlySavingsRate: 30,
    status: 'active',
  }),

  /**
   * New User
   * Just onboarded, moderate profile, exploring platform
   */
  newUser: generateMockUser({
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    riskProfile: 'moderate',
    protectScore: 85,
    netWorth: 45000,
    monthlyIncome: 6500,
    monthlySavingsRate: 12,
    financialGoalIds: [],
    status: 'active',
  }),
} satisfies Record<string, User>;

// =============================================================================
// TRANSACTIONS BY USER
// =============================================================================

resetTransactionSeed(100);

export const demoTransactions = {
  conservativeRetiree: generateMockTransactions(25, demoUsers.conservativeRetiree.id),
  aggressiveInvestor: generateMockTransactions(40, demoUsers.aggressiveInvestor.id),
  newUser: generateMockTransactions(15, demoUsers.newUser.id),
} satisfies Record<string, Transaction[]>;

// Suspicious transactions for demo
export const suspiciousTransactions = {
  conservativeRetiree: generateSuspiciousTransactions(2, demoUsers.conservativeRetiree.id),
  aggressiveInvestor: generateSuspiciousTransactions(5, demoUsers.aggressiveInvestor.id),
  newUser: generateSuspiciousTransactions(1, demoUsers.newUser.id),
} satisfies Record<string, Transaction[]>;

// =============================================================================
// ALERTS BY USER
// =============================================================================

resetAlertSeed(200);

export const demoAlerts = {
  conservativeRetiree: generateMockAlerts(3, demoUsers.conservativeRetiree.id),
  aggressiveInvestor: generateAlertsBySeverity(2, demoUsers.aggressiveInvestor.id),
  newUser: generateMockAlerts(1, demoUsers.newUser.id),
} satisfies Record<string, Alert[]>;

// =============================================================================
// DEMO DASHBOARD STATE
// =============================================================================

export const demoDashboardData = {
  user: demoUsers.conservativeRetiree,
  transactions: [
    ...demoTransactions.conservativeRetiree,
    ...suspiciousTransactions.conservativeRetiree,
  ],
  alerts: demoAlerts.conservativeRetiree,
  engines: [
    {
      id: 1,
      name: 'Protect',
      type: 'protect' as const,
      status: 'active' as const,
      metricLabel: 'Threat Score',
      metricValue: '0.02%',
      details: 'Real-time fraud detection',
      score: '0.02',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Grow',
      type: 'grow' as const,
      status: 'active' as const,
      metricLabel: 'Accuracy',
      metricValue: '98.4%',
      details: 'Cash flow forecasting',
      score: '98.4',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Optimize',
      type: 'optimize' as const,
      status: 'active' as const,
      metricLabel: 'Pending Savings',
      metricValue: '$408/yr',
      details: 'Automated execution',
      score: '408',
      lastUpdated: new Date().toISOString(),
    },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getDemoDataForUser(userKey: keyof typeof demoUsers) {
  return {
    user: demoUsers[userKey],
    transactions: demoTransactions[userKey],
    suspiciousTransactions: suspiciousTransactions[userKey],
    alerts: demoAlerts[userKey],
  };
}

export function getAllDemoTransactions(): Transaction[] {
  return [
    ...demoTransactions.conservativeRetiree,
    ...demoTransactions.aggressiveInvestor,
    ...demoTransactions.newUser,
    ...suspiciousTransactions.conservativeRetiree,
    ...suspiciousTransactions.aggressiveInvestor,
    ...suspiciousTransactions.newUser,
  ];
}

export function getAllDemoAlerts(): Alert[] {
  return [
    ...demoAlerts.conservativeRetiree,
    ...demoAlerts.aggressiveInvestor,
    ...demoAlerts.newUser,
  ];
}
