import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {RootState} from './index.ts';
import {
  CourierInfo,
  createOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  getOrderActivityList,
  GetOrderActivityListResponse,
} from '../apis/Order.ts';

type Scene =
  | 'CreateOrder'
  | 'GetOnProgressOrderActivityList'
  | 'GetCompleteOrderActivityList';

interface OrderState {
  id?: string;
  courierInfo?: CourierInfo;
  onProgressOrderActivityList?: GetOrderActivityListResponse;
  completeOrderActivityList?: GetOrderActivityListResponse;
  error?: SerializedError;
  status: 'idle' | 'loading' | 'success' | 'failed';
  onProgressActivityListPage: number;
  completeActivityListPage: number;
  onProgressActivityListPageSize: number;
  completeActivityListPageSize: number;
  scene?: Scene;
}

const initialState: OrderState = {
  status: 'idle',
  onProgressActivityListPage: 1,
  completeActivityListPage: 1,
  onProgressActivityListPageSize: 10,
  completeActivityListPageSize: 10,
};

export const createOrderAsync = createAsyncThunk<
  CreateOrderResponse,
  CreateOrderRequest
>('order/createOrder', async orderDoc => {
  return await createOrder(orderDoc);
});

export const getOnProgressOrderActivityListAsync = createAsyncThunk<
  GetOrderActivityListResponse,
  void,
  {state: {order: OrderState}}
>('order/getOnProgressOrderActivityList', async (_, {getState}) => {
  const {
    onProgressActivityListPage: page,
    onProgressActivityListPageSize: pageSize,
  } = getState().order;
  return await getOrderActivityList({
    page,
    pageSize,
    filter: {status: 'On Progress'},
  });
});

function getOnProgressOrderActivityListAsyncReducer() {
  return (
    state: OrderState,
    action: PayloadAction<GetOrderActivityListResponse>,
  ) => {
    state.status = 'success';

    const payload = action.payload;

    if (state.onProgressActivityListPage === 1 && payload.length) {
      state.onProgressOrderActivityList = payload;
      state.onProgressActivityListPage += 1;
    } else if (payload.length) {
      state.onProgressOrderActivityList = [
        ...(state.onProgressOrderActivityList as GetOrderActivityListResponse),
        ...payload,
      ];
      state.onProgressActivityListPage += 1;
    }
  };
}

export const getCompleteOrderActivityListAsync = createAsyncThunk<
  GetOrderActivityListResponse,
  void,
  {state: {order: OrderState}}
>('order/getCompleteOrderActivityList', async (_, {getState}) => {
  const {
    completeActivityListPage: page,
    completeActivityListPageSize: pageSize,
  } = getState().order;
  return await getOrderActivityList({
    page,
    pageSize,
    filter: {status: 'Complete'},
  });
});

function getCompleteOrderActivityListAsyncReducer() {
  return (
    state: OrderState,
    action: PayloadAction<GetOrderActivityListResponse>,
  ) => {
    state.status = 'success';

    const payload = action.payload;

    if (state.completeActivityListPage === 1 && payload.length) {
      state.completeOrderActivityList = payload;
      state.completeActivityListPage += 1;
    } else if (payload.length) {
      state.completeOrderActivityList = [
        ...(state.completeOrderActivityList as GetOrderActivityListResponse),
        ...payload,
      ];
      state.completeActivityListPage += 1;
    }
  };
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOnProgressActivityListPage: state => {
      state.onProgressActivityListPage = 1;
    },
    resetCompleteActivityListPage: state => {
      state.completeActivityListPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrderAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'CreateOrder';
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        createOrderAsync.fulfilled,
        (state, action: PayloadAction<CreateOrderResponse>) => {
          state.status = 'success';

          state.id = action.payload.id;
          state.courierInfo = action.payload.courierInfo;
        },
      )
      .addCase(getOnProgressOrderActivityListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetOnProgressOrderActivityList';
      })
      .addCase(
        getOnProgressOrderActivityListAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error;
        },
      )
      .addCase(
        getOnProgressOrderActivityListAsync.fulfilled,
        getOnProgressOrderActivityListAsyncReducer(),
      )
      .addCase(getCompleteOrderActivityListAsync.pending, state => {
        state.status = 'loading';
        state.scene = 'GetCompleteOrderActivityList';
      })
      .addCase(getCompleteOrderActivityListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(
        getCompleteOrderActivityListAsync.fulfilled,
        getCompleteOrderActivityListAsyncReducer(),
      );
  },
});

export const {resetOnProgressActivityListPage, resetCompleteActivityListPage} =
  orderSlice.actions;

export const status = (state: RootState) => state.order.status;
export const scene = (state: RootState) => state.order.scene;
export const courierInfo = (state: RootState) => state.order.courierInfo;
export const onProgressOrderActivityList = (state: RootState) =>
  state.order.onProgressOrderActivityList;
export const completeOrderActivityList = (state: RootState) =>
  state.order.completeOrderActivityList;

export default orderSlice.reducer;
