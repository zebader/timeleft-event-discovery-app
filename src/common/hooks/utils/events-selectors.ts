import type { Event } from '../../../api';

import type {
    EventsFilterParams,
    EventsSortParams,
} from '../../models/events-filters.types';

export function selectEventCategories(events: Event[]): string[] {
  const types = new Set(events.map((event) => event.type));
  return Array.from(types).sort((a, b) => a.localeCompare(b));
}

function matchesFilters(event: Event, filters: EventsFilterParams): boolean {
  if (filters.status !== undefined && event.status !== filters.status) {
    return false;
  }

  if (filters.type !== undefined && event.type !== filters.type) {
    return false;
  }

  if (filters.city !== undefined) {
    const city = filters.city.trim().toLowerCase();
    if (city.length > 0 && event.zone.city.name.toLowerCase() !== city) {
      return false;
    }
  }

  return true;
}

function compareEvents(
  a: Event,
  b: Event,
  { field, direction }: EventsSortParams,
): number {
  let result = 0;

  switch (field) {
    case 'date':
      result =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      break;
    case 'booked':
      result = a.booked - b.booked;
      break;
    case 'capacity':
      result = a.capacity - b.capacity;
      break;
  }

  return direction === 'asc' ? result : -result;
}

export function selectFilteredEvents(
  events: Event[],
  filters: EventsFilterParams = {},
  sort?: EventsSortParams,
): Event[] {
  const filtered = events.filter((event) => matchesFilters(event, filters));

  if (!sort) {
    return filtered;
  }

  return [...filtered].sort((a, b) => compareEvents(a, b, sort));
}
