// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';

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
