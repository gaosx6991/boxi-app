import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  createUser,
  CreateUserRequest,
  loginByEmail,
  LoginByEmailRequest,
  LoginByEmailResponse,
} from '../apis/User.ts';
import {RootState} from './index.ts';

type Scene = 'CreateUser' | 'LoginByEmail';

interface UserState {
  id?: string;
  accountName?: string;
  email?: string;
  token?: string;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
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

export const loginByEmailAsync = createAsyncThunk<
  LoginByEmailResponse,
  LoginByEmailRequest
>('user/loginByEmail', async (request, {getState}) => {
  return await loginByEmail(request);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
  },
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
      })
      .addCase(loginByEmailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginByEmailAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        loginByEmailAsync.fulfilled,
        (state, action: PayloadAction<LoginByEmailResponse>) => {
          state.status = 'success';
          state.id = action.payload.id;
          state.accountName = action.payload.accountName;
          state.email = action.payload.email;
          state.token = action.payload.token;
        },
      );
  },
});

export const {setScene} = userSlice.actions;

export const status = (state: RootState) => state.user.status;
export const scene = (state: RootState) => state.user.scene;
export const id = (state: RootState) => state.user.id;

export default userSlice.reducer;
