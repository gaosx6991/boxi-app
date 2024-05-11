// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';
import {buildQuery} from '../utils/query.ts';

export type TopUpBalanceRequest = {
  receipt: string;
};

export const topUpBalance = async (
  request: TopUpBalanceRequest,
): Promise<void> => {
  const result = await fetch(`${API_URL}/balance/topup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: store.getState().user.token,
    } as HeadersInit_,
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
};

export type GetPaymentHistoryListRequest = {
  page?: number;
  pageSize?: number;
};

export type PaymentHistoryListItem = {
  id: string;
  timestamp: number;
  amount: number;
  direction: 'Pay Out' | 'Pay In';
  description: string;
  title: string;
};

export type GetPaymentHistoryListResponse = PaymentHistoryListItem[];

export const getPaymentHistoryList = async (
  request: GetPaymentHistoryListRequest,
): Promise<GetPaymentHistoryListResponse> => {
  const result = await fetch(
    `${API_URL}/balance/paymentHistory?${buildQuery(request)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: store.getState().user.token,
      } as HeadersInit_,
    },
  );
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return await result.json();
};
