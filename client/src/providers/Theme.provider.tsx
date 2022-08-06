import React, { useEffect } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';

import { ContainerComponent } from '@types';
import { THEME } from '@utils/theme';

const THEME_STORAGE_KEY = 'color-scheme';

export const ThemeProvider: ContainerComponent = ({ children }) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_STORAGE_KEY,
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(
      value || (colorScheme === THEME.DARK ? THEME.LIGHT : THEME.DARK)
    );
  };

  useEffect(() => {
    if (colorScheme !== preferredColorScheme) {
      toggleColorScheme(preferredColorScheme);
    }
  }, [preferredColorScheme]);

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
