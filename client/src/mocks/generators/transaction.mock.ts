/**
 * Transaction Mock Generator
 *
 * Generates validated mock Transaction data for development and testing.
 */

import {
  TransactionSchema,
  type Transaction,
  type TransactionType,
  type TransactionCategory,
  type TransactionStatus,
  type RiskFlag,
} from '@specs/domain';

let seed = 67890;
function random() {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}

function randomInt(min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number) {
  return random() * (max - min) + min;
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

function generateDate(daysAgo: number, variance: number = 7): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo - randomInt(0, variance));
  return date.toISOString();
}

const merchants: Record<TransactionCategory, string[]> = {
  salary: ['Acme Corp', 'Tech Solutions Inc', 'Global Industries'],
  investment_income: ['Vanguard', 'Fidelity', 'Charles Schwab'],
  freelance: ['Upwork', 'Fiverr Client', 'Direct Client'],
  other_income: ['Tax Refund', 'Gift', 'Rebate'],
  housing: ['Apartment Complex', 'Mortgage Co', 'Property Management'],
  transportation: ['Shell', 'Chevron', 'Uber', 'Lyft', 'City Transit'],
  food: ['Whole Foods', 'Trader Joe\'s', 'Chipotle', 'Starbucks', 'DoorDash'],
  utilities: ['PG&E', 'Comcast', 'AT&T', 'Water Company'],
  healthcare: ['CVS Pharmacy', 'Kaiser', 'Blue Cross', 'Walgreens'],
  entertainment: ['Netflix', 'Spotify', 'AMC Theaters', 'Steam'],
  shopping: ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Nike'],
  subscriptions: ['Adobe', 'Microsoft 365', 'Gym Membership', 'NY Times'],
  debt_payment: ['Chase Card', 'Amex', 'Student Loan Corp', 'Auto Loan'],
  other_expense: ['Misc Purchase', 'Service Fee', 'Unknown'],
  savings_transfer: ['High Yield Savings', 'Emergency Fund'],
  investment_transfer: ['Brokerage Account', 'IRA', '401k'],
  account_transfer: ['Checking to Savings', 'External Transfer'],
};

const categoryToType: Record<TransactionCategory, TransactionType> = {
  salary: 'income',
  investment_income: 'income',
  freelance: 'income',
  other_income: 'income',
  housing: 'expense',
  transportation: 'expense',
  food: 'expense',
  utilities: 'expense',
  healthcare: 'expense',
  entertainment: 'expense',
  shopping: 'expense',
  subscriptions: 'expense',
  debt_payment: 'expense',
  other_expense: 'expense',
  savings_transfer: 'transfer',
  investment_transfer: 'transfer',
  account_transfer: 'transfer',
};

const amountRanges: Record<TransactionCategory, [number, number]> = {
  salary: [3000, 15000],
  investment_income: [100, 5000],
  freelance: [500, 5000],
  other_income: [50, 1000],
  housing: [1000, 3500],
  transportation: [20, 200],
  food: [10, 150],
  utilities: [50, 300],
  healthcare: [20, 500],
  entertainment: [10, 100],
  shopping: [20, 500],
  subscriptions: [10, 100],
  debt_payment: [100, 1000],
  other_expense: [10, 200],
  savings_transfer: [100, 2000],
  investment_transfer: [100, 5000],
  account_transfer: [50, 1000],
};

export function generateMockTransaction(overrides?: Partial<Transaction>): Transaction {
  const category = overrides?.category || randomElement(Object.keys(merchants) as TransactionCategory[]);
  const type = categoryToType[category];
  const [minAmount, maxAmount] = amountRanges[category];
  const merchantList = merchants[category];

  // Determine risk based on random chance
  let riskFlag: RiskFlag = 'none';
  let riskScore: number | null = null;
  const riskChance = random();
  if (riskChance > 0.95) {
    riskFlag = 'critical';
    riskScore = randomInt(90, 100);
  } else if (riskChance > 0.9) {
    riskFlag = 'high';
    riskScore = randomInt(70, 89);
  } else if (riskChance > 0.85) {
    riskFlag = 'medium';
    riskScore = randomInt(40, 69);
  } else if (riskChance > 0.8) {
    riskFlag = 'low';
    riskScore = randomInt(20, 39);
  }

  const transaction = {
    id: generateUUID(),
    userId: overrides?.userId || generateUUID(),
    accountId: generateUUID(),

    amount: type === 'income'
      ? randomFloat(minAmount, maxAmount)
      : -randomFloat(minAmount, maxAmount),
    currency: 'USD' as const,
    type,
    category,
    description: `${type === 'income' ? 'Payment from' : 'Payment to'} ${randomElement(merchantList)}`,
    merchantName: randomElement(merchantList),
    merchantCategory: category,

    status: 'completed' as TransactionStatus,
    processedAt: generateDate(0, 1),

    riskFlag,
    riskScore,
    riskReasons: riskFlag !== 'none' ? ['Unusual pattern detected', 'Location mismatch'] : [],

    optimizationApplied: random() > 0.8,
    optimizationId: random() > 0.8 ? generateUUID() : null,
    potentialSavings: random() > 0.7 ? randomFloat(5, 50) : null,

    timestamp: generateDate(randomInt(0, 30)),
    createdAt: generateDate(randomInt(0, 30)),
    updatedAt: generateDate(0, 1),

    ...overrides,
  };

  return TransactionSchema.parse(transaction);
}

export function generateMockTransactions(count: number, userId?: string): Transaction[] {
  return Array.from({ length: count }, () =>
    generateMockTransaction(userId ? { userId } : undefined)
  );
}

export function generateSuspiciousTransactions(count: number, userId?: string): Transaction[] {
  const riskFlags: RiskFlag[] = ['low', 'medium', 'high', 'critical'];
  return Array.from({ length: count }, (_, i) =>
    generateMockTransaction({
      userId,
      riskFlag: riskFlags[i % riskFlags.length],
      riskScore: randomInt(30 + i * 15, 50 + i * 15),
    })
  );
}

export function resetTransactionSeed(newSeed: number = 67890) {
  seed = newSeed;
}
