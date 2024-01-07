import { ISportEvent } from 'types';

interface ISportsCard {
	id: number;
	eventName: string;
	eventType: string;
	startTime: Date;
	endTime: Date;
	onClick: (event: ISportEvent) => void;
	buttonTitle: string;
	icon: string;
	buttonDataTestId?: string;
}
