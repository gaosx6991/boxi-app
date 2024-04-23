import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {createUser, CreateUserRequest} from '../apis/User.ts';
import {RootState} from './index.ts';

interface UserState {
  accountName?: string;
  email?: string;
  password?: string;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
}

const initialState: UserState = {
  status: 'idle',
};

export const createUserAsync = createAsyncThunk<void, CreateUserRequest>(
  'user/createUser',
  async (userDoc, {getState}) => {
    return await createUser(userDoc);
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUserAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
      });
  },
});

export const accountName = (state: RootState) => state.user.accountName;
export const email = (state: RootState) => state.user.email;
export const status = (state: RootState) => state.user.status;

export default userSlice.reducer;
