import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import styled from 'styled-components/native';

import { BottomSheet } from '@/common/components/BottomSheet';
import { selectedSortByAtom, type EventSortByType } from '@/common/data-access/atoms/sort.atom';
import { useBottomSheet } from '@/common/hooks/components/useBottomSheet';

import {
  EVENT_SORT_OPTIONS,
  getEventSortLabel,
} from '../utils/eventSortUtils';

export const SortFilter = () => {
  const [sortBy, setSortBy] = useAtom(selectedSortByAtom);
  const { visible, open, close } = useBottomSheet();

  const handleSelectSort = useCallback(
    (value: EventSortByType) => {
      setSortBy(value);
      close();
    },
    [close, setSortBy],
  );

  const renderSortOption: ListRenderItem<(typeof EVENT_SORT_OPTIONS)[number]> =
    useCallback(
      ({ item }) => (
        <S.SortRow onPress={() => handleSelectSort(item.value)}>
          <S.SortLabel>{item.label}</S.SortLabel>
        </S.SortRow>
      ),
      [handleSelectSort],
    );

  return (
    <>
      <S.SelectorButton
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={`Selected sort: ${getEventSortLabel(sortBy)}. Tap to change.`}>
        <S.SelectorLabel>{getEventSortLabel(sortBy)}</S.SelectorLabel>
      </S.SelectorButton>

      <BottomSheet
        visible={visible}
        onClose={close}
        title="Sort by"
        backdropAccessibilityLabel="Close sort picker">
        <FlashList
          data={EVENT_SORT_OPTIONS}
          renderItem={renderSortOption}
          keyExtractor={(item) => item.value}
          showsVerticalScrollIndicator={false}
          style={S.listStyle}
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
    padding-vertical: ${({ theme }) => theme.spacing.sm};
    padding-horizontal: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.xl};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};
  `;

  export const SelectorLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const SortRow = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const SortLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;
}
