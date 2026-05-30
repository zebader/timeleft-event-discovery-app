import { useQuery } from '@tanstack/react-query';

import type { Event } from '@/src/api';
import { eventsKeys, fetchEvents } from '@/src/api';

export function useEventsQuery<TData = Event[]>(options?: {
  select?: (data: Event[]) => TData;
}) {
  return useQuery<Event[], Error, TData>({
    queryKey: eventsKeys.all,
    queryFn: fetchEvents,
    select: options?.select,
  });
}
