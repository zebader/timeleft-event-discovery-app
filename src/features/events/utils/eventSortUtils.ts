import type { Event } from '@/api/types';
import type { EventSortByType } from '@/common/data-access/atoms/sort.atom';

export const EVENT_SORT_OPTIONS: { value: EventSortByType; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'availability', label: 'Availability' },
];

function openSlots(event: Event): number {
  return event.capacity - event.booked;
}

export function sortEvents(events: Event[], sortBy: EventSortByType): Event[] {
  const sorted = [...events];

  if (sortBy === 'date') {
    return sorted.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  return sorted.sort((a, b) => openSlots(a) - openSlots(b));
}

export function getEventSortLabel(sortBy: EventSortByType): string {
  return EVENT_SORT_OPTIONS.find((option) => option.value === sortBy)?.label ?? sortBy;
}
