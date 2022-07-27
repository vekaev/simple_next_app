import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input component', () => {
  test('should render', () => {
    render(<Input placeholder="test" value="" onChange={() => ''} />);

    const element = screen.getByPlaceholderText('test');

    expect(element).toBeInTheDocument();
  });
});
