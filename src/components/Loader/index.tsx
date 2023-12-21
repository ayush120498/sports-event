import LoaderImage from '@Assets/loader.svg';
import './style.scss';

const Loader = (): JSX.Element => (
  <div className="loader-container">
    <img src={LoaderImage} alt="Loader" />
  </div>
);

export default Loader;
