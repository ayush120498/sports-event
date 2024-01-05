import { expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import EventList from './';
import { ISportEvent } from 'types';

const sportsEvent: ISportEvent = {
  id: 1,
  eventName: "400M Race",
  eventType: "400M Race",
  startTime: new Date(),
  endTime: new Date(),
}

describe('Test cases for event list', () => {

  it('should render EventList component', () => {
    render(<EventList
      buttonTitle='Select'
      heading='Event List'
      events={[sportsEvent]}
      onClick={() => { }}
    />);
    const element = screen.getByTestId('event-test');
    const list = element.getElementsByClassName('event-list__list');
    expect(list).length(1);
  });

  it('should render empty state with fallback text value', () => {
    render(<EventList
      buttonTitle='Select'
      heading='Event List'
      events={[]}
      onClick={() => { }}
    />);
    const element = screen.getByTestId('event-test');
    const list = element.getElementsByClassName('event-list__list');
    expect(list).length(0);
    expect(element).toHaveTextContent('No events scheduled');
  });

  it('should call callback fn with index and list data', () => {
    const mockFn = vi.fn();
    render(<EventList
      buttonTitle='Select'
      heading='Event List'
      events={[sportsEvent]}
      onClick={mockFn}
    />);
    const element = screen.getByTestId('sports-button-test-1');
    fireEvent.click(element);
    expect(mockFn).toHaveBeenCalledWith(sportsEvent);
  });

});
