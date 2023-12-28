import ActionButton from '@Components/Button';
import Avatar from '@Components/Avatar';

import './style.scss';

const SportsCard = ({
  eventName,
  eventType,
  eventDuration,
  onClick,
  buttonTitle,
  date,
  buttonDataTestId = "sport-button-id",
}: ISportsCard): JSX.Element => {
  return <div className="sports-card" data-testid="card-test">
    <div className="sports-card__container">
      <div className='sports-card__avatar'>
        <Avatar
          name={'test'}
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
          {date}
        </p>
        <p className='sports-card__sub-heading'>
          {`${eventDuration.startTime} - ${eventDuration.endTime}`}
        </p>
        <div className="sports-card__button">
          <ActionButton onClick={onClick} title={buttonTitle} dataTestId={buttonDataTestId} />
        </div>
      </div>
    </div>
  </div>
};

export default SportsCard;
