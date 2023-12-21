
import { IButtonProps } from './type';
import './styles.scss';

const ActionButton = ({ title, onClick }: IButtonProps): JSX.Element => (
  <button title={title} onClick={onClick} className="button">{title}</button>
);



export default ActionButton;
