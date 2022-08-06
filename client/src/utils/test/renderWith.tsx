import React from 'react';
import _curry from 'lodash/curry';
import { render, RenderResult } from '@testing-library/react';

import { ThemeProvider } from '@providers/Theme.provider';
import { ContainerComponent } from '@types';

export function renderWith(
  Provider: ContainerComponent,
  component: React.ReactNode
): RenderResult {
  return render(<Provider>{component}</Provider>);
}

export const curriedRenderWith = _curry(renderWith);

export const renderWithTheme = curriedRenderWith(ThemeProvider);
