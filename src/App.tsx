import ErrorComponent from "@Components/Error"
import { ErrorContext } from "@Context/ErrorContext"
import ErrorBoundary from "@HOC/ErrorBoundary"
import withLayout from "@HOC/withLayout/withLayout"
import Router from "@Routes/Router"
import { useContext } from "react"


const ErrorComponentWithHeader = withLayout(ErrorComponent);

const App = (): JSX.Element => {

  const errorContext = useContext(ErrorContext);
  const handleClick = (): void => {
    errorContext?.updateError(false);
  }

  return <ErrorBoundary fallback={<ErrorComponentWithHeader onClick={handleClick} />}>
    <Router />
  </ErrorBoundary>
}


export default App;
