import { LocationSelector } from '@/common/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { EventList } from '../ui/EventList';
import { SortFilter } from '../ui/SortFilter';
import { StatusFilter } from '../ui/StatusFilter';

export const Events = () => (
  <S.Container>
    <S.Header>
      <LocationSelector />
      <StatusFilter />
      <SortFilter />
    </S.Header>
    <EventList />
  </S.Container>
);

namespace S {
  export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
  `;

  export const Header = styled.View`
    padding: ${({ theme }) => theme.spacing.md};\
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.sm};
    align-items: center;
  `;
}
