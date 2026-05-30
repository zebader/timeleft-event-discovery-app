import { useCallback } from 'react';

import { useEventsQuery } from '../queries/useEventsQuery';
import { selectEventStatuses } from './utils/events-selectors';

export function useEventStatuses() {
  const memoizedSelector = useCallback(selectEventStatuses, []);

  return useEventsQuery({
    select: memoizedSelector,
  });
}
