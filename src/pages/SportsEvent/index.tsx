import { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import useEvents from '@Hooks/useEvents';
import withLayout from '@HOC/withLayout/withLayout';
import EventList from '@Components/EventList';
import Loader from '@Components/Loader';
import { areOverLappingIntervals } from '@Utils/date';
import { MAXIMUM_ALLOWED_SELECTION } from '@Constants/index';
import { ISportEvent } from 'types';

import './style.scss';

const SportsEvent = withLayout((): JSX.Element => {

  const { isLoading, allEvent, error, selectedEvents, addEventsToLocalStorage } = useEvents();
  const [selectedItems, setSelectedItems] = useState<Map<number, ISportEvent>>(new Map());


  const showToastMessage = (message: string, id: string): void => {
    toast.error(message, {
      toastId: id,
    });
  };


  const canParticipateInEvent = (selectedEvent: ISportEvent, selectedList: Map<number, ISportEvent>): boolean => {
    let isValidEvent = true;

    selectedList.forEach((event) => {
      const isIntervalOverlapping = areOverLappingIntervals(
        {
          startTime: event.startTime,
          endTime: event.endTime,
        },
        {
          startTime: selectedEvent.startTime,
          endTime: selectedEvent.endTime,
        },
      );
      if (isIntervalOverlapping) {
        isValidEvent = false;
      }
    })
    return isValidEvent;
  };

  useEffect(() => {
    setSelectedItems(selectedEvents);
  }, [selectedEvents])



  const selectedItemsList = useMemo(() => {
    return allEvent.filter((item) => selectedItems.has(item.id))
  }, [selectedItems, allEvent]);


  const canSelectEvent = (selectedEvent: Map<number, ISportEvent>): boolean => selectedEvent.size < MAXIMUM_ALLOWED_SELECTION;

  const onEventSelection = useCallback((selectedEvent: ISportEvent) => {

    setSelectedItems((prevSelected: Map<number, ISportEvent>) => {
      if (!canSelectEvent(prevSelected)) {
        showToastMessage(`You cannot participate more than ${MAXIMUM_ALLOWED_SELECTION} events`, 'max-toast-id');
        return prevSelected;
      };

      if (!canParticipateInEvent(selectedEvent, prevSelected)) {
        showToastMessage("You can't participate in this event as it has conflicting timings with already selected event", 'overlapping-toast-id');
        return prevSelected;
      }

      const newSelectedItems = new Map(prevSelected);
      newSelectedItems.set(selectedEvent.id, selectedEvent);
      addEventsToLocalStorage(newSelectedItems);
      return newSelectedItems;
    });

  }, [addEventsToLocalStorage]);


  const onEventDeletion = useCallback((selectedEvent: ISportEvent) => {
    setSelectedItems((prevSelected: Map<number, ISportEvent>) => {
      const newSelectedItems = new Map(prevSelected);
      newSelectedItems.delete(selectedEvent.id);
      addEventsToLocalStorage(newSelectedItems);
      return newSelectedItems;
    });
  }, [addEventsToLocalStorage]);


  if (error) {
    return <p>{error.message}</p>;
  }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="events-container">
          <div className="events-container__list-all">
            <EventList
              heading="All events"
              onClick={onEventSelection}
              events={allEvent}
              buttonTitle="Select"
              emptyListText='No events scheduled for the day'
              dataTestId='all-events-test'
              selectedEventList={selectedItems}
            />
          </div>
          <div className="events-container__list-selected">
            <EventList
              heading="Selected events"
              onClick={onEventDeletion}
              events={selectedItemsList}
              buttonTitle="Delete"
              emptyListText='Please select an event to participate'
              dataTestId='selected-events-test'
            />
          </div>
        </div>
      )}
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
});



export default SportsEvent;
