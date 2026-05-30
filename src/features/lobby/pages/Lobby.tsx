import { Text } from "@/common/components";
import styled from "styled-components/native";



export const Lobby = () => {
  return (
    <S.Container>
      <Text>Lobby</Text>
    </S.Container>
  );
};

namespace S {
  export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
  `;
}