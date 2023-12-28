import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loader from './';


describe('Test cases for Loader component', () => {
  it('should render Loader', () => {
    render(<Loader />);
    const element = screen.getByTestId('loader-test');
    expect(element).toBeVisible();
  });
});
