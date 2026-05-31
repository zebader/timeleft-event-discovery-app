import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { selectedCityAtom } from '../data-access/atoms/location.atom';
import { HOT_IN_CITY_LIMIT } from './utils/events-selectors';
import { useFilteredEvents } from './useFilteredEvents';

export function useHotInCityEvents() {
  const selectedCity = useAtomValue(selectedCityAtom);
  const query = useFilteredEvents({ filters: { city: selectedCity } });

  const data = useMemo(
    () => (query.data ?? []).slice(0, HOT_IN_CITY_LIMIT),
    [query.data],
  );

  return { ...query, data };
}
