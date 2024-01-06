import { ErrorContext } from '@Context/ErrorContext';
import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}


class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  static contextType = ErrorContext;
  declare context: React.ContextType<typeof ErrorContext>;


  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error(error, info);
    this.context?.updateError(true);
  }

  render(): ReactNode {
    if (this.context?.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
