
import ActionButton from '@Components/Button';
import Avatar from '@Components/Avatar';

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
  buttonDataTestId = "sport-button-id",

}: ISportsCard): JSX.Element => {

  const handleClick = (): void => {
    const event: ISportEvent = {
      id,
      eventName,
      eventType,
      startTime,
      endTime,
    }

    onClick(event);
  }


  return <div className="sports-card" data-testid="card-test">
    <div className="sports-card__container">
      <div className='sports-card__avatar'>
        <Avatar
          name={eventType}
        />
      </div>
      <div className="sports-card__content">
        <p className='sports-card__heading'>
          {eventName}
        </p>
        <p className='sports-card__sub-heading'>
          {eventType}
        </p>
        <p className='sports-card__sub-heading'>
          {formatDate(startTime)}
        </p>
        <p className='sports-card__sub-heading'>
          {`${formateTime(startTime)} - ${formateTime(endTime)}`}
        </p>
        <div className="sports-card__button">
          <ActionButton onClick={() => handleClick()} title={buttonTitle} dataTestId={buttonDataTestId} />
        </div>
      </div>
    </div>
  </div>
};


export default SportsCard;
