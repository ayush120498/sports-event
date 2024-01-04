import ErrorComponent from '@Components/Error';
import { useNavigate } from 'react-router-dom';

const PageNotFound = (): JSX.Element => {

  const navigate = useNavigate();
  return <ErrorComponent buttonText="Back to home" message='Page not found......' onClick={() => navigate('/')} />
}


export default PageNotFound;
