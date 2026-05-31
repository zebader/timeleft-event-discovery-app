import { useAtom } from 'jotai';
import { useCallback } from 'react';

import type { EventStatusType } from '@/api/types';
import { FilterPicker } from '@/common/components/FilterPicker';
import { selectedStatusAtom } from '@/common/data-access/atoms/status.atom';
import { useEventStatuses } from '@/common/hooks';

import { capitalizeString } from '../utils/eventListCardUtils';

export const StatusFilter = () => {
  const [selectedStatus, setSelectedStatus] = useAtom(selectedStatusAtom);
  const { data: statuses = [], isPending } = useEventStatuses();

  const handleSelectStatus = useCallback(
    (status: EventStatusType) => {
      setSelectedStatus(status);
    },
    [setSelectedStatus],
  );

  return (
    <FilterPicker
      selectedLabel={capitalizeString(selectedStatus)}
      accessibilityLabel={`Selected status: ${selectedStatus}. Tap to change.`}
      sheetTitle="Status"
      backdropAccessibilityLabel="Close status picker"
      data={statuses}
      keyExtractor={(item) => item}
      getItemLabel={capitalizeString}
      onSelect={handleSelectStatus}
      isPending={isPending}
      emptyLabel="No statuses available"
    />
  );
};
