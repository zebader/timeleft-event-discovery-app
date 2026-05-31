import type { Event } from '@/api/types';
import { useHotInCityEvents } from '@/common/hooks';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { HotInCityCard } from './HotInCityCard';

export const HotInCitySlider = () => {
  const router = useRouter();
  const { data: events = [] } = useHotInCityEvents();

  const handleEventPress = useCallback(
    (event: Event) => {
      router.push(`/events/${event.id}`);
    },
    [router],
  );

  const handleSeeAllPress = useCallback(() => {
    router.push('/events');
  }, [router]);

  if (events.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <S.HeaderRow>
        <S.SectionTitle>Hot in your city</S.SectionTitle>
        <S.SeeAllButton
          onPress={handleSeeAllPress}
          accessibilityRole="button"
          accessibilityLabel="See all events">
          <S.SeeAllLabel>See all</S.SeeAllLabel>
        </S.SeeAllButton>
      </S.HeaderRow>

      <S.Slider
        horizontal
        showsHorizontalScrollIndicator={false}
        style={S.sliderStyle}
        contentContainerStyle={S.sliderContentStyle}>
        {events.map((event) => (
          <HotInCityCard key={event.id} event={event} onPress={handleEventPress} />
        ))}
      </S.Slider>
    </S.Container>
  );
};

namespace S {
  export const Container = styled.View`
    gap: ${({ theme }) => theme.spacing.md};
  `;

  export const HeaderRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;

  export const SectionTitle = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const SeeAllButton = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.xs};
    padding-horizontal: ${({ theme }) => theme.spacing.sm};
  `;

  export const SeeAllLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.textMuted};
  `;

  export const Slider = styled(ScrollView)``;

  export const sliderStyle = {
    flexGrow: 0,
  };

  export const sliderContentStyle = {
    alignItems: 'flex-start' as const,
    paddingHorizontal: 4,
  };
}
