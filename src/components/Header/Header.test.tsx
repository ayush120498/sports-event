import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './';


describe('Test cases for Header component', () => {
  it('should render Header with Sports Day', () => {
    render(<Header />);
    const element = screen.getByTestId('header-test');
    expect(element).toHaveTextContent("Sports Day")
  });
});
