// @ts-ignore
import {API_URL} from 'react-native-dotenv';

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
  accountName?: string;
  email?: string;
  phoneNumber?: string;
  balance?: number;
  token?: string;
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
  return result.json();
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
  return result.json();
};
