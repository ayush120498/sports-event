import ReactDOM from 'react-dom/client';
import App from 'App';
import './styles/main.scss';
import { ErrorContextProvider } from '@Context/ErrorContext';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)!.render(
  <ErrorContextProvider>
    <App />
  </ErrorContextProvider>
);
