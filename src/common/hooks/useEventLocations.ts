import { useCallback } from 'react';

import { useEventsQuery } from '../queries/useEventsQuery';
import { selectEventLocations } from './utils/events-selectors';

export function useEventLocations() {
  const memoizedSelector = useCallback(selectEventLocations, []);

  return useEventsQuery({
    select: memoizedSelector,
  });
}
