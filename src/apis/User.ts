// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {store} from '../store';

export type CreateUserRequest = {
  accountName?: string;
  email?: string;
  password?: string;
};

export const createUser = async (request: CreateUserRequest) => {
  await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
};

export type LoginByEmailRequest = {
  email?: string;
  password?: string;
};

export type LoginResponse = {
  id?: string;
  avatar?: string;
  accountName?: string;
  email?: string;
  phoneNumber?: string;
  balance?: number;
  token?: string;
  sendPackageCount?: number;
  receivePackageCount?: number;
};

export const loginByEmail = async (
  request: LoginByEmailRequest,
): Promise<LoginResponse> => {
  const result = await fetch(`${API_URL}/user/email/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return await result.json();
};

export type LoginByPhoneNumberRequest = {
  phoneNumber?: string;
  password?: string;
};

export const loginByPhoneNumber = async (
  request: LoginByPhoneNumberRequest,
): Promise<LoginResponse> => {
  const result = await fetch(`${API_URL}/user/phoneNumber/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
  return await result.json();
};

export type UpdateUserPasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export const updateUserPassword = async (
  request: UpdateUserPasswordRequest,
): Promise<void> => {
  const result = await fetch(`${API_URL}/user/password`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: store.getState().user.token,
    } as HeadersInit_,
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
};

export type UpdateUserRequest = {
  avatar?: string;
  accountName?: string;
  phoneNumber?: string;
  email?: string;
};

export const updateUser = async (request: UpdateUserRequest): Promise<void> => {
  const result = await fetch(`${API_URL}/user`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: store.getState().user.token,
    } as HeadersInit_,
    body: JSON.stringify(request),
  });
  if (result.status !== 200) {
    throw new Error(await result.text());
  }
};
