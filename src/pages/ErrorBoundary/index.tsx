import { Button, Heading } from '@radix-ui/themes';
import './style.scss';
import { useErrorBoundary } from 'react-error-boundary';

const ErrorFallback = (): JSX.Element => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className="error-boundary">
      <Heading size={"9"}>Something went wrong please reload</Heading>
      <Button onClick={resetBoundary}> Reset</Button>
    </div>
  );
};

export default ErrorFallback;
