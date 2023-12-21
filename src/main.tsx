import React from 'react';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@Pages/ErrorBoundary';

import './styles/main.scss';
import Router from '@Routes/Router.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)!.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Theme>
        <Router />
      </Theme>
    </ErrorBoundary>
  </React.StrictMode>,
);
