import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { ThemeProvider } from '@providers/Theme.provider';
import { ContainerComponent } from '@types';

export function renderWith<T>(
  Provider: React.Provider<T | null> | ContainerComponent,
  component: React.ReactNode,
  value?: T
): RenderResult {
  return render(<Provider value={value || null}>{component}</Provider>);
}

export const renderWithTheme = (component: React.ReactNode) =>
  renderWith(ThemeProvider, component);
