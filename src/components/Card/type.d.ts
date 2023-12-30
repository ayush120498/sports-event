interface ISportsCard {
	id: number;
	eventName: string;
	eventType: string;
	startTime: string;
	endTime: string;
	onClick: (id: number) => void;
	buttonTitle: string;
	date: string;
	buttonDataTestId?: string;
}
