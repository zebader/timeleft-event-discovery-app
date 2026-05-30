import type { Event } from '@/api/types';
import { useFilteredEvents } from '@/common/hooks';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { ActivityIndicator } from 'react-native';
import { EventsFilterParams } from 'src/common/models/events-filters.types';
import { styled, useTheme } from 'styled-components/native';

export const EventList = ({ filters = {} }: { filters?: EventsFilterParams }) => {
  const theme = useTheme();
  const { data: events = [], isPending } = useFilteredEvents({ filters });

  const renderEvent: ListRenderItem<Event> = ({ item }) => (
    <S.EventRow>
      <S.EventLabel>{item.zone.city.name}</S.EventLabel>
      <S.EventLabel>{item.type}</S.EventLabel>
      <S.EventLabel>{item.date}</S.EventLabel>
      <S.EventLabel>{item.booked}</S.EventLabel>
      <S.EventLabel>{item.capacity}</S.EventLabel>
      <S.EventLabel>{item.status}</S.EventLabel>
    </S.EventRow>
  );

  return (
    <FlashList
      data={events}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={S.listStyle}
      ListEmptyComponent={isPending ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} />
        </S.LoadingContainer>
      ) : (
        <S.EmptyLabel>No events available</S.EmptyLabel>)
      }
    />
  );
};

namespace S {
  export const listStyle = { flex: 1 };

  export const EmptyLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg};
  `;

  export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xl};
  `;

  export const EventRow = styled.View`
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const EventLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
  `;
}