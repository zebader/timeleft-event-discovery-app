import { getJson } from './client';
import { EVENTS_API_URL } from './config';
import type { Event } from './types';

export async function fetchEvents(): Promise<Event[]> {
  return getJson<Event[]>(EVENTS_API_URL);
}
