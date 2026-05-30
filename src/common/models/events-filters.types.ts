import type { EventStatusType } from '../../api';

export type EventsFilterParams = {
  status?: EventStatusType;
  type?: string;
  /** Matches `event.zone.city.name` (case-insensitive). */
  city?: string;
  country?: string;
}

export type EventsSortField = 'date' | 'booked' | 'capacity';

export type EventsSortDirection = 'asc' | 'desc';

export type EventsSortParams = {
  field: EventsSortField;
  direction: EventsSortDirection;
}

export type UseFilteredEventsParams = {
  filters?: EventsFilterParams;
  sort?: EventsSortParams;
}
