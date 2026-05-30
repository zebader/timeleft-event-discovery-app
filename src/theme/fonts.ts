/** PostScript names registered by @expo-google-fonts/figtree — must match useFonts keys in app/_layout.tsx */
export const fontFamilies = {
  regular: 'Figtree_400Regular',
  medium: 'Figtree_500Medium',
  bold: 'Figtree_700Bold',
  mono: 'SpaceMono',
} as const;

export type FontFamilies = typeof fontFamilies;
