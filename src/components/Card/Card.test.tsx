import { expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import SportsCard from './';

const sportsEvent = {
  eventName: "400M Race",
  eventType: "400M Race",
  startTime: new Date(),
  endTime: new Date(),
  icon: "test icon"
}

describe('button', () => {

  it('renders sports component', () => {
    render(<SportsCard
      id={1}
      icon={sportsEvent.icon}
      buttonTitle='Select'
      eventName={sportsEvent.eventName}
      eventType={sportsEvent.eventType}
      startTime={sportsEvent.startTime}
      endTime={sportsEvent.endTime}
      onClick={() => { }}
    />);
    const element = screen.getByTestId('sport-button-id');
    expect(element).toHaveTextContent("Select");
  });
});
