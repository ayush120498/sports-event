import { describe, } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('Test case for App', () => {
  it('should render the App component', () => {
    render(
      <App />
    );
  });
});
