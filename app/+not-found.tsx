import { Link, Stack } from 'expo-router';
import styled from 'styled-components/native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <S.Container>
        <S.Title>This screen doesn&apos;t exist.</S.Title>
        <Link href="/">
          <S.LinkText>Go to home screen!</S.LinkText>
        </Link>
      </S.Container>
    </>
  );
}

namespace S {
  export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.lg};
    background-color: ${({ theme }) => theme.colors.background};
  `;

  export const Title = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  `;

  export const LinkText = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.medium};
    font-size: ${({ theme }) => theme.typography.fontSize.sm}px;
    color: ${({ theme }) => theme.colors.primary};
    padding-vertical: ${({ theme }) => theme.spacing.md};
  `;
}
