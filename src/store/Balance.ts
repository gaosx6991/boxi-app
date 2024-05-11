import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {
  getPaymentHistoryList,
  GetPaymentHistoryListResponse,
  topUpBalance,
  TopUpBalanceRequest,
} from '../apis/Balance.ts';

type Scene = 'TopUp' | 'GetPaymentHistoryList';

interface BalanceState {
  getPaymentHistoryListPage: number;
  getPaymentHistoryListPageSize?: number;
  paymentHistoryList?: GetPaymentHistoryListResponse;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  scene?: Scene;
}

const initialState: BalanceState = {
  getPaymentHistoryListPage: 1,
  getPaymentHistoryListPageSize: 10,
  status: 'idle',
};

export const topUpBalanceAsync = createAsyncThunk<void, TopUpBalanceRequest>(
  'balance/topUpBalance',
  async request => {
    await topUpBalance(request);
  },
);
export const getPaymentHistoryListAsync = createAsyncThunk<
  GetPaymentHistoryListResponse,
  void,
  {state: {balance: BalanceState}}
>('balance/getPaymentHistoryList', async (_, {getState}) => {
  const {
    getPaymentHistoryListPage: page,
    getPaymentHistoryListPageSize: pageSize,
  } = getState().balance;
  return await getPaymentHistoryList({page, pageSize});
});

function getPaymentHistoryListAsyncReducer() {
  return (
    state: BalanceState,
    action: PayloadAction<GetPaymentHistoryListResponse>,
  ) => {
    if (action.payload.length) {
      if (state.getPaymentHistoryListPage === 1) {
        state.paymentHistoryList = action.payload;
      } else {
        state.paymentHistoryList = [
          ...(state.paymentHistoryList as GetPaymentHistoryListResponse),
          ...action.payload,
        ];
      }

      state.getPaymentHistoryListPage += 1;
    } else if (state.getPaymentHistoryListPage === 1) {
      state.paymentHistoryList = [];
    }

    state.status = 'success';
  };
}

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
    resetPage: state => {
      state.getPaymentHistoryListPage = 1;
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
      })
      .addCase(getPaymentHistoryListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetPaymentHistoryList';
      })
      .addCase(getPaymentHistoryListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        getPaymentHistoryListAsync.fulfilled,
        getPaymentHistoryListAsyncReducer(),
      );
  },
});

export const {resetScene, resetStatus, resetPage} = balanceSlice.actions;

export const status = (state: RootState) => state.balance.status;
export const scene = (state: RootState) => state.balance.scene;
export const paymentHistoryList = (state: RootState) =>
  state.balance.paymentHistoryList;

export default balanceSlice.reducer;
