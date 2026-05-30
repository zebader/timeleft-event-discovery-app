import { useCallback } from 'react';

import type { Event } from '../../api';

import type { UseFilteredEventsParams } from '../models/events-filters.types';
import { useEventsQuery } from '../queries/useEventsQuery';
import { selectFilteredEvents } from './utils/events-selectors';

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
