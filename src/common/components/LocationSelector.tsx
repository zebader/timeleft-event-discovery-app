import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { useTheme } from 'styled-components/native';

import { selectedCityAtom } from '../data-access/atoms/location.atom';
import { useEventLocations } from '../hooks';
import { FilterPicker } from './FilterPicker';

export const LocationSelector = () => {
  const theme = useTheme();
  const [selectedCity, setSelectedCity] = useAtom(selectedCityAtom);
  const { data: locations = [], isPending } = useEventLocations();

  const handleSelectCity = useCallback(
    (city: string) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );

  return (
    <FilterPicker
      selectedLabel={selectedCity}
      accessibilityLabel={`Selected city: ${selectedCity}. Tap to change.`}
      sheetTitle="City"
      backdropAccessibilityLabel="Close city picker"
      data={locations}
      keyExtractor={(item) => item}
      getItemLabel={(item) => item}
      onSelect={handleSelectCity}
      isPending={isPending}
      emptyLabel="No cities available"
      minWidth={140}
      trailing={
        <FontAwesome
          name="chevron-down"
          size={14}
          color={theme.colors.textMuted}
        />
      }
    />
  );
};
