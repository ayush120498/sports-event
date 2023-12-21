interface ISportsCard {
	eventName: string;
	eventType: string;
	eventDuration: {
		startTime: string;
		endTime: string;
	};
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	buttonTitle: string;
	date: string;
}
