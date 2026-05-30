import type { Country } from '@/api/types';
import { atom } from 'jotai';

export const DEFAULT_COUNTRY: Country['name'] = 'Spain';

export type SelectedCountry = Country['name'];

export const selectedCountryAtom = atom<SelectedCountry>(DEFAULT_COUNTRY);
