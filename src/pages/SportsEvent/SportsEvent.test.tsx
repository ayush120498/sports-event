import { expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import SportsEvent from './';
import { ISportEvent } from 'types';

const mockData = [
  {
    "id": 1,
    "eventName": "Football Match",
    "eventType": "Soccer",
    "startTime": new Date("2023-04-01T09:00:00.000Z"),
    "endTime": new Date("2023-04-01T11:00:00.000Z"),
    "icon": "https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg"
  },
  {
    "id": 2,
    "eventName": "Basketball Game",
    "eventType": "Basketball",
    "startTime": new Date("2023-04-01T09:00:00.000Z"),
    "endTime": new Date("2023-04-01T11:00:00.000Z"),
    "icon": "https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg"

  },
  {
    "id": 3,
    "eventName": "Tennis Tournament",
    "eventType": "Tennis",
    "startTime": new Date("2023-04-03T09:00:00.000Z"),
    "endTime": new Date("2023-04-03T11:00:00.000Z"),
    "icon": "https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg"

  },
  {
    "id": 4,
    "eventName": "Sprint Race",
    "eventType": "Athletics",
    "startTime": new Date("2023-04-04T09:00:00.000Z"),
    "endTime": new Date("2023-04-04T11:00:00.000Z"),
    "icon": "https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg"

  },
  {
    "id": 5,
    "eventName": "Hockey Match",
    "eventType": "Field Hockey",
    "startTime": new Date("2023-04-05T19:00:00.000Z"),
    "endTime": new Date("2023-04-05T21:00:00.000Z"),
    "icon": "https://img.freepik.com/free-vector/vector-isolated-realistic-soccer-ball-white_1284-41932.jpg"
  },

]

const mock = vi.hoisted(() => {
  return {
    isLoading: true,
    allEvent: [] as ISportEvent[],
    storedEvents: new Map<number, ISportEvent>(),
    error: null as Error | null,
    addEventsToLocalStorage: vi.fn(),
    fetchEvents: vi.fn(),
  }
})

vi.mock("@Hooks/useManageEvents", () => {
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
    expect(mock.addEventsToLocalStorage).toHaveBeenCalledOnce();

  });

  it('should not select if event has an overlapping timings', async () => {
    mock.allEvent = [...mockData];
    mock.storedEvents = new Map([[1, {
      "id": 1,
      "eventName": "Football Match",
      "eventType": "Soccer",
      "startTime": new Date("2023-04-01T09:00:00.000Z"),
      "endTime": new Date("2023-04-01T11:00:00.000Z")
    }]] as [[number, ISportEvent]]);

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

    mock.storedEvents = new Map([[1, {
      "id": 1,
      "eventName": "Football Match",
      "eventType": "Soccer",
      "startTime": new Date("2023-04-01T09:00:00.000Z"),
      "endTime": new Date("2023-04-01T11:00:00.000Z")
    }]] as [[number, ISportEvent]]);

    render(<SportsEvent />);

    const firstCardButton = screen.getByTestId('sports-button-test-1');
    fireEvent.click(firstCardButton);

    const selectedEventListContainer = screen.getByTestId('selected-events-test');
    const selectedEventsList = selectedEventListContainer.getElementsByClassName('event-list__card');
    const allEventListContainer = screen.getByTestId('all-events-test');
    const allEventsList = allEventListContainer.getElementsByClassName('event-list__card');

    expect(selectedEventsList).length(0);
    expect(allEventsList).length(5);

  });


  it('should not be able to  select more than 3 events ', async () => {

    mock.storedEvents = new Map();
    mock.allEvent = [...mockData];

    render(<SportsEvent />);

    for (let i = 1; i <= mockData.length; i++) {
      const cardButton = screen.getByTestId(`sports-button-test-${i}`);
      fireEvent.click(cardButton);
    }

    expect(await screen.findByText("You cannot participate more than 3 events")).toBeInTheDocument();

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
    const errorButton = screen.getByTestId('button-test');
    fireEvent.click(errorButton);
    expect(mock.fetchEvents).toHaveBeenCalledOnce();
  });


});
