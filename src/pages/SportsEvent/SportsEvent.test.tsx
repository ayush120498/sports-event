import { expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import SportsEvent from './';
import { ISportEvent } from 'types';


const mockData = [
  {
    "id": 1,
    "eventName": "Football Match",
    "eventType": "Soccer",
    "dateOfEvent": "01/04/2023",
    "startTime": "2:30 PM",
    "endTime": "4:30 PM",
    "startDateTime": "01/04/2023 2:30 PM",
    "endDateTime": "01/04/2023 4:30 PM"
  },
  {
    "id": 2,
    "eventName": "Tennis Tournament",
    "eventType": "Tennis",
    "dateOfEvent": "01/04/2023",
    "startTime": "2:30 PM",
    "endTime": "4:30 PM",
    "startDateTime": "01/04/2023 2:30 PM",
    "endDateTime": "01/04/2023 4:30 PM"
  },
  {
    "id": 3,
    "eventName": "Sprint Race",
    "eventType": "Athletics",
    "dateOfEvent": "01/04/2023",
    "startTime": "2:30 AM",
    "endTime": "4:30 AM",
    "startDateTime": "01/04/2023 2:30 AM",
    "endDateTime": "01/04/2023 4:30 AM"
  },
  {
    "id": 4,
    "eventName": "Hockey Match",
    "eventType": "Field Hockey",
    "dateOfEvent": "02/04/2023",
    "startTime": "12:30 AM",
    "endTime": "2:30 AM",
    "startDateTime": "02/04/2023 12:30 AM",
    "endDateTime": "02/04/2023 2:30 AM"
  },
  {
    "id": 5,
    "eventName": "Swimming Competition",
    "eventType": "Swimming",
    "dateOfEvent": "01/04/2023",
    "startTime": "4:00 PM",
    "endTime": "6:00 PM",
    "startDateTime": "01/04/2023 4:00 PM",
    "endDateTime": "01/04/2023 6:00 PM"
  }
];

const mock = vi.hoisted(() => {
  return {
    isLoading: true,
    allEvent: [] as ISportEvent[],
    selectedEvents: [] as ISportEvent[],
    error: null as Error | null,
    updateEvents: vi.fn()
  }
})

vi.mock("@Hooks/useEvents", () => {
  return {
    default: vi.fn().mockReturnValue(mock)
  }
});


describe('Test cases for SportsEvent', () => {

  afterAll(() => {
    vi.clearAllMocks();
  })

  it('should render loader while fetching', () => {
    render(<SportsEvent />);
    const loader = screen.getByTestId('loader-test');
    expect(loader).toBeVisible();
  });

  it('should render all events with 5 cards', () => {
    mock.isLoading = false;
    mock.allEvent = [...mockData];


    render(<SportsEvent />);
    const allEventListContainer = screen.getByTestId('all-events-test');
    const list = allEventListContainer.getElementsByClassName('event-list__card');
    expect(list).length(5);

  });

  it('should select the event if select is pressed and save the event in local storage', () => {

    render(<SportsEvent />);

    const firstCardButton = screen.getByTestId('sports-button-test-1');
    fireEvent.click(firstCardButton);

    const selectedEventListContainer = screen.getByTestId('selected-events-test');
    const selectedEventsList = selectedEventListContainer.getElementsByClassName('event-list__card');
    const allEventListContainer = screen.getByTestId('all-events-test');
    const allEventsList = allEventListContainer.getElementsByClassName('event-list__card');

    expect(selectedEventsList).length(1);
    expect(allEventsList).length(4);
    expect(mock.updateEvents).toHaveBeenCalledOnce();

  });

  it('should not select if event has an overlapping timings', async () => {

    mock.selectedEvents = [{
      "id": 1,
      "eventName": "Football Match",
      "eventType": "Soccer",
      "dateOfEvent": "01/04/2023",
      "startTime": "2:30 PM",
      "endTime": "4:30 PM",
      "startDateTime": "01/04/2023 2:30 PM",
      "endDateTime": "01/04/2023 4:30 PM"
    }]

    render(<SportsEvent />);

    const firstCardButton = screen.getByTestId('sports-button-test-2');
    fireEvent.click(firstCardButton);
    const selectedEventListContainer = screen.getByTestId('selected-events-test');
    const selectedEventsList = selectedEventListContainer.getElementsByClassName('event-list__card');
    const allEventListContainer = screen.getByTestId('all-events-test');
    const allEventsList = allEventListContainer.getElementsByClassName('event-list__card');
    expect(selectedEventsList).length(1);
    expect(allEventsList).length(4);
    expect(await screen.findByText("You can't participate in this event as it has conflicting timings with already selected event")).toBeInTheDocument();

  });


  it('should delete an event if delete button is pressed', () => {

    mock.selectedEvents = [{
      "id": 1,
      "eventName": "Football Match",
      "eventType": "Soccer",
      "dateOfEvent": "01/04/2023",
      "startTime": "2:30 PM",
      "endTime": "4:30 PM",
      "startDateTime": "01/04/2023 2:30 PM",
      "endDateTime": "01/04/2023 4:30 PM"
    }]

    render(<SportsEvent />);

    const firstCardButton = screen.getByTestId('sports-button-test-1');
    fireEvent.click(firstCardButton);

    const selectedEventListContainer = screen.getByTestId('selected-events-test');
    const selectedEventsList = selectedEventListContainer.getElementsByClassName('event-list__card');
    const allEventListContainer = screen.getByTestId('all-events-test');
    const allEventsList = allEventListContainer.getElementsByClassName('event-list__card');

    screen.debug();
    expect(selectedEventsList).length(0);
    expect(allEventsList).length(5);

  });


  it('should not be able to  select more than 3 events ', async () => {

    mock.selectedEvents = [];
    mock.allEvent = [...mockData];
    render(<SportsEvent />);

    for (let i = 1; i <= mockData.length; i++) {
      const cardButton = screen.getByTestId(`sports-button-test-${i}`);
      fireEvent.click(cardButton);
    }

    expect(await screen.findByText("You can participate upto 3 events")).toBeInTheDocument();

    const selectedEventListContainer = screen.getByTestId('selected-events-test');
    const selectedEventsList = selectedEventListContainer.getElementsByClassName('event-list__card');
    const allEventListContainer = screen.getByTestId('all-events-test');
    const allEventsList = allEventListContainer.getElementsByClassName('event-list__card');

    expect(selectedEventsList).length(3);
    expect(allEventsList).length(2);

  });


  it('should render error message on screen if API call throw an error', async () => {
    mock.error = new Error("Error in fetch list data");
    render(<SportsEvent />);
    expect(await screen.findByText("Error in fetch list data")).toBeInTheDocument();
  });


});
