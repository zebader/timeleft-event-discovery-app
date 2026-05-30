import type { Event } from '@/api/types';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import {
  formatEventDate,
  formatEventHeadline,
  formatStatusLabel,
  getAvailabilityColor,
  getAvailabilityCount,
  getAvailabilityTextColorKey,
  getEventArtworkImage,
  getStatusBackgroundKey,
} from '../utils/eventListCardUtils';

export type EventListCardProps = {
  event: Event;
};

export const EventListCard = ({ event }: EventListCardProps) => {
  const availability = getAvailabilityCount(event);
  const availabilityLevel = getAvailabilityColor(event);
  const availabilityColorKey = getAvailabilityTextColorKey(availabilityLevel);
  const statusBackgroundKey = getStatusBackgroundKey(event.status);

  return (
    <S.Card>
      <S.ArtworkContainer>
        <S.ArtworkImage source={getEventArtworkImage(event.type)} resizeMode="contain" />
      </S.ArtworkContainer>

      <S.Content>
        <S.TitleRow>
          <S.Headline numberOfLines={2}>{formatEventHeadline(event)}</S.Headline>
          <S.StatusPill $backgroundKey={statusBackgroundKey}>
            <S.StatusLabel>{formatStatusLabel(event.status)}</S.StatusLabel>
          </S.StatusPill>
        </S.TitleRow>

        <S.DateText>{formatEventDate(event.date)}</S.DateText>

        <S.Spacer />

        <S.AvailabilityRow>
          <S.AvailabilityText>Availability: </S.AvailabilityText>
          <S.AvailabilityHighlight $colorKey={availabilityColorKey}>
            {availability}
          </S.AvailabilityHighlight>
        </S.AvailabilityRow>
      </S.Content>
    </S.Card>
  );
};

namespace S {
  export const Card = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.card};
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
  `;

  export const ArtworkContainer = styled.View`
    width: 90px;
    height: 90px;
    border-radius: ${({ theme }) => theme.radius.lg};
    background-color: ${({ theme }) => theme.colors.white};
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;

  export const ArtworkImage = styled(Image)`
    width: 78px;
    height: 78px;
  `;

  export const Content = styled.View`
    flex: 1;
    flex-direction: column;
  `;

  export const TitleRow = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.sm};
  `;

  export const Headline = styled.Text`
    flex: 1;
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) => theme.typography.fontSize.lg * theme.typography.lineHeight.normal}px;
  `;

  export const StatusPill = styled.View<{
    $backgroundKey:
      | 'statusLiveBackground'
      | 'statusUpcomingBackground'
      | 'statusPastBackground';
  }>`
    background-color: ${({ theme, $backgroundKey }) =>
      theme.colors[$backgroundKey]};
    border-radius: ${({ theme }) => theme.radius.round};
    padding-vertical: ${({ theme }) => theme.spacing.sm};
    padding-horizontal: ${({ theme }) => theme.spacing.sm};
  `;

  export const StatusLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const DateText = styled.Text`
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const Spacer = styled.View`
    height: ${({ theme }) => theme.spacing.md};
  `;

  export const AvailabilityRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
  `;

  export const AvailabilityText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const AvailabilityHighlight = styled.Text<{
    $colorKey: 'success' | 'warning' | 'error';
  }>`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme, $colorKey }) => theme.colors[$colorKey]};
  `;
}
