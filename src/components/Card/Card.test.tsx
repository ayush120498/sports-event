import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import SportsCard from './';

const sportsEvent = {
  eventName: "400M Race",
  eventType: "400M Race",
  eventDuration: {
    startTime: "12/12/2009 12:00PM",
    endTime: "12/12/2009 1:00PM",
  },
  date: "12/12/2009"
}

describe('button', () => {

  it('renders sports component', () => {
    render(<SportsCard
      buttonTitle='Select'
      eventDuration={sportsEvent.eventDuration}
      eventName={sportsEvent.eventName}
      eventType={sportsEvent.eventType}
      date={sportsEvent.date}
      onClick={() => { }}
    />);
    const element = screen.getByTestId('sport-button-id');
    expect(element).toHaveTextContent("Select");
  });
});
