import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {uploadFile, UploadFileResponse} from '../apis/Upload.ts';

type Scene = 'UploadAvatar';

interface UploadState {
  url?: string;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: UploadState = {
  status: 'idle',
};

export const uploadFileAsync = createAsyncThunk<
  UploadFileResponse,
  DocumentPickerResponse
>('upload/uploadFile', async file => {
  return await uploadFile(file);
});

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetScene: state => {
      state.scene = undefined;
    },
    resetStatus: state => {
      state.status = 'idle';
    },
    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadFileAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(uploadFileAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        uploadFileAsync.fulfilled,
        (state, action: PayloadAction<UploadFileResponse>) => {
          state.status = 'success';
          state.url = action.payload.url;
        },
      );
  },
});

export const {resetScene, resetStatus, setScene} = uploadSlice.actions;

export const status = (state: RootState) => state.upload.status;
export const scene = (state: RootState) => state.upload.scene;

export default uploadSlice.reducer;
