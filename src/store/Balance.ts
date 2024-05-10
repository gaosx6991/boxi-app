import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {topUpBalance, TopUpBalanceRequest} from '../apis/Balance.ts';

type Scene = 'TopUp';

interface BalanceState {
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: BalanceState = {
  status: 'idle',
};

export const topUpBalanceAsync = createAsyncThunk<void, TopUpBalanceRequest>(
  'balance/topUpBalance',
  async request => {
    await topUpBalance(request);
  },
);

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    resetScene: state => {
      state.scene = undefined;
    },
    resetStatus: state => {
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(topUpBalanceAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'TopUp';
      })
      .addCase(topUpBalanceAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(topUpBalanceAsync.fulfilled, state => {
        state.status = 'success';
      });
  },
});

export const {resetScene, resetStatus} = balanceSlice.actions;

export const status = (state: RootState) => state.balance.status;
export const scene = (state: RootState) => state.balance.scene;

export default balanceSlice.reducer;
