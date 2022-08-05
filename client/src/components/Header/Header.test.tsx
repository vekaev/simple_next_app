import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '@utils/test/renderWithTheme';
import Header from './Header';

describe('Header', () => {
  test('renders correctly', () => {
    const { container } = renderWithTheme(<Header />);
    expect(container).toMatchSnapshot();

    const lightThemeRadio = screen.getByLabelText('Light');
    const darkThemeRadio = screen.getByLabelText('Dark');

    expect(lightThemeRadio).toBeChecked();
    expect(darkThemeRadio).not.toBeChecked();
  });
  test('should show popover on hover', async () => {
    const { container } = renderWithTheme(<Header />);
    const headerWrapper = container.firstChild as Element;
    let popover = screen.queryByText(/also depends on computer theme/i);

    expect(popover).not.toBeInTheDocument();

    userEvent.hover(headerWrapper);

    popover = screen.getByText(/also depends on computer theme/i);

    expect(popover).toBeInTheDocument();

    userEvent.unhover(headerWrapper);

    popover = screen.queryByText(/also depends on computer theme/i);

    expect(popover).not.toBeInTheDocument();
  });
  test.skip('should toggle color scheme on click', () => {
    renderWithTheme(<Header />);

    let [lightThemeRadio, darkThemeRadio] = screen.getAllByRole('radio');

    expect(lightThemeRadio).toBeChecked();

    // screen.debug(darkThemeRadio);

    [lightThemeRadio, darkThemeRadio] = screen.getAllByRole('radio');

    userEvent.click(darkThemeRadio);
    expect(darkThemeRadio).toBeChecked();
  });
});
