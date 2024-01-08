
import ActionButton from '@Components/Button';

import { formatDate, formateTime } from '@Utils/date';
import { ISportEvent } from 'types';
import { ISportsCard } from './type';

import './style.scss';

const SportsCard = ({
  id,
  eventName,
  eventType,
  startTime,
  endTime,
  onClick,
  buttonTitle,
  icon,
  buttonDataTestId = "sport-button-id",

}: ISportsCard): JSX.Element => {

  const handleClick = (): void => {
    const event: ISportEvent = {
      id,
      eventName,
      eventType,
      startTime,
      endTime,
      icon
    }

    onClick(event);
  }

  return <div className="sports-card" data-testid="card-test">
    <div className="sports-card__container">
      <div className='sports-card__avatar'>
        <img src={icon} alt='Sports card image' />
      </div>
      <div className="sports-card__content">
        <h3 className='sports-card__heading line-clamp' title={eventName}>
          {eventName}
        </h3>
        <p className='sports-card__sub-heading line-clamp' title={eventType}>
          {eventType}
        </p>
        <div className='sports-card__schedule'>
          <div className='sports-card__schedule-tags'>
            <span className='icon-calendar sports-card__icon'></span><span>{formatDate(startTime)}</span>
          </div>
          <div className='sports-card__schedule-tags'>
            <span className='icon-clock sports-card__icon'></span> <span>{`${formateTime(startTime)} - ${formateTime(endTime)}`}</span>
          </div>
        </div>
        <div className="sports-card__button">
          <ActionButton onClick={() => handleClick()} title={buttonTitle} dataTestId={buttonDataTestId} />
        </div>
      </div>
    </div>
  </div>
};


export default SportsCard;
