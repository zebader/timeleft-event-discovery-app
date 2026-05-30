# Expo HAS CHANGED

Read the exact versioned docs at <https://docs.expo.dev/versions/v54.0.0/> before writing any code.

## TypeScript conventions

- Prefer `type` aliases over `interface` for API and domain data schemas (e.g. `Event`, `Zone`, `Country`) so shapes stay consistent with union types like `EventStatus` and avoid accidental declaration merging.
- **Do not use TypeScript `enum`.** Use a `const` object with `as const` and a mapped union type instead. This keeps runtime values plain strings/numbers (matching the JSON API), avoids enum-specific emit quirks, and prevents accidental declaration merging. Example: `EventStatus` in `src/api/types.ts`.

```typescript
export const EventStatus = {
  PAST: 'past',
  LIVE: 'live',
  UPCOMING: 'upcoming',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];
```

### Import paths

- **Within the same domain** (sibling files, parent/child in the same subfolder tree — e.g. `common/hooks` importing `common/queries`, or `features/lobby/pages` importing `features/lobby/ui`): use standard relative paths (`./` or `../`). Do not use the `@/` alias for co-located or same-domain imports.
- **Across domains** (e.g. `common` → `features`, `features` → `common`, `app` → `src/common`, `src` → `app`): use the `@/` path alias (`@/*` maps to `src/*` per `tsconfig.json`).

```typescript
// ✅ common/hooks/useFilteredEvents.ts → common/queries (same domain)
import { useEventsQuery } from '../queries/useEventsQuery';
import { selectFilteredEvents } from '../models/events-selectors';

// ✅ features/lobby/pages/Lobby.tsx → common (cross-domain)
import { Text } from '@/common/components';

// ❌ Avoid alias for a sibling in the same folder domain
import { useEventsQuery } from '@/common/queries/useEventsQuery'; // when already under common/
```

## 1. Data Layer & TanStack React Query Rules

### D. Wrapper Hook Architecture & Folder Directory

- **ALWAYS** place specialized feature hooks (e.g., `useEventCategories`, `useFilteredEvents`, `useEventStats`) inside the designated hooks directory: `@/src/hooks/events/` (or our common hooks folder).
- **NEVER** replicate the `useQuery` initialization block, network logic, or query keys inside these files.
- **ALWAYS** import our centralized base query hook (`useEventsQuery`) and leverage its `select` option to perform client-side transformations.
- This pattern separates network concerns from data-shaping concerns, keeping our folder structure uniform and our UI consumption clean.

#### Architectural Blueprint for New Wrapper Hooks

```typescript
import { useCallback } from 'react';
// 1. ALWAYS import the base query hook from the API/Data layer
import { useEventsQuery } from '@/src/api/useEventsQuery'; 
// 2. ALWAYS import standalone pure selector functions from the selectors file
import { selectSpecificFeatureData } from '@/src/api/events-selectors'; 

export function useSpecificFeature(param1?: string) {
  // 3. ALWAYS memoize selectors that take dynamic arguments to preserve cache identity
  const memoizedSelector = useCallback(
    (events: Event[]) => selectSpecificFeatureData(events, param1),
    [param1]
  );

  // 4. ALWAYS return the base query executing the selector
  return useEventsQuery({
    select: memoizedSelector,
  });
}
```
