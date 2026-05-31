import type { Event } from '@/api/types';

import { atom } from 'jotai';

export const DEFAULT_CATEGORY: Event['type'] = 'dinner';

export type SelectedCategory = Event['type'];

export const selectedCategoryAtom = atom<SelectedCategory>(DEFAULT_CATEGORY);
