import { expect, describe, vi, Mock } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PageNotFound from './';

const navigationMock = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual<typeof import('react-router-dom')>();

  return {
    ...actual, useNavigate: (): Mock => {
      return navigationMock.navigate
    }
  }
});

describe('Test case for PageNotFound', () => {
  it('should render the component', async () => {
    render(
      <PageNotFound />
    );
    expect(await screen.findByText("Page not found......")).toBeInTheDocument();
  });

  it('should navigate back to home', () => {
    render(
      <PageNotFound />
    );

    const backButton = screen.getByTestId('button-test');
    fireEvent.click(backButton);

    expect(navigationMock.navigate).toHaveBeenCalled();
  });
});
