import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useCallback, type ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { useBottomSheet } from '../hooks/components/useBottomSheet';
import { BottomSheet } from './BottomSheet';

export type FilterPickerProps<T> = {
  selectedLabel: string;
  accessibilityLabel: string;
  sheetTitle: string;
  backdropAccessibilityLabel: string;
  data: readonly T[];
  keyExtractor: (item: T) => string;
  getItemLabel: (item: T) => string;
  onSelect: (item: T) => void;
  isPending?: boolean;
  emptyLabel?: string;
  trailing?: ReactNode;
  minWidth?: number;
};

export function FilterPicker<T>({
  selectedLabel,
  accessibilityLabel,
  sheetTitle,
  backdropAccessibilityLabel,
  data,
  keyExtractor,
  getItemLabel,
  onSelect,
  isPending,
  emptyLabel = 'No options available',
  trailing,
  minWidth,
}: FilterPickerProps<T>) {
  const theme = useTheme();
  const { visible, open, close } = useBottomSheet();

  const handleSelect = useCallback(
    (item: T) => {
      onSelect(item);
      close();
    },
    [close, onSelect],
  );

  const renderItem: ListRenderItem<T> = useCallback(
    ({ item }) => (
      <S.OptionRow onPress={() => handleSelect(item)}>
        <S.OptionLabel>{getItemLabel(item)}</S.OptionLabel>
      </S.OptionRow>
    ),
    [getItemLabel, handleSelect],
  );

  const showEmptyState = isPending !== undefined;

  return (
    <>
      <S.SelectorButton
        $minWidth={minWidth}
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}>
        <S.SelectorLabel $hasTrailing={!!trailing}>{selectedLabel}</S.SelectorLabel>
        {trailing}
      </S.SelectorButton>

      <BottomSheet
        visible={visible}
        onClose={close}
        title={sheetTitle}
        backdropAccessibilityLabel={backdropAccessibilityLabel}>
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
          style={S.listStyle}
          ListEmptyComponent={
            showEmptyState ? (
              isPending ? (
                <S.LoadingContainer>
                  <ActivityIndicator color={theme.colors.primary} />
                </S.LoadingContainer>
              ) : (
                <S.EmptyLabel>{emptyLabel}</S.EmptyLabel>
              )
            ) : undefined
          }
        />
      </BottomSheet>
    </>
  );
}

namespace S {
  export const listStyle = { flex: 1 };

  export const SelectorButton = styled.Pressable<{ $minWidth?: number }>`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: flex-start;
    min-width: ${({ $minWidth }) => ($minWidth !== undefined ? `${$minWidth}px` : 'auto')};
    padding-vertical: ${({ theme }) => theme.spacing.sm};
    padding-horizontal: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radius.xl};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
  `;

  export const SelectorLabel = styled.Text<{ $hasTrailing?: boolean }>`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    margin-right: ${({ theme, $hasTrailing }) => ($hasTrailing ? theme.spacing.sm : '0px')};
  `;

  export const OptionRow = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const OptionLabel = styled.Text`
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
