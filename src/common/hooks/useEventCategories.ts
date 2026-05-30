import { useCallback } from 'react';

import { useEventsQuery } from '../queries/useEventsQuery';
import { selectEventCategories } from './utils/events-selectors';

export function useEventCategories() {
  const memoizedSelector = useCallback(selectEventCategories, []);

  return useEventsQuery({
    select: memoizedSelector,
  });
}
