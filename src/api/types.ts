export const EventStatus = {
  PAST: 'past',
  LIVE: 'live',
  UPCOMING: 'upcoming',
} as const;

export type EventStatusType = (typeof EventStatus)[keyof typeof EventStatus];

export type Country = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  country: Country;
};

export type Zone = {
  id: number;
  name: string;
  city: City;
};

export type Event = {
  id: string;
  type: string;
  date: string;
  zone: Zone;
  booked: number;
  capacity: number;
  status: EventStatusType;
};
