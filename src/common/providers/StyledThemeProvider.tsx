import { useColorScheme } from '@/common/hooks';
import { darkTheme, lightTheme } from '@/theme';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components/native';

export function StyledThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
