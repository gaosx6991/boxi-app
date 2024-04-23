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
