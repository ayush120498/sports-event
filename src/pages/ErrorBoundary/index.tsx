import ActionButton from '@Components/Button';
import './style.scss';
import { useErrorBoundary } from 'react-error-boundary';

const ErrorFallback = (): JSX.Element => {

  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="error-boundary">
      <h2>Something went wrong please reload</h2>
      <ActionButton title='Reset' onClick={resetBoundary} />
    </div>
  );
};

export default ErrorFallback;
