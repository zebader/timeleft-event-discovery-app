import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import type { Event } from '@/api/types';
import { BottomSheet } from '@/common/components/BottomSheet';
import { selectedCategoryAtom } from '@/common/data-access/atoms/category.atom';
import { useEventCategories } from '@/common/hooks';
import { useBottomSheet } from '@/common/hooks/components/useBottomSheet';
import { useAtom } from 'jotai';

import { capitalizeString } from '../utils/eventListCardUtils';

export const CategoryFilter = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const { data: categories = [], isPending } = useEventCategories();
  const { visible, open, close } = useBottomSheet();

  const handleSelectCategory = useCallback(
    (category: Event['type']) => {
      setSelectedCategory(category);
      close();
    },
    [close, setSelectedCategory],
  );

  const renderCategory: ListRenderItem<Event['type']> = useCallback(
    ({ item }) => (
      <S.CategoryRow onPress={() => handleSelectCategory(item)}>
        <S.CategoryLabel>{capitalizeString(item)}</S.CategoryLabel>
      </S.CategoryRow>
    ),
    [handleSelectCategory],
  );

  return (
    <>
      <S.SelectorButton
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={`Selected category: ${selectedCategory}. Tap to change.`}>
        <S.SelectorLabel>{capitalizeString(selectedCategory)}</S.SelectorLabel>
      </S.SelectorButton>

      <BottomSheet
        visible={visible}
        onClose={close}
        title="Category"
        backdropAccessibilityLabel="Close category picker">
        <FlashList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          style={S.listStyle}
          ListEmptyComponent={
            isPending ? (
              <S.LoadingContainer>
                <ActivityIndicator color={theme.colors.primary} />
              </S.LoadingContainer>
            ) : (
              <S.EmptyLabel>No categories available</S.EmptyLabel>
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

  export const CategoryRow = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const CategoryLabel = styled.Text`
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
