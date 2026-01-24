# Feature: [Feature Name]

## Status
- [ ] Spec Review
- [ ] Implementation
- [ ] Testing
- [ ] Deployed

## Overview
[Brief description of what this feature does and why it matters]

## User Stories
- As a [user type], I want [goal], so that [benefit]
- As a [user type], I want [goal], so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1: [Specific, testable requirement]
- [ ] Criterion 2: [Specific, testable requirement]
- [ ] Criterion 3: [Specific, testable requirement]

## API Contract
Reference: `shared/routes.ts`

### Endpoints
| Method | Path | Request Body | Response | Description |
|--------|------|--------------|----------|-------------|
| GET | /api/... | - | Schema | Description |
| POST | /api/... | Schema | Schema | Description |

### Zod Schemas
```typescript
// Reference or define schemas here
```

## Data Model
Reference: `shared/schema.ts`

### Tables Affected
| Table | Changes | Migration Required |
|-------|---------|-------------------|
| table_name | Description | Yes/No |

## UI Components
| Component | File Path | Description |
|-----------|-----------|-------------|
| ComponentName | `client/src/components/...` | What it does |

## State Management
- React Query keys used
- Local state requirements
- Context/store updates

## Edge Cases
| Scenario | Expected Behavior |
|----------|-------------------|
| Empty data | Show empty state |
| Error response | Display error message |
| Loading state | Show skeleton/spinner |

## Error Handling
| Error Type | User Message | Recovery Action |
|------------|--------------|-----------------|
| Network error | "Unable to connect" | Retry button |
| Validation error | "Invalid input" | Highlight fields |

## Dependencies
- **Depends on**: [List other specs/features this requires]
- **Depended by**: [List specs/features that require this]

## Security Considerations
- Authentication required: Yes/No
- Authorization rules: [Describe]
- Data validation: [Describe]

## Performance Considerations
- Caching strategy
- Pagination requirements
- Optimistic updates

## Implementation Notes
[Technical decisions, constraints, gotchas, or architectural notes]

## Testing Strategy
- Unit tests: [What to test]
- Integration tests: [What to test]
- E2E tests: [What to test]

## Changelog
| Date | Author | Changes |
|------|--------|---------|
| YYYY-MM-DD | Name | Initial spec |
