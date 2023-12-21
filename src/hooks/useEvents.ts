import { useCallback, useEffect, useState } from 'react';
import client from '@Utils/axios';
import { getItem, setItem } from '@Utils/localStorage';
import { EVENTS_LOCAL_STORAGE_KEY } from '@Constants/index';
import { formatDate, formatDateTime, getFormattedTime } from '@Utils/date';
import { ISportEvent } from 'types';

interface ISportsEventResponse {
	id: number;
	event_name: string;
	event_category: string;
	start_time: string;
	end_time: string;
}

const useEvents = (): [boolean, ISportEvent[], ISportEvent[], Error | null, (selectedEvent: ISportEvent[]) => void] => {
	const [isLoading, setIsLoading] = useState(false);
	const [events, setEvents] = useState<ISportEvent[]>([]);
	const [selectedEvents, setSelectedEvents] = useState<ISportEvent[]>([]);
	const [isError, setError] = useState<Error | null>(null);

	const parseEventData = (data: ISportsEventResponse[]): ISportEvent[] => {
		const parsedData = data.map((event: ISportsEventResponse) => ({
			id: event.id,
			eventName: event.event_name,
			eventType: event.event_category,
			dateOfEvent: formatDate(event.start_time) || '',
			startTime: getFormattedTime(event.start_time) || '',
			endTime: getFormattedTime(event.end_time) || '',
			startDateTime: formatDateTime(event.start_time) || '',
			endDateTime: formatDateTime(event.end_time) || '',
		}));

		return parsedData;
	};

	const fetchDataFromLocalStorage = useCallback((eventList: ISportEvent[]) => {
		const items: ISportEvent[] | null = getItem(EVENTS_LOCAL_STORAGE_KEY);
		if (!items || !items.length) {
			setSelectedEvents([]);
			setEvents(eventList);
			return;
		}

		const updatedEvents = eventList.filter((event) => items.findIndex((item) => item.id === event.id) === -1);

		setEvents([...updatedEvents]);
		setSelectedEvents(items);
	}, []);

	const fetchEvents = useCallback(async (): Promise<void> => {
		try {
			const resp = await client.get<ISportsEventResponse[]>('');
			const data = resp?.data;
			const parsedEvents = parseEventData(data);
			fetchDataFromLocalStorage(parsedEvents);
		} catch (error) {
			setError(Error('Error in fetching events'));
		}
		setIsLoading(false);
	}, [fetchDataFromLocalStorage]);

	useEffect(() => {
		setIsLoading(true);

		void fetchEvents();
	}, [fetchEvents]);

	const updateEvents = useCallback((selectedEventList: ISportEvent[]) => {
		setItem(EVENTS_LOCAL_STORAGE_KEY, selectedEventList);
	}, []);

	return [isLoading, events, selectedEvents, isError, updateEvents];
};

export default useEvents;
