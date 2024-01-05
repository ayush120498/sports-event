import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from './';
import ErrorComponent from '@Components/Error';
import { ErrorContextProvider } from '@Context/ErrorContext';

const MockErrorComponent = (): JSX.Element => {
  throw Error("Error Component");
}

describe('Test case for Error Boundary', () => {
  it('should render fallback component', async () => {
    render(
      <ErrorContextProvider>
        <ErrorBoundary fallback={<ErrorComponent message="Error Occurred" onClick={() => { }} />}>
          <MockErrorComponent />
        </ErrorBoundary>
      </ErrorContextProvider>
    );
    expect(await screen.findByText("Error Occurred")).toBeInTheDocument();
  });


});
