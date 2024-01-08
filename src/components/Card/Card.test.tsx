import { expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import SportsCard from './';

const sportsEvent = {
  id: 1,
  eventName: "400M Race",
  eventType: "Racing",
  startTime: new Date('2024-01-10T11:00:00Z'),
  endTime: new Date('2024-01-10T12:00:00Z'),
  icon: "test icon"
}

describe('button', () => {

  it('renders sports component', async () => {
    render(<SportsCard
      id={sportsEvent.id}
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
    expect(await screen.findByText(sportsEvent.eventName)).toBeInTheDocument();
    expect(await screen.findByText(sportsEvent.eventType)).toBeInTheDocument();
    expect(await screen.findByText('January 10, 2024')).toBeInTheDocument();
    expect(await screen.findByText('4:30 PM - 5:30 PM')).toBeInTheDocument();
  });

  it('should call callback with event data', () => {
    const mockOnClick = vi.fn();
    render(<SportsCard
      id={1}
      icon={sportsEvent.icon}
      buttonTitle='Select'
      eventName={sportsEvent.eventName}
      eventType={sportsEvent.eventType}
      startTime={sportsEvent.startTime}
      endTime={sportsEvent.endTime}
      onClick={mockOnClick}
    />);
    const element = screen.getByTestId('sport-button-id');
    fireEvent.click(element);
    expect(mockOnClick).toHaveBeenLastCalledWith({ ...sportsEvent });

  });
});
