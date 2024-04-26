// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';

export type CreateOrderRequest = {
  shipmentForm: {
    senderName: string;
    address: string;
    shipperPhoneNumber: string;
    itemType: string;
    packageSize: string;
  };
  recipientForm: {
    recipientName: string;
    address: string;
    postalZip: string;
    phoneNumber: string;
  };
  boxiRegular: number;
  shippingAssurance: number;
  subtotal: number;
};

export type CreateOrderResponse = {
  id: string;
  courierInfo: {
    id: string;
    avatar: string;
    accountName: string;
    number: string;
    phoneNumber: string;
  };
};

export const createOrder = async (
  request: CreateOrderRequest,
): Promise<CreateOrderResponse> => {
  const result = await fetch(`${API_URL}/order`, {
    method: 'POST',
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
  return result.json();
};
