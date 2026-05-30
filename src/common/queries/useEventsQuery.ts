import { useQuery } from '@tanstack/react-query';

import type { Event } from '../../api';
import { eventsKeys, fetchEvents } from '../../api';

export function useEventsQuery<TData = Event[]>(options?: {
  select?: (data: Event[]) => TData;
}) {
  return useQuery<Event[], Error, TData>({
    queryKey: eventsKeys.all,
    queryFn: fetchEvents,
    select: options?.select,
  });
}
