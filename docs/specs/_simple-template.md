# Feature: [Feature Name]

> Write in plain English. Claude will translate this to technical specs.

## What is this?
[Describe what this feature does in 2-3 sentences]

## Who needs it and why?
- [User type] needs this to [accomplish goal]
- [User type] needs this to [accomplish goal]

## What should it do?
- [ ] [Describe a specific behavior or requirement]
- [ ] [Describe a specific behavior or requirement]
- [ ] [Describe a specific behavior or requirement]

## What does the UI look like?
[Describe the visual components, layout, and interactions]

- Main view: [describe]
- Key elements: [list them]
- User interactions: [click, hover, submit, etc.]

## What data does it need?
[Describe the information this feature works with]

- Inputs: [what data comes in]
- Outputs: [what data goes out]
- Storage: [what gets saved]

## What could go wrong?
| Situation | What should happen |
|-----------|-------------------|
| [Problem scenario] | [Expected behavior] |
| [Problem scenario] | [Expected behavior] |

## Related features
- Depends on: [list features this needs]
- Used by: [list features that need this]

## Notes
[Any other thoughts, constraints, or context]

---

## Technical Specs (Auto-generated)
> After running `/sync-spec [feature-name]`, Claude will fill in these paths:

- Domain schema: `specs/domain/[name].spec.ts`
- Component specs: `specs/components/features/[engine]/`
- Page spec: `specs/pages/[name].spec.ts` (if applicable)

---

## Status
- [ ] Spec written
- [ ] Claude reviewed
- [ ] Technical spec generated
- [ ] Implementation started
- [ ] Testing complete
- [ ] Deployed

## Changelog
| Date | Who | What changed |
|------|-----|--------------|
| YYYY-MM-DD | [name] | Initial draft |
