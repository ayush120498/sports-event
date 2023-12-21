import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Header from '@Components/Header';
import EventList from '@Components/EventList';
import Loader from '@Components/Loader';
import useEvents from '@Hooks/useEvents';
import { areOverLappingIntervals } from '@Utils/date';
import { MAXIMUM_ALLOWED_SELECTION } from '@Constants/index';

import { ISportEvent } from 'types';


import './style.scss';

const SportsEvent = (): JSX.Element => {
  const [isLoading, events, selectedEvents, error, updateEvents] = useEvents();
  const [selectedEventsList, setSelectedEvents] = useState<ISportEvent[]>([]);
  const [eventList, setEventList] = useState<ISportEvent[]>([]);

  const canSelectEvent = (): boolean => selectedEventsList.length < MAXIMUM_ALLOWED_SELECTION;


  const showToastMessage = (message: string): void => {
    toast.error(message, {
      toastId: 'sport-event-toast',
    });
  };

  const canParticipateInEvent = (sportsEvent: ISportEvent): boolean => {
    let isValidEvent = true;
    selectedEventsList.forEach((event) => {
      const isIntervalOverlapping = areOverLappingIntervals(
        {
          startTime: event.startDateTime,
          endTime: event.endDateTime,
        },
        {
          startTime: sportsEvent.startDateTime,
          endTime: sportsEvent.endDateTime,
        },
      );
      if (isIntervalOverlapping) {
        isValidEvent = false;
      }
    });
    return isValidEvent;
  };


  const onEventSelection = (index: number, selectedEvent: ISportEvent): void => {
    if (!canSelectEvent()) {
      showToastMessage(`You can participate upto ${MAXIMUM_ALLOWED_SELECTION} events`);
      return;
    }

    if (!canParticipateInEvent(selectedEvent)) {
      showToastMessage("You can't participate in this event as it has conflicting timings with already selected event");
      return;
    }

    events.splice(index, 1);
    setEventList([...events]);
    const finalSelectedEventsList = [...selectedEventsList, selectedEvent];
    setSelectedEvents(finalSelectedEventsList);
    updateEvents(finalSelectedEventsList);
  };


  const deleteSelectedItem = (index: number, deletedEvent: ISportEvent): void => {
    selectedEventsList.splice(index, 1);
    setSelectedEvents([...selectedEventsList]);
    setEventList([...events, deletedEvent]);
    updateEvents([...selectedEventsList]);
  };

  useEffect(() => {
    setEventList(events);
    setSelectedEvents(selectedEvents);
  }, [events, selectedEvents]);


  if (error) {
    return <p>{error.message}</p>;
  }


  return (
    <div className="container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="events-container">
          <div className="events-container__list">
            <EventList
              heading="All events"
              onClick={onEventSelection}
              events={eventList}
              buttonTitle="Select"
              emptyListText='No events scheduled for the day'
            />
          </div>
          <div className="events-container__list">
            <EventList
              heading="Selected events"
              onClick={deleteSelectedItem}
              events={selectedEventsList}
              buttonTitle="Delete"
              emptyListText='Please select an event to participate'
            />
          </div>
        </div>
      )}
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SportsEvent;
