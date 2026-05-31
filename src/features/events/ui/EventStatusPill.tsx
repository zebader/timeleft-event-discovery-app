import type { EventStatusType } from '@/api/types';
import styled from 'styled-components/native';

import {
  formatStatusLabel,
  getStatusBackgroundKey,
  getStatusTextColorKey,
  type StatusTextColorKey,
} from '../utils/eventListCardUtils';

export type EventStatusPillProps = {
  status: EventStatusType;
};

export const EventStatusPill = ({ status }: EventStatusPillProps) => (
  <S.Pill $backgroundKey={getStatusBackgroundKey(status)}>
    <S.Label $colorKey={getStatusTextColorKey(status)}>
      {formatStatusLabel(status)}
    </S.Label>
  </S.Pill>
);

namespace S {
  export const Pill = styled.View<{
    $backgroundKey:
      | 'statusLiveBackground'
      | 'statusUpcomingBackground'
      | 'statusPastBackground';
  }>`
    background-color: ${({ theme, $backgroundKey }) =>
      theme.colors[$backgroundKey]};
    border-radius: ${({ theme }) => theme.radius.round};
    padding-vertical: ${({ theme }) => theme.spacing.xs};
    padding-horizontal: ${({ theme }) => theme.spacing.sm};
  `;

  export const Label = styled.Text<{ $colorKey: StatusTextColorKey }>`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.xs}px;
    color: ${({ theme, $colorKey }) => theme.colors[$colorKey]};
  `;
}
