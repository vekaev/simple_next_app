import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@providers/Theme.provider';

export const renderWithTheme = (component: React.ReactNode): RenderResult => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};
