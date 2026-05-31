import { useCallback } from 'react';

import type { Event } from '../../api';
import { useEventsQuery } from '../queries/useEventsQuery';
import { selectEventDetails } from './utils/events-selectors';

export function useEventDetails(id: string) {
  const memoizedSelector = useCallback(
    (events: Event[]) => selectEventDetails(events, id),
    [id],
  );

  return useEventsQuery<Event | undefined>({
    select: memoizedSelector,
  });
}
