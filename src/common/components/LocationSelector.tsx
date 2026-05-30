import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { selectedCountryAtom } from '../data-access/atoms/location.atom';
import { useEventLocations } from '../hooks';
import { useBottomSheet } from '../hooks/components/useBottomSheet';
import { BottomSheet } from './BottomSheet';

export const LocationSelector = () => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);
  const { data: locations = [], isPending } = useEventLocations();
  const { visible, open, close } = useBottomSheet();

  const handleSelectCountry = useCallback(
    (country: string) => {
      setSelectedCountry(country);
      close();
    },
    [close, setSelectedCountry],
  );

  const renderLocation: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <S.LocationRow onPress={() => handleSelectCountry(item)}>
        <S.LocationLabel>{item}</S.LocationLabel>
      </S.LocationRow>
    ),
    [handleSelectCountry],
  );

  return (
    <>
      <S.SelectorButton
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={`Selected country: ${selectedCountry}. Tap to change.`}>
        <S.SelectorLabel>{selectedCountry}</S.SelectorLabel>
        <FontAwesome
          name="chevron-down"
          size={14}
          color={theme.colors.textMuted}
        />
      </S.SelectorButton>

      <BottomSheet
        visible={visible}
        onClose={close}
        title="Country"
        backdropAccessibilityLabel="Close country picker">
        <FlashList
          data={locations}
          renderItem={renderLocation}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          style={S.listStyle}
          ListEmptyComponent={
            isPending ? (
              <S.LoadingContainer>
                <ActivityIndicator color={theme.colors.primary} />
              </S.LoadingContainer>
            ) : (
              <S.EmptyLabel>No countries available</S.EmptyLabel>
            )
          }
        />
      </BottomSheet>
    </>
  );
};

namespace S {
  export const listStyle = { flex: 1 };

  export const SelectorButton = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: flex-start;
    min-width: 140px;
    padding-vertical: ${({ theme }) => theme.spacing.sm};
    padding-horizontal: ${({ theme }) => theme.spacing.md};
    border-radius: 8px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
  `;

  export const SelectorLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    margin-right: ${({ theme }) => theme.spacing.sm};
  `;

  export const LocationRow = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const LocationLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xl};
  `;

  export const EmptyLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg};
  `;
}
