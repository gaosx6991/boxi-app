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
  loginByPhoneNumber,
  LoginByPhoneNumberRequest,
  LoginResponse,
} from '../apis/User.ts';
import {RootState} from './index.ts';

type Scene = 'CreateUser' | 'LoginByEmail' | 'LoginByPhoneNumber';

interface UserState {
  id?: string;
  avatar?: string;
  accountName?: string;
  email?: string;
  phoneNumber?: string;
  balance?: number;
  token?: string;
  sendPackageCount?: number;
  receivePackageCount?: number;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: UserState = {
  status: 'idle',
};

export const createUserAsync = createAsyncThunk<void, CreateUserRequest>(
  'user/createUser',
  async userDoc => {
    return await createUser(userDoc);
  },
);

export const loginByEmailAsync = createAsyncThunk<
  LoginResponse,
  LoginByEmailRequest
>('user/loginByEmail', async request => {
  return await loginByEmail(request);
});

export const loginByPhoneNumberAsync = createAsyncThunk<
  LoginResponse,
  LoginByPhoneNumberRequest
>('user/loginByPhoneNumber', async request => {
  return await loginByPhoneNumber(request);
});

function getReducer() {
  return (state: UserState, action: PayloadAction<LoginResponse>) => {
    state.status = 'success';
    state.id = action.payload.id;
    state.avatar = action.payload.avatar;
    state.accountName = action.payload.accountName;
    state.email = action.payload.email;
    state.phoneNumber = action.payload.phoneNumber;
    state.balance = action.payload.balance;
    state.token = action.payload.token;
    state.sendPackageCount = action.payload.sendPackageCount;
    state.receivePackageCount = action.payload.receivePackageCount;
  };
}

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
      .addCase(createUserAsync.fulfilled, state => {
        state.status = 'success';
      })
      .addCase(loginByEmailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginByEmailAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(loginByEmailAsync.fulfilled, getReducer())
      .addCase(loginByPhoneNumberAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginByPhoneNumberAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(loginByPhoneNumberAsync.fulfilled, getReducer());
  },
});

export const {setScene} = userSlice.actions;

export const status = (state: RootState) => state.user.status;
export const scene = (state: RootState) => state.user.scene;
export const id = (state: RootState) => state.user.id;
export const balance = (state: RootState) => state.user.balance;
export const avatar = (state: RootState) => state.user.avatar;
export const sendPackageCount = (state: RootState) =>
  state.user.sendPackageCount;
export const receivePackageCount = (state: RootState) =>
  state.user.receivePackageCount;
export const accountName = (state: RootState) => state.user.accountName;

export default userSlice.reducer;
