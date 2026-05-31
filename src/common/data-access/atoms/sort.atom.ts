import { atom } from 'jotai';

export const EventSortBy = {
  DATE: 'date',
  AVAILABILITY: 'availability',
} as const;

export type EventSortByType = (typeof EventSortBy)[keyof typeof EventSortBy];

export const DEFAULT_SORT_BY: EventSortByType = EventSortBy.DATE;

export const selectedSortByAtom = atom<EventSortByType>(DEFAULT_SORT_BY);
