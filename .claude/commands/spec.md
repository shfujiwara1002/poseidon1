# Generate or Update Plain English Specification

When this command is invoked with `/spec [feature-name]`:

## Purpose
Create or update a **plain English** specification that non-technical users can write and understand.
Technical Zod specs are generated separately via `/sync-spec`.

## Workflow

### 1. Check for existing spec
- Look for `docs/specs/[feature-name].md`
- If exists, read it and offer to update specific sections
- If not, create from simplified template

### 2. Gather requirements (conversational)
Ask the user in plain language:
- **What is this?** - Brief description
- **Who needs it?** - User types and their goals
- **What should it do?** - Specific behaviors (checklist format)
- **What does it look like?** - UI description
- **What data does it use?** - Inputs, outputs, storage
- **What could go wrong?** - Error scenarios

### 3. Create/Update the spec
- Use template: `docs/specs/_simple-template.md`
- Write in **plain English** - no code, no Zod
- Focus on WHAT, not HOW
- Keep technical jargon minimal

### 4. Suggest next steps
After creating the plain English spec:
```
Spec created! Next steps:
1. Review and edit docs/specs/[feature-name].md
2. When ready, run /sync-spec [feature-name] to generate technical specs
```

## Template Location
`docs/specs/_simple-template.md` (simplified, plain English)
`docs/specs/_template.md` (detailed, for reference)

## Example Usage

```
User: /spec notifications
Claude: I'll help you create a spec for notifications. Let me ask a few questions in plain English...

What is the notifications feature? What problem does it solve?
```

## Plain English Spec Sections
- [ ] What is this? (overview)
- [ ] Who needs it and why? (users/goals)
- [ ] What should it do? (requirements checklist)
- [ ] What does the UI look like? (visual description)
- [ ] What data does it need? (inputs/outputs)
- [ ] What could go wrong? (error scenarios)
- [ ] Related features (dependencies)
- [ ] Notes (constraints, context)
- [ ] Status tracking
- [ ] Changelog

## Important Notes
- **No code in this file** - save that for /sync-spec
- **No Zod schemas** - those are generated automatically
- **Plain language only** - anyone should be able to read/edit this
- Think of this as a product requirements document, not technical spec
