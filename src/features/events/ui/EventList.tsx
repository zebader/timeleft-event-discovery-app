import type { Event } from '@/api/types';
import { useFilteredEvents } from '@/common/hooks';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { ActivityIndicator, RefreshControl } from 'react-native';
import type { EventsFilterParams } from '@/common/models/events-filters.types';
import { styled, useTheme } from 'styled-components/native';
import { EventListCard } from './EventListCard';

export const EventList = ({ filters = {} }: { filters?: EventsFilterParams }) => {
  const theme = useTheme();
  const { data: events = [], isPending, refetch, isRefetching } = useFilteredEvents({ filters });

  const renderEvent: ListRenderItem<Event> = ({ item }) => (
    <S.CardWrapper>
      <EventListCard event={item} />
    </S.CardWrapper>
  );

  return (
    <FlashList
      data={events}
      renderItem={renderEvent}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={S.listStyle}
      contentContainerStyle={S.listContent}
      refreshing={isRefetching}
      onRefresh={refetch}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]}
        />
      }
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

  export const listContent = {
    paddingHorizontal: 16,
    paddingBottom: 24,
  };

  export const CardWrapper = styled.View`
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `;

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

}