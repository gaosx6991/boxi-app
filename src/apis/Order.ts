// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';
import {buildQuery} from '../utils/query.ts';

type RecipientForm = {
  recipientName: string;
  address: string;
  postalZip: string;
  phoneNumber: string;
};

export type CreateOrderRequest = {
  shipmentForm: {
    senderName: string;
    address: string;
    shipperPhoneNumber: string;
    itemType: string;
    packageSize: string;
  };
  recipientForm: RecipientForm;
  boxiRegular: number;
  shippingAssurance: number;
  subtotal: number;
};

export type CourierInfo = {
  id: string;
  avatar: string;
  accountName: string;
  number: string;
  phoneNumber: string;
};

export type CreateOrderResponse = {
  id: string;
  courierInfo: CourierInfo;
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
  return await result.json();
};

export type GetOrderActivityListFilter = {
  status: 'On Progress' | 'Complete';
};

export type GetOrderActivityListRequest = {
  page: number;
  pageSize: number;
  filter: GetOrderActivityListFilter;
};

export type OrderActivity = {
  id: string;
  recipientForm: RecipientForm;
};

export type GetOrderActivityListResponse = OrderActivity[];

export const getOrderActivityList = async (
  request: GetOrderActivityListRequest,
): Promise<GetOrderActivityListResponse> => {
  const result = await fetch(
    `${API_URL}/order/activity?${buildQuery(request)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        authorization: store.getState().user.token,
      } as HeadersInit_ | undefined,
    },
  );
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return await result.json();
};
