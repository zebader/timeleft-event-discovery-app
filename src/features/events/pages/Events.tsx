import { LocationSelector } from '@/common/components';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { CategoryFilter } from '../ui/CategoryFilter';
import { EventList } from '../ui/EventList';
import { SortFilter } from '../ui/SortFilter';
import { StatusFilter } from '../ui/StatusFilter';

export const Events = () => (
  <S.Container>
    <S.Header>
      <S.FilterSlider
        horizontal
        showsHorizontalScrollIndicator={false}
        style={S.filterSliderStyle}>
        <S.FilterRow>
          <LocationSelector />
          <StatusFilter />
          <CategoryFilter />
          <SortFilter />
        </S.FilterRow>
      </S.FilterSlider>
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
    padding-vertical: ${({ theme }) => theme.spacing.md};
  `;

  export const FilterSlider = styled(ScrollView)``;

  export const filterSliderStyle = {
    flexGrow: 0,
  };

  export const FilterRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding-horizontal: ${({ theme }) => theme.spacing.md};
  `;
}
