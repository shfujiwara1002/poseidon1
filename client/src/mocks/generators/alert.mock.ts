/**
 * Alert Mock Generator
 *
 * Generates validated mock Alert data for the Protect engine.
 */

import {
  AlertSchema,
  type Alert,
  type AlertType,
  type AlertSeverity,
  type AlertStatus,
} from '@specs/domain';
import { type RiskFlag } from '@specs/domain';

let seed = 11111;
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

function generateDate(daysAgo: number, variance: number = 3): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo - randomInt(0, variance));
  return date.toISOString();
}

const alertTemplates: Record<AlertType, { titles: string[]; messages: string[] }> = {
  fraud: {
    titles: [
      'Suspicious transaction detected',
      'Potential fraudulent activity',
      'Unusual spending pattern',
      'Card-not-present fraud attempt',
    ],
    messages: [
      'A transaction of ${{amount}} was attempted from an unusual location.',
      'Multiple rapid transactions detected within a short time frame.',
      'This transaction deviates significantly from your normal spending pattern.',
      'Potential card skimming detected at merchant location.',
    ],
  },
  anomaly: {
    titles: [
      'Unusual account activity',
      'Spending anomaly detected',
      'Income pattern change',
      'Account behavior deviation',
    ],
    messages: [
      'Your spending in this category has increased by 300% compared to last month.',
      'An unusual deposit was detected that doesn\'t match your income pattern.',
      'Login from a new device and location was detected.',
      'Account access pattern differs from your normal behavior.',
    ],
  },
  threshold: {
    titles: [
      'Budget threshold exceeded',
      'Spending limit reached',
      'Monthly cap warning',
      'Category overspend alert',
    ],
    messages: [
      'You have exceeded your monthly dining budget by ${{amount}}.',
      'Your entertainment spending has reached 90% of your set limit.',
      'Total monthly spending is approaching your defined threshold.',
      'Shopping category spending exceeds historical average.',
    ],
  },
  security: {
    titles: [
      'Security verification required',
      'Password change detected',
      'New device login',
      'Account settings modified',
    ],
    messages: [
      'Please verify your identity to continue with this transaction.',
      'Your account password was changed from a new device.',
      'A login was detected from an unrecognized device.',
      'Critical account settings were modified recently.',
    ],
  },
  compliance: {
    titles: [
      'Compliance review needed',
      'Document verification required',
      'Regulatory update',
      'KYC refresh required',
    ],
    messages: [
      'Your account requires additional documentation for compliance.',
      'Annual identity verification is due for your account.',
      'New regulations require updated information from all users.',
      'Please complete the required compliance questionnaire.',
    ],
  },
};

const severityToRiskScore: Record<AlertSeverity, [number, number]> = {
  low: [10, 30],
  medium: [31, 60],
  high: [61, 85],
  critical: [86, 100],
};

const severityToRiskFlag: Record<AlertSeverity, RiskFlag> = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
};

export function generateMockAlert(overrides?: Partial<Alert>): Alert {
  const type = overrides?.type || randomElement(['fraud', 'anomaly', 'threshold', 'security', 'compliance'] as AlertType[]);
  const severity = overrides?.severity || randomElement(['low', 'medium', 'high', 'critical'] as AlertSeverity[]);
  const templates = alertTemplates[type];
  const [minScore, maxScore] = severityToRiskScore[severity];

  const title = randomElement(templates.titles);
  const message = randomElement(templates.messages).replace('{{amount}}', String(randomInt(50, 2000)));

  const alert = {
    id: generateUUID(),
    userId: overrides?.userId || generateUUID(),

    type,
    severity,
    status: 'active' as AlertStatus,

    title,
    message,
    details: {
      source: 'Poseidon.AI Protect Engine',
      model_version: '2.1.0',
      detection_time_ms: randomInt(50, 500),
    },

    riskScore: randomInt(minScore, maxScore),
    confidence: randomInt(70, 99),
    riskFlag: severityToRiskFlag[severity],

    transactionId: random() > 0.3 ? generateUUID() : null,
    relatedAlertIds: [],

    dismissedAt: null,
    dismissedBy: null,
    dismissReason: null,
    resolvedAt: null,
    resolution: null,

    createdAt: generateDate(randomInt(0, 7)),
    updatedAt: generateDate(0, 1),
    expiresAt: null,

    ...overrides,
  };

  return AlertSchema.parse(alert);
}

export function generateMockAlerts(count: number, userId?: string): Alert[] {
  return Array.from({ length: count }, () =>
    generateMockAlert(userId ? { userId } : undefined)
  );
}

export function generateAlertsBySeverity(countPerSeverity: number, userId?: string): Alert[] {
  const severities: AlertSeverity[] = ['low', 'medium', 'high', 'critical'];
  return severities.flatMap(severity =>
    Array.from({ length: countPerSeverity }, () =>
      generateMockAlert({ userId, severity })
    )
  );
}

export function resetAlertSeed(newSeed: number = 11111) {
  seed = newSeed;
}
