import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@Pages/ErrorBoundary';

import './styles/main.scss';
import Router from '@Routes/Router.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)!.render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router />
  </ErrorBoundary>
);
