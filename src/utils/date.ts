import { IDuration } from 'types';

const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

	return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
};

export { formatDate, formateTime, areOverLappingIntervals };
