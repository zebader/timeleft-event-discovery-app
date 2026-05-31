import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { EventStatusType } from '@/api/types';
import { BottomSheet } from '@/common/components/BottomSheet';
import { selectedStatusAtom } from '@/common/data-access/atoms/status.atom';
import { useEventStatuses } from '@/common/hooks';
import { useBottomSheet } from '@/common/hooks/components/useBottomSheet';
import { useAtom } from 'jotai';

import { capitalizeString } from '../utils/eventListCardUtils';
export const StatusFilter = () => {
  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = useAtom(selectedStatusAtom);
  const { data: statuses = [], isPending } = useEventStatuses();
  const { visible, open, close } = useBottomSheet();

  const handleSelectStatus = useCallback(
    (status: EventStatusType) => {
      setSelectedStatus(status);
      close();
    },
    [close, setSelectedStatus],
  );

  const renderStatus: ListRenderItem<EventStatusType> = useCallback(
    ({ item }) => (
      <S.StatusRow onPress={() => handleSelectStatus(item)}>
        <S.StatusLabel>{capitalizeString(item)}</S.StatusLabel>
      </S.StatusRow>
    ),
    [handleSelectStatus],
  );

  return (
    <>
      <S.SelectorButton
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={`Selected status: ${selectedStatus}. Tap to change.`}>
        <S.SelectorLabel>{capitalizeString(selectedStatus)}</S.SelectorLabel>
      </S.SelectorButton>

      <BottomSheet
        visible={visible}
        onClose={close}
        title="Status"
        backdropAccessibilityLabel="Close status picker">
        <FlashList
          data={statuses}
          renderItem={renderStatus}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          style={S.listStyle}
          ListEmptyComponent={
            isPending ? (
              <S.LoadingContainer>
                <ActivityIndicator color={theme.colors.primary} />
              </S.LoadingContainer>
            ) : (
              <S.EmptyLabel>No statuses available</S.EmptyLabel>
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

  export const StatusRow = styled.Pressable`
    padding-vertical: ${({ theme }) => theme.spacing.md};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.border};
  `;

  export const StatusLabel = styled.Text`
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
