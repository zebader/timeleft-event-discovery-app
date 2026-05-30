import { LocationSelector } from '@/common/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Lobby = () => {
  return (
    <S.Container>
      <S.Header>
        <LocationSelector />
      </S.Header>
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
