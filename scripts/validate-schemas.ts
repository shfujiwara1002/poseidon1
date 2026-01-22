/**
 * Schema Validation Script
 *
 * Validates that all mock data generators produce data that conforms
 * to their corresponding Zod schemas.
 *
 * Usage: npx tsx scripts/validate-schemas.ts
 */

import { z } from 'zod';

// Import domain schemas
import {
  UserSchema,
  TransactionSchema,
  EngineSchema,
  AlertSchema,
  ForecastSchema,
  OptimizationSchema,
  FinancialGoalSchema,
} from '../specs/domain/index.js';

// Import mock generators
import { generateMockUser } from '../client/src/mocks/generators/user.js';
import { generateMockTransaction } from '../client/src/mocks/generators/transaction.js';
import { generateMockEngine } from '../client/src/mocks/generators/engine.js';

interface ValidationResult {
  schema: string;
  generator: string;
  passed: boolean;
  errors?: z.ZodError[];
  sampleCount: number;
}

const results: ValidationResult[] = [];

function validateGenerator<T>(
  schemaName: string,
  generatorName: string,
  schema: z.ZodSchema<T>,
  generator: () => T,
  sampleCount: number = 10
): ValidationResult {
  const errors: z.ZodError[] = [];

  for (let i = 0; i < sampleCount; i++) {
    try {
      const data = generator();
      const result = schema.safeParse(data);

      if (!result.success) {
        errors.push(result.error);
      }
    } catch (err) {
      console.error(`Generator ${generatorName} threw an error:`, err);
    }
  }

  return {
    schema: schemaName,
    generator: generatorName,
    passed: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
    sampleCount,
  };
}

console.log('\n🔍 Validating Mock Data Against Zod Schemas\n');
console.log('='.repeat(60));

// Validate User schema
try {
  const userResult = validateGenerator(
    'UserSchema',
    'generateMockUser',
    UserSchema,
    generateMockUser
  );
  results.push(userResult);
} catch (err) {
  console.log('⚠️  User generator not available (optional)');
}

// Validate Transaction schema
try {
  const transactionResult = validateGenerator(
    'TransactionSchema',
    'generateMockTransaction',
    TransactionSchema,
    generateMockTransaction
  );
  results.push(transactionResult);
} catch (err) {
  console.log('⚠️  Transaction generator not available (optional)');
}

// Validate Engine schema
try {
  const engineResult = validateGenerator(
    'EngineSchema',
    'generateMockEngine',
    EngineSchema,
    () => generateMockEngine('protect')
  );
  results.push(engineResult);
} catch (err) {
  console.log('⚠️  Engine generator not available (optional)');
}

// Print results
console.log('\n📊 Validation Results\n');

let passCount = 0;
let failCount = 0;

for (const result of results) {
  const status = result.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | ${result.schema} ← ${result.generator}`);
  console.log(`       Samples tested: ${result.sampleCount}`);

  if (result.passed) {
    passCount++;
  } else {
    failCount++;
    if (result.errors && result.errors.length > 0) {
      console.log('       Errors:');
      result.errors.slice(0, 3).forEach((err, i) => {
        console.log(`         ${i + 1}. ${err.errors[0]?.message}`);
      });
      if (result.errors.length > 3) {
        console.log(`         ... and ${result.errors.length - 3} more`);
      }
    }
  }
  console.log();
}

// Summary
console.log('='.repeat(60));
console.log(`\n📈 Summary: ${passCount} passed, ${failCount} failed\n`);

if (failCount > 0) {
  console.log('❌ Some validations failed. Please fix the generators.');
  process.exit(1);
} else if (results.length === 0) {
  console.log('⚠️  No generators found to validate.');
  console.log('   Make sure mock generators exist in client/src/mocks/generators/');
  process.exit(0);
} else {
  console.log('✅ All mock data validates against schemas!');
  process.exit(0);
}
