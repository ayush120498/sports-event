
import './styles.scss';

const ActionButton = ({ title, onClick, dataTestId = "button-test", }: IButtonProps): JSX.Element => (
  <button data-testid={dataTestId} title={title} onClick={onClick} className="button">{title}</button>
);



export default ActionButton;
