import { fontFamilies } from './fonts';

export type ColorPalette = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  white: string;
  statusLiveBackground: string;
  statusUpcomingBackground: string;
  statusPastBackground: string;
};

export type Typography = {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
    mono: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
};

/** Index-based spacing scale, e.g. `theme.spacing[2]` → 8 */
export type SpacingScale = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

export type RadiusScale = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  card: string;
  round: string;
};

export type AppTheme = {
  colors: ColorPalette;
  typography: Typography;
  spacing: SpacingScale;
  radius: RadiusScale;
};

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} satisfies SpacingScale;

const radius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  card: '12px',
  round: '9999px',
} satisfies RadiusScale;

const typography = {
  fontFamily: {
    regular: fontFamilies.regular,
    medium: fontFamilies.medium,
    bold: fontFamilies.bold,
    mono: fontFamilies.mono,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} satisfies Typography;

const lightColors = {
  primary: '#2f95dc',
  secondary: '#5856D6',
  background: '#f8f3ed',
  surface: '#fff9',
  text: '#000000',
  textMuted: '#666666',
  border: '#efe8de',
  error: '#ff3b30',
  success: '#34c759',
  warning: '#ff9500',
  statusLiveBackground: '#d4f5c4',
  statusUpcomingBackground: '#e5e5e5',
  statusPastBackground: '#f5d0d0',
  white: '#ffffff',
} satisfies ColorPalette;

const darkColors = {
  primary: '#ffffff',
  secondary: '#5e5ce6',
  background: '#000000',
  surface: '#1c1c1e',
  text: '#ffffff',
  textMuted: '#a1a1a6',
  border: '#38383a',
  error: '#ff453a',
  success: '#32d74b',
  warning: '#ff9f0a',
  statusLiveBackground: '#3d5c34',
  statusUpcomingBackground: '#484848',
  statusPastBackground: '#5c3a3a',
  white: '#ffffff',
} satisfies ColorPalette;

export const lightTheme: AppTheme = {
  colors: lightColors,
  typography,
  spacing,
  radius,
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  typography,
  spacing,
  radius,
};

export const theme = lightTheme;
