import SportsCard from '@Components/Card';
import { IEventListProps } from './type';

import './style.scss';
import { memo, useCallback } from 'react';
import { ISportEvent } from 'types';


const MemoizedCard = memo(SportsCard, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
});


const EventList = ({ heading, events, buttonTitle, onClick, emptyListText = "No events scheduled", dataTestId = "event-test", selectedEventList }: IEventListProps): JSX.Element => {


  const handleClick = useCallback((id: number, selectedEvent: ISportEvent) => {
    onClick(id, selectedEvent);
  }, [onClick]);

  return <div className="event-list scrollbar" data-testid={dataTestId}>
    <div className="event-list__heading">
      <h2>
        {heading}
      </h2>
    </div>
    {!events.length && (
      <div className="event-list__empty">
        <p> {emptyListText}</p>
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
              date={event.dateOfEvent}
              startTime={event.startTime}
              endTime={event.startTime}
              onClick={() => handleClick(event.id, event)}
              buttonTitle={buttonTitle}
              buttonDataTestId={`sports-button-test-${event.id}`}
            />
          </div>
        );

      })}
    </div> : null}
  </div>
};



export default EventList;
