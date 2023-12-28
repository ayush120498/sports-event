import { areIntervalsOverlapping, format, parseISO } from 'date-fns';
import { IDuration } from 'types';

const dateFormat = {
	dateWithAmPm: 'dd/MM/yyyy',
	timeFormat: 'p',
	dateTime: 'dd/MM/yyyy p',
};

const formatDate = (date: string): string => {
	const formattedDate = format(parseISO(date), dateFormat.dateWithAmPm);
	return formattedDate;
};

const formatDateTime = (date: string): string => {
	const formattedDate = format(parseISO(date), dateFormat.dateTime);
	return formattedDate;
};

const getFormattedTime = (date: string): string => {
	const formattedDate = format(parseISO(date), dateFormat.timeFormat);
	return formattedDate;
};

const areOverLappingIntervals = (date1: IDuration, date2: IDuration): boolean => {
	const isOverlapping = areIntervalsOverlapping(
		{
			start: new Date(date1.startTime),
			end: new Date(date1.startTime),
		},
		{
			start: new Date(date2.startTime),
			end: new Date(date2.startTime),
		},
		{ inclusive: true }
	);

	return isOverlapping;
};

export { formatDate, getFormattedTime, formatDateTime, areOverLappingIntervals };
