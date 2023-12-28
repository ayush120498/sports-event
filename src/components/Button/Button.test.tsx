import { expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './';


describe('button', () => {

  it('renders button component', () => {
    render(<Button title="Select" onClick={() => { }} />);
    const element = screen.getByTestId('button-test');
    expect(element).toHaveTextContent("Select");
  });

  it('show fire an event on click', () => {
    const mockFn = vi.fn();
    render(<Button title="Select" onClick={mockFn} />);
    const element = screen.getByTestId('button-test');
    fireEvent.click(element);
    expect(mockFn).toHaveBeenCalledOnce();

  });
});
