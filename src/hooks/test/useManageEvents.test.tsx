import { it, describe, vi } from "vitest";
import useEvents from "../useManageEvents";
import { renderHook, waitFor } from "@testing-library/react";
import { setItem } from "@Utils/localStorage";
import { EVENTS_LOCAL_STORAGE_KEY } from "@Constants/index";



const mockAxiosData = vi.hoisted(() => ({
  get: vi.fn(),
}));


vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mockAxiosData.get,
      })),
    },
  };

  return mockAxios;
});


describe('Test cases for useEvents', () => {

  it('should update state once API call is success', async () => {
    mockAxiosData.get.mockResolvedValue({
      data: [{
        "id": 1,
        "event_name": "Football Match",
        "event_category": "Soccer",
        "start_time": "2023-04-01T09:00:00Z",
        "end_time": "2023-04-01T11:00:00Z",
      }, {
        "id": 2,
        "event_name": "Football Match",
        "event_category": "Soccer",
        "start_time": "2023-04-01T09:00:00Z",
        "end_time": "2023-04-01T11:00:00Z",
      }]
    });

    const { result } = renderHook(() => useEvents());

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.allEvent).toHaveLength(2);
      expect(result.current.storedEvents).toHaveLength(0);
      expect(result.current.error).toBeNull();
    })

  });

  it('should set selected events in local storage', async () => {

    const selectedEvents = new Map([[1, {
      "id": 2,
      "eventName": "Football Match",
      "eventType": "Soccer",
      "dateOfEvent": "01/04/2023",
      "startTime": "2:30 PM",
      "endTime": "4:30 PM",
      "startDateTime": "01/04/2023 2:30 PM",
      "endDateTime": "01/04/2023 4:30 PM"
    }]]);

    setItem(EVENTS_LOCAL_STORAGE_KEY, Array.from(selectedEvents.entries()));

    mockAxiosData.get.mockResolvedValue({
      data: [{
        "id": 1,
        "event_name": "Football Match",
        "event_category": "Soccer",
        "start_time": "2023-04-01T09:00:00Z",
        "end_time": "2023-04-01T11:00:00Z",
      }, {
        "id": 2,
        "event_name": "Football Match",
        "event_category": "Soccer",
        "start_time": "2023-04-01T09:00:00Z",
        "end_time": "2023-04-01T11:00:00Z",
      }]
    });

    const { result } = renderHook(() => useEvents());


    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.allEvent).toHaveLength(2);
      expect(result.current.storedEvents).toHaveLength(1);
      expect(result.current.error).toBeNull();
    })
  });

  it('should set error if API call is failed', async () => {

    mockAxiosData.get.mockRejectedValue(new Error("Error in fetching events. Please reload"));

    const { result } = renderHook(() => useEvents());

    await waitFor(() => {
      expect(result.current.error?.message).toEqual('Error in fetching events. Please reload');
    });

  });


});
