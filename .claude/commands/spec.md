# Generate or Update Feature Specification

When this command is invoked with `/spec [feature-name]`:

## Workflow

1. **Check for existing spec**
   - Look for `docs/specs/[feature-name].md`
   - If exists, read it and offer to update specific sections
   - If not, create from template

2. **Gather requirements** (for new specs)
   Ask the user about:
   - What does this feature do? (Overview)
   - Who uses it and why? (User Stories)
   - What must be true when complete? (Acceptance Criteria)
   - What API endpoints are needed? (API Contract)
   - What could go wrong? (Edge Cases)

3. **Reference existing code**
   Always check and link to:
   - Zod schemas in `shared/routes.ts`
   - Database tables in `shared/schema.ts`
   - Existing components in `client/src/components/`
   - Related specs in `docs/specs/`

4. **Create/Update the spec**
   - Use template from `docs/specs/_template.md`
   - Fill in all sections with gathered information
   - Mark status checkboxes appropriately
   - Add to changelog

5. **Update memory**
   - Add spec to `memory/current-sprint.md` if implementing soon
   - Note any architectural decisions in `memory/context.md`

## Template Location
`docs/specs/_template.md`

## Example Usage

```
User: /spec user-authentication
Claude: I'll create a spec for user authentication. Let me ask a few questions...
```

## Spec Sections Checklist
- [ ] Status (review/implementation/testing/deployed)
- [ ] Overview
- [ ] User Stories
- [ ] Acceptance Criteria
- [ ] API Contract (with Zod references)
- [ ] Data Model (with schema.ts references)
- [ ] UI Components (with file paths)
- [ ] State Management
- [ ] Edge Cases
- [ ] Error Handling
- [ ] Dependencies
- [ ] Security Considerations
- [ ] Performance Considerations
- [ ] Implementation Notes
- [ ] Testing Strategy
- [ ] Changelog
