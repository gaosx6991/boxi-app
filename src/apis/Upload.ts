// @ts-ignore
import {API_URL} from 'react-native-dotenv';
import {DocumentPickerResponse} from 'react-native-document-picker/src';

export type UploadFileResponse = {
  url: string;
};

export const uploadFile = async (
  file: DocumentPickerResponse,
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  });

  const result = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    } as HeadersInit_,
    body: formData,
  });

  if (result.status !== 200) {
    throw new Error(await result.text());
  }

  return await result.json();
};
