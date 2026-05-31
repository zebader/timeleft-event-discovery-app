import type { Event } from '@/api/types';
import { selectedCategoryAtom } from '@/common/data-access/atoms/category.atom';
import { useEventCategories } from '@/common/hooks';
import { capitalizeString } from '@/features/events/utils/eventListCardUtils';
import { useRouter } from 'expo-router';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export const CategoryChipsSlider = () => {
  const theme = useTheme();
  const router = useRouter();
  const setSelectedCategory = useSetAtom(selectedCategoryAtom);
  const { data: categories = [], isPending } = useEventCategories();

  const handleCategoryPress = useCallback(
    (category: Event['type']) => {
      setSelectedCategory(category);
      router.push('/events');
    },
    [router, setSelectedCategory],
  );

  if (isPending) {
    return (
      <S.Container>
        <S.SectionTitle>Categories</S.SectionTitle>
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <S.SectionTitle>Categories</S.SectionTitle>

      <S.Slider
        horizontal
        showsHorizontalScrollIndicator={false}
        style={S.sliderStyle}
        contentContainerStyle={S.sliderContentStyle}>
        <S.ChipRow>
          {categories.map((category) => (
            <S.Chip
              key={category}
              onPress={() => handleCategoryPress(category)}
              accessibilityRole="button"
              accessibilityLabel={`Browse ${capitalizeString(category)} events`}>
              <S.ChipLabel>{capitalizeString(category)}</S.ChipLabel>
            </S.Chip>
          ))}
        </S.ChipRow>
      </S.Slider>
    </S.Container>
  );
};

namespace S {
  export const Container = styled.View`
    gap: ${({ theme }) => theme.spacing.md};
  `;

  export const SectionTitle = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const LoadingContainer = styled.View`
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg};
  `;

  export const Slider = styled(ScrollView)``;

  export const sliderStyle = {
    flexGrow: 0,
  };

  export const sliderContentStyle = {
    alignItems: 'flex-start' as const,
    paddingHorizontal: 4,
  };

  export const ChipRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  `;

  export const Chip = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radius.xl};
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.white};
  `;

  export const ChipLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
  `;
}
