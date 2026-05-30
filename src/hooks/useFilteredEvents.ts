import { useCallback } from 'react';

import type { Event } from '@/src/api';

import type { UseFilteredEventsParams } from './events-filters.types';
import { selectFilteredEvents } from './events-selectors';
import { useEventsQuery } from './useEventsQuery';

const EMPTY_FILTERS: UseFilteredEventsParams['filters'] = {};

export function useFilteredEvents(params: UseFilteredEventsParams = {}) {
  const filters = params.filters ?? EMPTY_FILTERS;
  const { sort } = params;

  const memoizedSelector = useCallback(
    (events: Event[]) => selectFilteredEvents(events, filters, sort),
    [filters, sort],
  );

  return useEventsQuery({
    select: memoizedSelector,
  });
}
