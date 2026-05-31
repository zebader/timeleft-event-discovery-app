import type { Country, Event, EventStatusType } from '../../../api';

import type {
  EventsFilterParams,
  EventsSortParams,
} from '../../models/events-filters.types';

export function selectEventCategories(events: Event[]): string[] {
  const types = new Set(events.map((event) => event.type));
  return Array.from(types).sort((a, b) => a.localeCompare(b));
}

/* TODO:We will use only countries for now */
export function selectEventLocations(events: Event[]): Country['name'][] {
  const locations = new Set(events.map((event) => event.zone.city.country.name));
  return Array.from(locations).sort((a, b) => a.localeCompare(b));
}

export function selectEventStatuses(events: Event[]): EventStatusType[] {
  const statuses = new Set(events.map((event) => event.status));
  return Array.from(statuses).sort((a, b) => a.localeCompare(b));
}

export function selectEventDetails(events: Event[], id: string): Event | undefined {
  return events.find((event) => event.id === id);
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
  if (filters.country !== undefined) {
    const country = filters.country.trim().toLowerCase();
    if (country.length > 0 && event.zone.city.country.name.toLowerCase() !== country) {
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
