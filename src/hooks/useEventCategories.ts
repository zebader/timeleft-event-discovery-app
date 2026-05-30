import { useCallback } from 'react';

import { selectEventCategories } from './events-selectors';
import { useEventsQuery } from './useEventsQuery';

export function useEventCategories() {
  const memoizedSelector = useCallback(selectEventCategories, []);

  return useEventsQuery({
    select: memoizedSelector,
  });
}
