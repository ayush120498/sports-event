import SportsCard from '@Components/Card';
import { IEventListProps } from './type';

import { memo } from 'react';

import './style.scss';

const MemoizedCard = memo(SportsCard);


const EventList = ({ heading, events, buttonTitle, onClick, emptyListText = "No events scheduled", dataTestId = "event-test", selectedEventList }: IEventListProps): JSX.Element => {


  return <div className="event-list" data-testid={dataTestId}>
    <div className="event-list__heading">
      <h2>
        {heading}
      </h2>
    </div>
    {!events.length && (
      <div className="event-list__empty">
        <h3> {emptyListText}</h3>
      </div>
    )}
    {events.length > 0 ? <div className="event-list__list">
      {events.map((event) => {
        return (!(selectedEventList?.has(event.id))) && (
          <div className="event-list__card" key={event.id}>
            <MemoizedCard
              id={event.id}
              eventName={event.eventName}
              eventType={event.eventType}
              startTime={event.startTime}
              endTime={event.endTime}
              onClick={onClick}
              buttonTitle={buttonTitle}
              icon={event.icon}
              buttonDataTestId={`sports-button-test-${event.id}`}
            />
          </div>
        );

      })}
    </div> : null}
  </div>
};



export default EventList;
