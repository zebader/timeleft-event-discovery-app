import { EventStatus, type EventStatusType } from '@/api/types';

import { atom } from 'jotai';

export const DEFAULT_STATUS: EventStatusType = EventStatus.UPCOMING;

export type SelectedStatus = EventStatusType;

export const selectedStatusAtom = atom<SelectedStatus>(DEFAULT_STATUS);
