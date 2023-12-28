import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Avatar from './';


describe('avatar', () => {
  it('should render avatar with first letter', () => {
    render(<Avatar name="400M Race" />);
    const element = screen.getByTestId('avatar-test');
    expect(element).toHaveTextContent("4");
  });

  it('should throw an error if an empty string is passed', () => {
    expect(() => render(<Avatar name="" />)).toThrow('Please enter a valid name');
  });
});
