import { LocationSelector } from '@/common/components';
import { selectedCountryAtom } from '@/common/data-access/atoms/location.atom';
import { selectedStatusAtom } from '@/common/data-access/atoms/status.atom';
import { useAtomValue } from 'jotai';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { EventList } from '../ui/EventList';
import { StatusFilter } from '../ui/StatusFilter';

export const Discovery = () => {
  const selectedCountry = useAtomValue(selectedCountryAtom);
  const selectedStatus = useAtomValue(selectedStatusAtom);

  return (
    <S.Container>
      <S.Header>
        <LocationSelector />
        <StatusFilter />
      </S.Header>
      <EventList filters={{ country: selectedCountry, status: selectedStatus }} />
    </S.Container>
  );
};

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
