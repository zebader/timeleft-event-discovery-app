import type { Event } from '@/api/types';
import { EventStatusPill } from '@/features/events/ui/EventStatusPill';
import {
  formatEventDate,
  formatEventHeadline,
  getAvailabilityColor,
  getAvailabilityCount,
  getAvailabilityTextColorKey,
  getEventArtworkImage,
} from '@/features/events/utils/eventListCardUtils';
import { Image } from 'react-native';
import styled from 'styled-components/native';

export const HOT_IN_CITY_CARD_WIDTH = 240;

export type HotInCityCardProps = {
  event: Event;
  onPress: (event: Event) => void;
};

export const HotInCityCard = ({ event, onPress }: HotInCityCardProps) => {
  const availability = getAvailabilityCount(event);
  const availabilityLevel = getAvailabilityColor(event);
  const availabilityColorKey = getAvailabilityTextColorKey(availabilityLevel);

  return (
    <S.Card onPress={() => onPress(event)} accessibilityRole="button">
      <S.ArtworkSection>
        <S.ArtworkContainer>
          <S.ArtworkImage
            source={getEventArtworkImage(event.type)}
            resizeMode="contain"
          />
        </S.ArtworkContainer>
        <S.StatusPillOverlay>
          <EventStatusPill status={event.status} />
        </S.StatusPillOverlay>
      </S.ArtworkSection>

      <S.Metadata>
        <S.Title numberOfLines={2}>{formatEventHeadline(event)}</S.Title>
        <S.DateText>{formatEventDate(event.date)}</S.DateText>

        <S.AvailabilityRow>
          <S.CaptionText>Availability: </S.CaptionText>
          <S.AvailabilityHighlight $colorKey={availabilityColorKey}>
            {availability}
          </S.AvailabilityHighlight>
        </S.AvailabilityRow>
      </S.Metadata>
    </S.Card>
  );
};

namespace S {
  export const Card = styled.Pressable`
    width: ${HOT_IN_CITY_CARD_WIDTH}px;
    margin-right: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
    overflow: visible;
  `;

  export const ArtworkSection = styled.View`
    position: relative;
  `;

  export const ArtworkContainer = styled.View`
    width: 100%;
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radius.xl};
    background-color: ${({ theme }) => theme.colors.white};
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;

  export const ArtworkImage = styled(Image)`
    width: 75%;
    height: 75%;
  `;

  export const StatusPillOverlay = styled.View`
    position: absolute;
    top: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
  `;

  export const Metadata = styled.View`
    gap: ${({ theme }) => theme.spacing.xs};
  `;

  export const Title = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) =>
      theme.typography.fontSize.md * theme.typography.lineHeight.tight}px;
  `;

  export const DateText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const AvailabilityRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    margin-top: ${({ theme }) => theme.spacing.sm};
  `;

  export const AvailabilityText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const AvailabilityCount = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.success};
  `;
  export const CaptionText = styled.Text`
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
