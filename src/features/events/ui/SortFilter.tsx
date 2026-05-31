import { useAtom } from 'jotai';
import { useCallback } from 'react';

import { FilterPicker } from '@/common/components/FilterPicker';
import { selectedSortByAtom, type EventSortByType } from '@/common/data-access/atoms/sort.atom';

import {
  EVENT_SORT_OPTIONS,
  getEventSortLabel,
} from '../utils/eventSortUtils';

export const SortFilter = () => {
  const [sortBy, setSortBy] = useAtom(selectedSortByAtom);

  const handleSelectSort = useCallback(
    (value: EventSortByType) => {
      setSortBy(value);
    },
    [setSortBy],
  );

  return (
    <FilterPicker
      selectedLabel={getEventSortLabel(sortBy)}
      accessibilityLabel={`Selected sort: ${getEventSortLabel(sortBy)}. Tap to change.`}
      sheetTitle="Sort by"
      backdropAccessibilityLabel="Close sort picker"
      data={EVENT_SORT_OPTIONS}
      keyExtractor={(item) => item.value}
      getItemLabel={(item) => item.label}
      onSelect={(item) => handleSelectSort(item.value)}
    />
  );
};
