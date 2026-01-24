/**
 * User Mock Generator
 *
 * Generates validated mock User data for development and testing.
 * All generated data is validated against UserSchema.
 */

import { UserSchema, type User, type RiskProfile } from '@specs/domain';

// Simple deterministic random for consistent mocks
let seed = 12345;
function random() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}

function randomInt(min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(random() * array.length)];
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const firstNames = ['Sarah', 'Marcus', 'Emily', 'James', 'Olivia', 'Michael', 'Emma', 'David'];
const lastNames = ['Chen', 'Johnson', 'Rodriguez', 'Williams', 'Kim', 'Patel', 'Garcia', 'Lee'];

function generateName(): string {
  return `${randomElement(firstNames)} ${randomElement(lastNames)}`;
}

function generateEmail(name: string): string {
  const [first, last] = name.toLowerCase().split(' ');
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'protonmail.com'];
  return `${first}.${last}${randomInt(1, 99)}@${randomElement(domains)}`;
}

function generateDate(daysAgo: number, variance: number = 30): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo - randomInt(0, variance));
  return date.toISOString();
}

export function generateMockUser(overrides?: Partial<User>): User {
  const name = overrides?.name || generateName();

  const user = {
    id: generateUUID(),
    email: generateEmail(name),
    name,
    avatarUrl: null,

    riskProfile: randomElement(['conservative', 'moderate', 'aggressive']) as RiskProfile,
    protectScore: randomInt(60, 98),
    netWorth: randomInt(10000, 500000),
    monthlyIncome: randomInt(3000, 25000),
    monthlySavingsRate: randomInt(5, 35),

    financialGoalIds: Array.from({ length: randomInt(1, 4) }, () => generateUUID()),
    linkedAccountIds: Array.from({ length: randomInt(1, 3) }, () => generateUUID()),

    onboardedAt: generateDate(180, 365),
    lastActiveAt: generateDate(0, 7),
    createdAt: generateDate(365, 180),
    updatedAt: generateDate(0, 14),

    status: 'active' as const,

    ...overrides,
  };

  // Validate against schema - fails fast if generator drifts from spec
  return UserSchema.parse(user);
}

export function generateMockUsers(count: number): User[] {
  return Array.from({ length: count }, () => generateMockUser());
}

// Reset seed for reproducible results
export function resetMockSeed(newSeed: number = 12345) {
  seed = newSeed;
}
