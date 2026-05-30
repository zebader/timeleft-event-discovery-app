import type { EventStatus } from '@/src/api';

export interface EventsFilterParams {
  status?: EventStatus;
  type?: string;
  /** Matches `event.zone.city.name` (case-insensitive). */
  city?: string;
}

export type EventsSortField = 'date' | 'booked' | 'capacity';

export type EventsSortDirection = 'asc' | 'desc';

export interface EventsSortParams {
  field: EventsSortField;
  direction: EventsSortDirection;
}

export interface UseFilteredEventsParams {
  filters?: EventsFilterParams;
  sort?: EventsSortParams;
}
