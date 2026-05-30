import { DEFAULT_LOCATION, LocationSelector } from "@/common/components";
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from "styled-components/native";

export const Lobby = () => {
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  return (
    <S.Container>
      <S.Header>
        <LocationSelector
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
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