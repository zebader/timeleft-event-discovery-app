import { LocationSelector } from '@/common/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Logo from '../../../../assets/images/logo.svg';
import { HotInCitySlider } from '../ui/HotInCitySlider';
import { CategoryChipsSlider } from '../ui/CategoryChipsSlider';

const LOGO_WIDTH = 240;
const LOGO_HEIGHT = LOGO_WIDTH / (815 / 231);

export const Lobby = () => (
  <S.Container>
    <S.Header>
      <S.LogoWrapper>
        <Logo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
        <S.Title>Discover events in your city</S.Title>
      </S.LogoWrapper>
      <LocationSelector />
      <HotInCitySlider />
      <CategoryChipsSlider />
    </S.Header>
  </S.Container>
);

namespace S {
  export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
  `;

  export const Header = styled.View`
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.lg};
  `;

  export const LogoWrapper = styled.View`
    align-self: center;
  `;
  export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
  `;
}
