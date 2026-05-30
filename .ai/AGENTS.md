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

## Lists (`FlashList`)

- **ALWAYS** use [`@shopify/flash-list`](https://shopify.github.io/flash-list/) (`FlashList`) for scrollable lists. **NEVER** use React Native's `FlatList` or `SectionList` for app UI lists.
- Install with `npx expo install @shopify/flash-list` when adding the dependency to a fresh project.
- Import `FlashList` and `ListRenderItem` from `@shopify/flash-list` (not `react-native`).
- `keyExtractor`, `renderItem`, `ListEmptyComponent`, and other list props are similar to `FlatList`; FlashList v2 (Expo SDK 54+) handles item sizing automatically.
- Give the list a bounded height when inside flex layouts (e.g. `flex: 1` on a parent in a sheet or screen).

```typescript
import { FlashList, type ListRenderItem } from '@shopify/flash-list';

const renderItem: ListRenderItem<string> = ({ item }) => <Row label={item} />;

<FlashList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item}
/>;
```

## Styling (styled-components)

- **ALWAYS** use `styled-components` for component and screen styling. Import from `styled-components/native` in React Native / Expo screens and feature UI.
- **ALWAYS** read design tokens from the theme (`src/theme/theme.ts`) via `${({ theme }) => theme...}` — do not hardcode colors, spacing, or font sizes when a theme value exists.
- **ALWAYS** colocate styled primitives for a screen or component in a `namespace S { ... }` block at the bottom of the same file. Prefix styled elements with `S.` in JSX (e.g. `<S.Container>`).
- **NEVER** use `StyleSheet.create`, inline style objects, or raw `react-native` `View`/`Text` wrappers for layout and visual styling in feature UI — reserve those only where styled-components cannot apply (e.g. third-party components with no styled wrapper yet).
- Shared cross-feature styled primitives may live under `src/common/ui/` (or feature `ui/` folders) using the same `namespace S` pattern.

```typescript
import styled from 'styled-components/native';

export const Lobby = () => (
  <S.Container>
    <S.Title>Lobby</S.Title>
  </S.Container>
);

namespace S {
  export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing[4]}px;
  `;

  export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  `;
}
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
