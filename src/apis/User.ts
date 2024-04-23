// @ts-ignore
import {API_URL} from 'react-native-dotenv';

export type CreateUserRequest = {
  accountName?: string;
  email?: string;
  password?: string;
};

export type LoginByEmailRequest = {
  email?: string;
  password?: string;
};

export type LoginByEmailResponse = {
  id?: string;
  accountName?: string;
  email?: string;
  token?: string;
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

export const loginByEmail = async (
  request: LoginByEmailRequest,
): Promise<LoginByEmailResponse> => {
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
