import ActionButton from '@Components/Button';
import './style.scss';

const ErrorComponent = ({ onClick, message = "An error occurred", buttonText = "Reset" }: IErrorComponent): JSX.Element => {


  return <div className='error-container'>
    <h3>{message}</h3>
    <div className='error-container__button'>
      <ActionButton title={buttonText} onClick={() => onClick()} />
    </div>
  </div>
}


export default ErrorComponent;
