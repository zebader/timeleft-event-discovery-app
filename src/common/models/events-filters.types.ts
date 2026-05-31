import type { City, Event, EventStatusType } from '../../api';

export type EventsFilterParams = {
  status?: EventStatusType;
  type?: Event['type'];
  city?: City['name'];
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
