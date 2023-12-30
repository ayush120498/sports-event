import { ISportEvent } from 'types';

export interface IEventListProps {
	heading: string;
	events: Array<ISportEvent>;
	onClick: (id: number, selectedEvent: ISportEvent) => void;
	buttonTitle: string;
	emptyListText?: string;
	dataTestId?: string;
	selectedEventList?: Map<number, ISportEvent>;
}
