import { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import withLayout from '@HOC/withLayout/withLayout';
import useManageEvent from '@Hooks/useManageEvents';
import EventList from '@Components/EventList';
import Loader from '@Components/Loader';
import ErrorComponent from '@Components/Error';
import { areOverLappingIntervals } from '@Utils/date';
import { MAXIMUM_ALLOWED_SELECTION } from '@Constants/index';
import { ISportEvent } from 'types';

import './style.scss';
import usePagination from '@Hooks/usePagination';
import Paginator from '@Components/Paginator ';

const SportsEvent = withLayout((): JSX.Element => {

  const { isLoading, allEvent, error, storedEvents, addEventsToLocalStorage, fetchEvents } = useManageEvent();
  const [selectedItems, setSelectedItems] = useState<Map<number, ISportEvent>>(new Map());
  const { currentData, currentPage, maxPage, jump } = usePagination<ISportEvent>({ data: allEvent, itemsPerPage: 10 });


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


  useEffect(() => {
    setSelectedItems(storedEvents);
  }, [storedEvents])


  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent message={error.message} buttonText='Reload' onClick={() => void fetchEvents()} />;
  }

  return (
    <>
      <div className="events-container">
        <div className="events-container__list-all">
          <div className='events-container__list'>
            <EventList
              heading="All events"
              onClick={onEventSelection}
              events={currentData()}
              buttonTitle="Select Event"
              emptyListText='No events scheduled for the day'
              dataTestId='all-events-test'
              selectedEventList={selectedItems}
            />
          </div>
          <div className='events-container__paginator'>
            <Paginator selectedPage={currentPage} selectPageHandler={jump} numberOfPages={maxPage} />
          </div>
        </div>
        <div className="events-container__list-selected">
          <EventList
            heading="Selected events"
            onClick={onEventDeletion}
            events={selectedItemsList}
            buttonTitle="Remove Event"
            emptyListText='Please select an event to participate'
            dataTestId='selected-events-test'
          />
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
    </>
  );
});



export default SportsEvent;
