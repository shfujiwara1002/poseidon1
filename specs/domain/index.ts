/**
 * Domain Specifications Index
 *
 * Central export for all Poseidon.AI domain Zod schemas.
 * Import from '@specs/domain' to access all domain types.
 */

// User
export * from './user.spec';

// Transactions
export * from './transaction.spec';

// Engines
export * from './engine.spec';

// Alerts (Protect Engine)
export * from './alert.spec';

// Forecasts (Grow Engine)
export * from './forecast.spec';

// Optimizations (Optimize Engine)
export * from './optimization.spec';

// Financial Goals
export * from './financial-goal.spec';
