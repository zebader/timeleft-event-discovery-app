import type { City } from '@/api/types';
import { atom } from 'jotai';

export const DEFAULT_CITY: City['name'] = 'Madrid';

export type SelectedCity = City['name'];

export const selectedCityAtom = atom<SelectedCity>(DEFAULT_CITY);
