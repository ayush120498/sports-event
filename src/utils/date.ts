import { IDuration } from 'types';

const formatDate = (date: Date): string => {
	const formattedDate = new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(
		date
	);
	return formattedDate;
};

const formateTime = (time: Date): string => {
	const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	return formattedTime;
};

const areOverLappingIntervals = (date1: IDuration, date2: IDuration): boolean => {
	const leftStartTime = new Date(date1.startTime).getTime();
	const leftEndTime = new Date(date1.endTime).getTime();
	const rightStartTime = new Date(date2.startTime).getTime();
	const rightEndTime = new Date(date2.endTime).getTime();

	if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
		throw new Error('Invalid interval');
	}

	return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;
};

export { formatDate, formateTime, areOverLappingIntervals };
