# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## TypeScript conventions

- Prefer `type` aliases over `interface` for API and domain data schemas (e.g. `Event`, `Zone`, `Country`) so shapes stay consistent with union types like `EventStatus` and avoid accidental declaration merging.
- For enum-like values from the JSON API, use a `const` object with `as const` plus a mapped union type (see `EventStatus` in `src/api/types.ts`).
