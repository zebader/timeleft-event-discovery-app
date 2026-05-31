import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';

import { useEventDetails } from '@/common/hooks';
import {
  formatDetailTitle,
  formatEventDate,
  getAvailabilityCount,
  getEventArtworkImage,
} from '../utils/eventListCardUtils';
import { EventStatusPill } from '../ui/EventStatusPill';

const PLACEHOLDER_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const EventDetails = () => {
  const { id: rawId } = useLocalSearchParams<{ id: string }>();
  const id = typeof rawId === 'string' ? rawId : rawId?.[0] ?? '';
  const router = useRouter();
  const theme = useTheme();
  const { data: event, isPending } = useEventDetails(id);

  const availability = event ? getAvailabilityCount(event) : 0;

  return (
    <S.Container edges={['top', 'left', 'right']}>
      <S.HeaderBar>
        <S.BackButton onPress={() => router.back()} accessibilityRole="button">
          <FontAwesome name="arrow-left" size={20} color={theme.colors.text} />
        </S.BackButton>
        <S.HeaderTitle>Event details</S.HeaderTitle>
        <S.HeaderSide />
      </S.HeaderBar>

      {isPending ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadingContainer>
      ) : (
        <>
          <S.Body>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <S.ScrollContent>
                {event ? (
                  <>
                    <S.CharacterCard>
                      <S.CharacterImage
                        source={getEventArtworkImage(event.type)}
                        resizeMode="contain"
                      />
                    </S.CharacterCard>

                    <S.TitleRow>
                      <S.TitleText>{formatDetailTitle(event)}</S.TitleText>
                      <EventStatusPill status={event.status} />
                    </S.TitleRow>

                    <S.DateBlock>
                      <S.Divider />
                      <S.DateText>{formatEventDate(event.date)}</S.DateText>
                    </S.DateBlock>

                    <S.DescriptionText>{PLACEHOLDER_DESCRIPTION}</S.DescriptionText>
                  </>
                ) : null}
              </S.ScrollContent>
            </ScrollView>

            {event ? (
              <S.BottomBar edges={['bottom']}>
                <S.AvailabilityRow>
                  <S.AvailabilityLabel>Availability: </S.AvailabilityLabel>
                  <S.AvailabilityCount>{availability}</S.AvailabilityCount>
                </S.AvailabilityRow>

                <S.ParticipateButton accessibilityRole="button">
                  <S.ParticipateLabel>Participate</S.ParticipateLabel>
                </S.ParticipateButton>
              </S.BottomBar>
            ) : null}
          </S.Body>
        </>
      )}
    </S.Container>
  );
};

namespace S {
  export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
  `;

  export const HeaderBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.md};
  `;

  export const BackButton = styled.Pressable`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
  `;

  export const HeaderSide = styled.View`
    width: 40px;
    height: 40px;
  `;

  export const HeaderTitle = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `;

  export const Body = styled.View`
    flex: 1;
  `;

  export const ScrollContent = styled.View`
    padding: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xxl};
  `;

  export const CharacterCard = styled.View`
    align-self: center;
    width: 100%;
    max-height: 250px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radius.xl};
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  `;

  export const CharacterImage = styled.Image`
    width: 100%;
    height: 100%;
  `;

  export const TitleRow = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `;

  export const TitleText = styled.Text`
    flex: 1;
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) =>
      theme.typography.fontSize.lg * theme.typography.lineHeight.tight}px;
  `;

  export const DateBlock = styled.View`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  `;

  export const Divider = styled.View`
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `;

  export const DateText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const DescriptionText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.regular};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
    line-height: ${({ theme }) =>
      theme.typography.fontSize.md * theme.typography.lineHeight.relaxed}px;
  `;

  export const BottomBar = styled(SafeAreaView)`
    background-color: ${({ theme }) => theme.colors.white};
    border-top-left-radius: ${({ theme }) => theme.radius.xl};
    border-top-right-radius: ${({ theme }) => theme.radius.xl};
    padding: ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.lg};
  `;

  export const AvailabilityRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
  `;

  export const AvailabilityLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.text};
  `;

  export const AvailabilityCount = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.md}px;
    color: ${({ theme }) => theme.colors.success};
  `;

  export const ParticipateButton = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding-vertical: ${({ theme }) => theme.spacing.md};
    align-items: center;
    justify-content: center;
  `;

  export const ParticipateLabel = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.white};
  `;
}
