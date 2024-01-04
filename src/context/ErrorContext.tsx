import { createContext, useState, ReactNode } from "react";

interface ErrorContextValue {
  hasError: boolean;
  updateError: (value: boolean) => void;
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

interface ErrorContextProviderProps {
  children: ReactNode;
}

const ErrorContextProvider = ({ children }: ErrorContextProviderProps): JSX.Element => {
  const [hasError, setHasError] = useState(false);

  const updateError = (value: boolean): void => {
    setHasError(value);
  };

  const contextValue: ErrorContextValue = {
    hasError,
    updateError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};


export { ErrorContext, ErrorContextProvider };
