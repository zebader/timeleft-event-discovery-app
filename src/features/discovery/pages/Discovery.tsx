import { LocationSelector } from '@/common/components';
import { selectedCountryAtom } from '@/common/data-access/atoms/location.atom';
import { useAtomValue } from 'jotai';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { EventList } from '../ui/EventList';

export const Discovery = () => {
  const selectedCountry = useAtomValue(selectedCountryAtom);

  return (
    <S.Container>
      <S.Header>
        <LocationSelector />
      </S.Header>
      <EventList filters={{ country: selectedCountry }} />
    </S.Container>
  );
};

namespace S {
  export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
  `;

  export const Header = styled.View`
    padding: ${({ theme }) => theme.spacing.md};
  `;
}
