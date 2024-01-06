
import './styles.scss';

const ActionButton = ({ title, onClick, dataTestId = "button-test", }: IButtonProps): JSX.Element => (
  <button
    data-testid={dataTestId}
    title={title} onClick={onClick}
    className="button"
    aria-label={title}
  >
    {title}
  </button>
);



export default ActionButton;
