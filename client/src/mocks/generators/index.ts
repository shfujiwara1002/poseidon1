/**
 * Mock Generators Index
 *
 * Central export for all Poseidon.AI mock data generators.
 * All generators produce data validated against domain schemas.
 */

export * from './user.mock';
export * from './transaction.mock';
export * from './alert.mock';

// Convenience re-exports
export {
  generateMockUser,
  generateMockUsers,
  resetMockSeed,
} from './user.mock';

export {
  generateMockTransaction,
  generateMockTransactions,
  generateSuspiciousTransactions,
  resetTransactionSeed,
} from './transaction.mock';

export {
  generateMockAlert,
  generateMockAlerts,
  generateAlertsBySeverity,
  resetAlertSeed,
} from './alert.mock';
