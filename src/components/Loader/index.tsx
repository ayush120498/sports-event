import LoaderImage from '@Assets/loader.svg';
import './style.scss';

const Loader = (): JSX.Element => (
  <div className="loader-container" data-testid="loader-test">
    <img src={LoaderImage} alt="loader" />
  </div>
);

export default Loader;
