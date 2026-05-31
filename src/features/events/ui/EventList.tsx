import type { Event } from '@/api/types';
import {
  selectedCityAtom,
  selectedSortByAtom,
  selectedStatusAtom,
} from '@/common/data-access/atoms';
import { useFilteredEvents } from '@/common/hooks';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { styled, useTheme } from 'styled-components/native';
import { EventListCard } from './EventListCard';
import { sortEvents } from '../utils/eventSortUtils';

export const EventList = () => {
  const theme = useTheme();
  const selectedCity = useAtomValue(selectedCityAtom);
  const selectedStatus = useAtomValue(selectedStatusAtom);
  const sortBy = useAtomValue(selectedSortByAtom);
  const { data: events = [], isPending, refetch, isRefetching } = useFilteredEvents({
    filters: { city: selectedCity, status: selectedStatus },
  });

  const sortedEvents = useMemo(
    () => sortEvents(events, sortBy),
    [events, sortBy],
  );

  const renderEvent: ListRenderItem<Event> = ({ item }) => (
    <S.CardWrapper>
      <EventListCard event={item} />
    </S.CardWrapper>
  );

  return (
    <FlashList
      data={sortedEvents}
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
