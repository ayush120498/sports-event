import { useCallback, useEffect, useState } from 'react';
import client from '@Utils/axios';
import { getItem, setItem } from '@Utils/localStorage';
import { EVENTS_LOCAL_STORAGE_KEY } from '@Constants/index';
import { ISportEvent } from 'types';

interface ISportsEventResponse {
	id: number;
	event_name: string;
	event_category: string;
	start_time: string;
	end_time: string;
	icon: string;
}

interface IManageEventResponse {
	isLoading: boolean;
	allEvent: ISportEvent[];
	storedEvents: Map<number, ISportEvent>;
	error: Error | null;
	addEventsToLocalStorage: (selectedEvent: Map<number, ISportEvent>) => void;
}

const useManageEvent = (): IManageEventResponse => {
	const [isLoading, setIsLoading] = useState(false);
	const [events, setEvents] = useState<ISportEvent[]>([]);
	const [storedEvents, setStoredEvents] = useState<Map<number, ISportEvent>>(new Map());

	const [isError, setError] = useState<Error | null>(null);

	const transformEventList = (data: ISportsEventResponse[]): ISportEvent[] => {
		const parsedData = data.map((event: ISportsEventResponse) => ({
			id: event.id,
			eventName: event.event_name,
			eventType: event.event_category,
			startTime: new Date(event.start_time),
			endTime: new Date(event.end_time),
			icon: event.icon,
		}));

		return parsedData;
	};

	const getSelectedEvent = (): void => {
		const selectedItems = getItem(EVENTS_LOCAL_STORAGE_KEY) as [[number, ISportEvent]];

		if (!selectedItems) {
			return;
		}

		const transformedSelectedItems = new Map<number, ISportEvent>(selectedItems);
		setStoredEvents(transformedSelectedItems);
	};

	const fetchEvents = useCallback(async (): Promise<void> => {
		try {
			const resp = await client.get<ISportsEventResponse[]>('');
			const data = resp?.data;
			const eventList = transformEventList(data);
			setEvents(eventList);
		} catch (error) {
			setError(new Error('Error in fetching events. Please reload'));
		}
		setIsLoading(false);
	}, []);

	const addEventsToLocalStorage = useCallback((selectedEventList: Map<number, ISportEvent>) => {
		const convertedArray = Array.from(selectedEventList.entries());
		setItem(EVENTS_LOCAL_STORAGE_KEY, convertedArray);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		void fetchEvents();
		getSelectedEvent();
	}, [fetchEvents]);

	return {
		isLoading,
		allEvent: events,
		storedEvents,
		error: isError,
		addEventsToLocalStorage,
	};
};

export default useManageEvent;
