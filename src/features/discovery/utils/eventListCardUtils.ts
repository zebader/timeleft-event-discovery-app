import { EventStatus } from '@/api';
import type { Event, EventStatusType } from '@/api/types';
import type { ImageSourcePropType } from 'react-native';

const EVENT_ARTWORK = {
  run: require('../../../../assets/images/run.png'),
  drink: require('../../../../assets/images/drink.png'),
  dinner: require('../../../../assets/images/dinner.png'),
  generic: require('../../../../assets/images/generic.png'),
} as const satisfies Record<string, ImageSourcePropType>;

export function formatEventDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatEventHeadline(event: Event): string {
  const category =
    event.type.charAt(0).toUpperCase() + event.type.slice(1).toLowerCase();

  return `${category} - ${event.zone.city.name}`;
}

export function formatStatusLabel(status: EventStatusType): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getAvailabilityCount(event: Event): number {
  return event.capacity - event.booked;
}

export function getAvailabilityPercentage(event: Event): number {
  return 100 - ((event.booked / event.capacity) * 100);
}

export const AvailabilityLevel = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export type AvailabilityLevelType =
  (typeof AvailabilityLevel)[keyof typeof AvailabilityLevel];

export function getAvailabilityColor(event: Event): AvailabilityLevelType {
  const percentage = getAvailabilityPercentage(event);
  if (percentage >= 50) return AvailabilityLevel.HIGH;
  if (percentage >= 25) return AvailabilityLevel.MEDIUM;
  return AvailabilityLevel.LOW;
}

export type AvailabilityTextColorKey = 'success' | 'warning' | 'error';

export function getAvailabilityTextColorKey(
  level: AvailabilityLevelType,
): AvailabilityTextColorKey {
  switch (level) {
    case AvailabilityLevel.HIGH:
      return 'success';
    case AvailabilityLevel.MEDIUM:
      return 'warning';
    case AvailabilityLevel.LOW:
    default:
      return 'error';
  }
}

export function getStatusBackgroundKey(
  status: EventStatusType,
): 'statusLiveBackground' | 'statusUpcomingBackground' | 'statusPastBackground' {
  switch (status) {
    case EventStatus.LIVE:
      return 'statusLiveBackground';
    case EventStatus.UPCOMING:
      return 'statusUpcomingBackground';
    case EventStatus.PAST:
    default:
      return 'statusPastBackground';
  }
}

export function getEventArtworkImage(
  eventType: Event['type'],
): ImageSourcePropType {
  switch (eventType) {
    case 'run':
      return EVENT_ARTWORK.run;
    case 'drink':
      return EVENT_ARTWORK.drink;
    case 'dinner':
      return EVENT_ARTWORK.dinner;
    default:
      return EVENT_ARTWORK.generic;
  }
}
