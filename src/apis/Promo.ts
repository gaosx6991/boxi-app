// @ts-ignore
import {API_URL} from 'react-native-dotenv';

export type GetPromoTodayResponse = {
  cover: string;
  availableUtil: number;
  content: string;
};

export const getPromoToday = async (): Promise<GetPromoTodayResponse> => {
  const result = await fetch(`${API_URL}/promo/today`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return result.json();
};
