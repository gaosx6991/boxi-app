// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';
import {buildQuery} from '../utils/query.ts';

export type GetNotificationListRequest = {
  page: number;
  pageSize: number;
};

export type Notification = {
  id: string;
  group: string;
  title: string;
  isNew: boolean;
  content: string;
  timestamp: number;
  type: string;
  cover?: string;
};

export type GetNotificationListResponse = Notification[];

export const getNotificationList = async (
  request: GetNotificationListRequest,
): Promise<GetNotificationListResponse> => {
  const result = await fetch(`${API_URL}/notification?${buildQuery(request)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      authorization: store.getState().user.token,
    } as HeadersInit_ | undefined,
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return result.json();
};

export type UpdateNotificationListRequest = {
  id?: string;
  isNew: boolean;
};

export const updateNotification = async (
  request: UpdateNotificationListRequest,
): Promise<void> => {
  const notificationId = request.id;
  delete request.id;
  const result = await fetch(`${API_URL}/notification/${notificationId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: store.getState().user.token,
    } as HeadersInit_ | undefined,
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
};
