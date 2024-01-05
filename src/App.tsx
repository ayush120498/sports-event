import ErrorComponent from "@Components/Error"
import { ErrorContext } from "@Context/ErrorContext"
import ErrorBoundary from "@HOC/ErrorBoundary"
import Router from "@Routes/Router"
import { useContext } from "react"

const App = (): JSX.Element => {


  const errorContext = useContext(ErrorContext);

  const handleClick = (): void => {
    errorContext?.updateError(false);
  }

  return <ErrorBoundary fallback={<ErrorComponent onClick={handleClick} />}>
    <Router />
  </ErrorBoundary>
}


export default App;
