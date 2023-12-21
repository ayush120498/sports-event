import { ISportEvent } from 'types';

export interface IEventListProps {
	heading: string;
	events: Array<ISportEvent>;
	onClick: (index: number, event: ISportEvent) => void;
	buttonTitle: string;
	emptyListText?: string;
}
