import SportsCard from '@Components/Card';
import { IEventListProps } from './type';

import './style.scss';


const EventList = ({ heading, events, buttonTitle, onClick, emptyListText = "No events scheduled", dataTestId = "event-test" }: IEventListProps): JSX.Element => (
  <div className="event-list scrollbar" data-testid={dataTestId}>
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
      {events.map((event, index) => (
        <div className="event-list__card" key={event.id}>
          <SportsCard
            eventName={event.eventName}
            eventType={event.eventType}
            date={event.dateOfEvent}
            eventDuration={{
              startTime: event.startTime,
              endTime: event.endTime,
            }}
            onClick={() => onClick(index, event)}
            buttonTitle={buttonTitle}
            buttonDataTestId={`sports-button-test-${event.id}`}
          />
        </div>
      ))}
    </div> : null}
  </div>
);



export default EventList;
